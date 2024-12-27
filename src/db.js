import mysql from "mysql2/promise";

// Database configuration
// const dbConfig = {
//     host: process.env.DB_HOST || "localhost", // Use environment variables or fallback to localhost
//     port: process.env.DB_PORT || 3306,
//     user: process.env.DB_USER || "root",
//     password: process.env.DB_PASSWORD || "",
//     database: process.env.DB_NAME || "my_database",
// };

// // Create a reusable connection function
// export const getConnection = async () => {
//     try {
//         const connection = await mysql.createConnection(dbConfig); // Create a new connection
//         console.log("Database connected successfully");
//         return connection; // Return the connection
//     } catch (error) {
//         console.error("Database connection failed:", error.message);
//         throw new Error("Failed to connect to the database");
//     }
// };

let pool;

// Database configuration
const dbConfig = {
    host: process.env.DB_HOST || "localhost", // Use environment variables or fallback to localhost
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "my_database",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
};

export const getConnection = async () => {
    try {
        if (!pool) {
            pool = mysql.createPool(dbConfig);
        }

        // console.log("Active Connections:", pool._allConnections.length);
        // console.log("Free Connections:", pool._freeConnections.length);

        return pool;
    } catch (error) {
        console.error("Database connection failed:", error.message);
        throw new Error("Failed to connect to the database");
    }
};
