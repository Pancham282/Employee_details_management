import express from "express";
import { connectToDatabase } from "./dbConnection.js"; // Assuming you're using ES Modules

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const database = await connectToDatabase(); // Connect to the database
        
        // Fetch all documents from the "employees" collection
        const documents = await database.collection("employees").find({}).toArray();
        
        // Send the retrieved documents as the response
        res.status(200).json(documents);
    } catch (error) {
        console.error("Error fetching employee records:", error);
        res.status(500).send("An error occurred while fetching employee records.");
    }
});

export default router; // Exporting the router for ES module use


