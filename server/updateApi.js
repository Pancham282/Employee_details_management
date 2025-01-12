import express from "express";
import multer from "multer";
import { connectToDatabase } from "./dbConnection.js";
import {  storage } from "./config.js";

const router = express.Router();
const upload = multer({ storage: storage });

router.put("/updateEmpDetails/:uniqueid", upload.single("Image"), async (req, res) => {
    try {
        const database = await connectToDatabase();
        const uniqueId = parseInt(req.params.uniqueid);

        if (isNaN(uniqueId)) {
            return res.status(400).json({ message: "Invalid UniqueId" });
        }

        const findQuery = { UniqueId: uniqueId };

        // Construct fields to update
        const updateFields = {
            Name: req.body.Name || null,
            Email: req.body.Email || null,
            Mobile: req.body.Mobile || null,
            Designation: req.body.Designation || null,
            Gender: req.body.Gender || null,
            Course: req.body.Course || null,
            LastUpdatedDate: new Date(), 
        }

        if (req.file) {
            updateFields.Image = `/uploads/${req.file.filename}`;
        }

        // Remove fields with null values
        Object.keys(updateFields).forEach((key) => {
            if (updateFields[key] === null) delete updateFields[key];
        });

        console.log("Update Query Fields:", updateFields);

        // Validate non-empty update fields
        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ message: "No valid fields to update" });
        }

        const updateQuery = { $set: updateFields };

        // Update the record in the database
        const result = await database.collection("employees").updateOne(findQuery, updateQuery);

        if (result.matchedCount > 0) {
            console.log("Record Updated");
            res.status(200).json({ message: "Record updated successfully" });
        } else {
            res.status(404).json({ message: "Record not found" });
        }
    } catch (err) {
        console.error("Error updating record:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

// Export the router
export default router;

