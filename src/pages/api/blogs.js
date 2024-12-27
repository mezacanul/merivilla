import { v4 as uuidv4 } from "uuid"; // Import the UUID generator
import { getConnection } from "../../db";

export default async function handler(req, res) {
    // return res.status(200).json({
    //     message: "Succesful call",
    // });
    if (req.method === "POST") {
        const { payload } = req.body;

        // Validate required fields
        if (
            !payload.title ||
            !payload.category ||
            !payload.description ||
            !payload.author
        ) {
            return res.status(400).json({
                message:
                    "Title, category, description, and author are required",
            });
        }

        // Generate a UUID for the blog
        const blogUUID = uuidv4();

        try {
            const pool = await getConnection();

            // SQL query to insert the blog
            const query = `
                INSERT INTO blogs (uuid, title, category, description, cover_image, content, author, status)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;
            const values = [
                blogUUID,
                payload.title,
                payload.category,
                payload.description,
                payload.coverImage || null,
                payload.content || "",
                payload.author,
                payload.status || 1, // Default to active status if not provided
            ];

            // return res.status(201).json({
            //     message: "Succesful call",
            //     values
            // });

            // Execute the insertion query
            const [result] = await pool.execute(query, values);

            // Respond with success and the UUID of the inserted blog
            // Check if the query was successful
            if (result.affectedRows > 0) {
                return res.status(201).json({
                    message: "Blog created successfully",
                    blogUUID, // Return the generated UUID
                });
            } else {
                return res.status(500).json({
                    message: "Failed to create the blog",
                });
            }
        } catch (error) {
            console.error("Error inserting blog:", error);
            return res.status(500).json({
                message: "Internal server error",
                error: error.message,
            });
        }
    } else if (req.method === "GET") { 
        try {
            const { id } = req.query;
            const pool = await getConnection();

            let query, values

            if (id) {
                // Fetch a specific blog by id
                query = "SELECT * FROM blogs WHERE uuid = ?";
                values = [id];
            } else {
                // Fetch all blogs
                query = "SELECT * FROM blogs";
                values = [];
            }

            // const [rows] = await pool.execute("SELECT * FROM blogs");
            const [rows] = await pool.execute(query, values);

            res.status(200).json(rows);
            // res.status(200).json("test");
        } catch (error) {
            console.error("Error fetching blogs:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    // Method not allowed for non-POST requests
    return res.status(405).json({ message: "Method Not Allowed" });
}
