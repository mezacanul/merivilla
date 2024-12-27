import jwt from "jsonwebtoken";
import { getConnection } from "../../db";

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res
            .status(405)
            .json({ message: `Method ${req.method} not allowed` });
    }

    const { action, payload } = req.body;
    if (!action) {
        return res.status(400).json({ message: "Action is required" });
    }
    const connection = await getConnection();

    try {
        switch (action) {
            case "login": {
                const { email, password } = payload || {};
                if (!email || !password) {
                    return res
                        .status(400)
                        .json({ message: "Email and password are required" });
                }

                // Check if user exists
                const [users] = await connection.query(
                    "SELECT name, email, role, password FROM users WHERE email = ?",
                    [email]
                );
                if (users.length === 0) {
                    return res.status(400).json({ message: "User not found" });
                }

                const user = users[0];

                // Compare password
                if (password != user.password) {
                    return res
                        .status(403)
                        .json({ message: "Invalid email or password" });
                }

                // Generate JWT
                const token = jwt.sign(
                    {
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        password: user.password,
                    },
                    JWT_SECRET,
                    { expiresIn: "24h" }
                );

                // Set the token as an HttpOnly cookie
                res.setHeader(
                    "Set-Cookie",
                    `authToken=${token}; HttpOnly; Secure; Path=/; Max-Age=86400; SameSite=Strict`
                );

                return res
                    .status(200)
                    .json({ message: "Login successful", payload: token });
            }

            case "logout": {
                // Clear the authToken cookie
                res.setHeader(
                    "Set-Cookie",
                    `authToken=; HttpOnly; Secure; Path=/; Max-Age=0; SameSite=Strict`
                );

                return res.status(200).json({ message: "Logout successful" });
            }

            case "reload": {
                const cookie = req.headers.cookie || ""; // Get cookies from the request headers
                const authToken = cookie
                    .split("; ")
                    .find((row) => row.startsWith("authToken="))
                    ?.split("=")[1];

                if (!authToken) {
                    return res.status(403).json({ message: "Token not found" });
                }

                try {
                    const decoded = jwt.verify(authToken, JWT_SECRET); // Verify and decode the token
                    return res
                        .status(200)
                        .json({ message: "Token valid", payload: decoded });
                } catch (error) {
                    return res
                        .status(400)
                        .json({ message: "Invalid or expired token" });
                }
            }

            default:
                return res.status(400).json({ message: "Invalid action" });
        }
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ message: "Internal server error", error: error.message });
    }
}
