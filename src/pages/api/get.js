import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  // Check if the request method is GET
  if (req.method === 'GET') {
    try {
      // Connection details
      const dbConfig = {
        host: 'merivilla.cpeuq4sak18m.us-east-2.rds.amazonaws.com', // AWS RDS endpoint
        port: 3306,          // Port number
        user: 'root', // Username
        password: 'mydatabase123', // Password
        database: 'merivilla', // Database name
      };

      // Create a connection to the database
      const connection = await mysql.createConnection(dbConfig);

      // Query the information schema for tables
      const [rows] = await connection.query(`SELECT * FROM users`);

      // Check if there are any tables
      if (rows.length === 0) {
        res.status(200).json({ message: 'No tables found in the database.' });
      } else {
        // const tableNames = rows.map(row => row.table_name);
        res.status(200).json({ message: 'Data found:', data: rows });
      }

      // Close the connection
      await connection.end();
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ message: 'Error connecting to the database', error: error.message });
    }
  } else {
    // Respond with 405 Method Not Allowed for non-GET requests
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
