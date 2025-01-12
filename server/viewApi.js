
import express from "express";
import { connectToDatabase } from "./dbConnection.js"; 

const router = express.Router();

router.get("/empId/:id", async (req, res) => {
    try {
        const database = await connectToDatabase();
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid Employee ID" });
        }

        const result = await database.collection("employees").findOne({ UniqueId: id });

        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: "Employee not found" });
        }
    } catch (error) {
        console.error("Error retrieving employee details:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

// Export the router
export default router; 


