import { MongoClient } from "mongodb";

let db = null;

export const connectToDatabase = async () => {
    if (!db) {
        try {
            const client = new MongoClient("mongodb://127.0.0.1:27017");

            // Establish the connection
            await client.connect(); 

            // Select the database
            db = client.db("employee");

            console.log("Database connected successfully");
        } catch (error) {
            console.error("Error connecting to the database:", error);
            throw new Error("Database connection failed");
        }
    }

    return db;
};

