import express from 'express';
import { connectToDatabase } from './dbConnection.js';

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const database = await connectToDatabase();

        // Fetch all documents from the "login" collection
        const documents = await database.collection("login").find({}).toArray();

        // Send the retrieved documents as the response
        res.send(documents);
    } catch (error) {
        console.error("Error fetching login records:", error);
        res.status(500).send("An error occurred while fetching login records.");
    }
});

export default router;


