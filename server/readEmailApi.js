import express from "express";
import { connectToDatabase } from "./dbConnection.js"; // Assuming the connectToDatabase function is an ES module

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const database = await connectToDatabase(); // Connect to the database

        // Fetch only the "Email" field from the "employees" collection
        const emails = await database.collection("employees")
            .find({}, { projection: { Email: 1, _id: 0 } })
            .toArray();

        console.log("Emails fetched:", emails);

        // Map to extract only the "Email" field and send the response
        res.send(emails.map(e => e.Email));
    } catch (error) {
        console.error("Error fetching emails:", error);
        res.status(500).send({ error: "Error fetching emails", details: error.message });
    }
});

// Export the router
export default router;


