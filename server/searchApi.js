import express from "express";
import { connectToDatabase } from "./dbConnection.js"; // Note the use of .js for ES module imports

const router = express.Router();

router.get("/detail/:searchValue", async (req, res) => {
    try {
        const database = await connectToDatabase(); // Connect to the database
        const searchValue = req.params.searchValue;

        let query = {};

        if (searchValue) {
            // Check if the input is a number (assume it's an ID)
            if (!isNaN(searchValue)) {
                query.UniqueId = parseInt(searchValue);
            } else if (!isNaN(Date.parse(searchValue))) {
                // If the input is a valid date
                const specificDate = new Date(searchValue);
                query.CreateDate = {
                    $gte: new Date(specificDate.setHours(0, 0, 0, 0)), // Start of the day
                    $lt: new Date(specificDate.setHours(23, 59, 59, 999)), // End of the day
                };
            } else {
                // Use regex for name or email search
                query.$or = [
                    { Name: { $regex: searchValue, $options: "i" } },
                    { Email: { $regex: searchValue, $options: "i" } },
                ];
            }
        }
            // Query the database
            const documents = await database.collection("employees").find(query).toArray();

            if (documents.length > 0) {
                res.status(200).send(documents); // Send the matching records
            } else {
                res.status(404).send({ message: "No employees found matching the criteria" });
            }
    } 
    catch (error) {
        console.error("Error retrieving employee details:", error);
        res.status(500).send("Internal Server Error");   
    }     
    
});

// Export the router
export default router;

// Postman
// http://127.0.0.1:5001/searchEmp/detail/9
// http://127.0.0.1:5001/searchEmp/detail/2024-12-16
// http://127.0.0.1:5001/searchEmp/detail/budha
// http://127.0.0.1:5001/searchEmp/detail/pancham@gmail.com



