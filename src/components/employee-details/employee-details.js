

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export function EmployeeDetails() {
    const { id } = useParams(); // Extract employee ID from URL parameters
    const [employee, setEmployee] = useState(null); // Initialize employee state
    const [error, setError] = useState(null); // Error state
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        // Fetch employee details when the component is mounted or the ID changes
        const fetchEmployeeDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5001/viewDetails/empId/${id}`);
                console.log("API Response:", response.data);
                setEmployee(response.data); // Set employee data
                setError(null); // Clear any previous errors
            } catch (err) {
                console.error("Error fetching employee details:", err);
                setError("Failed to fetch employee details. Please try again later.");
            } finally {
                setLoading(false); // Set loading to false regardless of success or failure
            }
        };

        fetchEmployeeDetails();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>; // Show a loading indicator while data is being fetched
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>; // Display error message if fetching data fails
    }

    return (
        <div className="container-fluid">
            <h2>Employee Details</h2>
            {employee ? (
                <dl>
                    <dt>Unique ID</dt>
                    <dd>{employee.UniqueId}</dd>

                    <dt>Image</dt>
                    <dd>
                        {employee.Image ? (
                            <img
                                src={`http://127.0.0.1:5001${employee.Image}`}
                                alt={employee.Name}
                                width="150"
                                height="100"
                                style={{ objectFit: "cover", borderRadius: "8px" }}
                            />
                        ) : (
                            <p>No image available</p>
                        )}
                    </dd>

                    <dt>Name</dt>
                    <dd>{employee.Name}</dd>

                    <dt>Email</dt>
                    <dd>{employee.Email}</dd>

                    <dt>Mobile</dt>
                    <dd>{employee.Mobile}</dd>

                    <dt>Designation</dt>
                    <dd>{employee.Designation}</dd>

                    <dt>Gender</dt>
                    <dd>{employee.Gender}</dd>

                    <dt>Course</dt>
                    <dd>
                        {Array.isArray(employee.Course)
                            ? employee.Course.join(", ") // Join courses if it's an array Default to "N/A" if Course is undefined or null
                            : employee.Course || "N/A"} 
                    </dd>
                </dl>
            ) : (
                <p>No employee details available.</p> // Fallback if employee data is not set
            )}

            <Link to="/list" className="btn btn-secondary mt-3">
                Back to Employee List
            </Link>
        </div>
    );
}




