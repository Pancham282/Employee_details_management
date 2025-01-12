import express from "express";
import cors from "cors";
import { uploadPath } from "./config.js";


const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Define the uploads folder path relative to the server folder
app.use('/uploads', express.static(uploadPath));

// Import API routes
import loginRoutes from "./loginApi.js";
import emailRoutes from "./readEmailApi.js";
import readRoutes from "./readApi.js";
import insertRoutes from "./insertApi.js";
import searchRoutes from "./searchApi.js";
import viewRoutes from "./viewApi.js";
import updateRoutes from "./updateApi.js";
import deleteRoutes from "./deleteApi.js";

// Use routes
app.use('/login', loginRoutes);
app.use('/emails', emailRoutes);
app.use('/empDetail', readRoutes);
app.use('/insertEmpDetails', insertRoutes);
app.use('/searchEmp', searchRoutes);
app.use('/viewDetails', viewRoutes);
app.use('/updateDetails', updateRoutes);
app.use('/deleteEmp', deleteRoutes);

// Start the server
app.listen(5001, () => {
    console.log("Server running at http://127.0.0.1:5001");
});
