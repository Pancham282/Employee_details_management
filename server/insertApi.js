import express from "express";
import multer from "multer";
import { connectToDatabase } from "./dbConnection.js";
import { storage } from "./config.js";

const router = express.Router();
const upload = multer({ storage: storage });

router.post("/", upload.single("Image"), async (request, response) => {
    console.log("Request Body:", request.body);

    if (!request.file) {
        return response.status(400).send("No file uploaded. Please attach an image.");
    }

    try {
        const database = await connectToDatabase(); // Establish database connection

        // Get the last UniqueId and increment it
        const lastRecord = await database.collection("employees").find().sort({ UniqueId: -1 }).limit(1).toArray();
        const newUniqueId = (lastRecord[0] && lastRecord[0].UniqueId) ? lastRecord[0].UniqueId + 1 : 1;

        console.log("New UniqueId:", newUniqueId);

        // Construct the user object
        const user = {
            UniqueId: newUniqueId,
            Name: request.body.Name,
            Email: request.body.Email,
            Mobile: request.body.Mobile,
            Designation: request.body.Designation,
            Gender: request.body.Gender,
            Course: request.body.Course,
            Image: request.file ? `/uploads/${request.file.filename}` : null,
            CreateDate: new Date(),
        };

        console.log("User Object:", user);

        // Insert the user into the database
        await database.collection("employees").insertOne(user);
        console.log("Employee created with image path.");
        response.status(201).send("Employee created successfully.");
    } catch (err) {
        console.error("Error:", err);
        response.status(500).send("Internal server error.");
    }
});

export default router;


