// Import required modules
import express from 'express';
import { connectToDatabase } from './dbConnection.js'; // Assuming the connectionApi.js is using ES modules

// Create an instance of the router
const router = express.Router();

// DELETE API for deleting employee details
router.delete('/deleteEmpDetails/:uniqueid', async (req, res) => {
    const id = parseInt(req.params.uniqueid); // Parse the uniqueId from the request parameter

    if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid UniqueId' }); // Return a 400 if ID is invalid
    }

    try {
        // Connect to the database
        const database = await connectToDatabase();

        // Perform the delete operation
        const result = await database.collection('employees').deleteOne({ UniqueId: id });

        if (result.deletedCount > 0) {
            console.log('Record deleted');
            res.status(200).json({ message: 'Record deleted successfully' });
        } else {
            res.status(404).json({ message: 'Record not found' }); // Return 404 if no record is found
        }
    } catch (error) {
        console.error('Error deleting record:', error);
        res.status(500).json({ message: 'Internal server error' }); // Return 500 if there was an error with the database
    }
});

// Export the router
export default router;


