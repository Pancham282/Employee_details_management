import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { deleteEmployee } from "../employee-delete/employee-delete.js";  // Import the delete function
import { handleSearch } from "../employee-search/employee-search.js";// Import the search function
import { useCookies } from "react-cookie";


export function EmployeeList() {
    const [employees, setEmployees] = useState([]); // State to store employee data
    const [cookies] = useCookies();
    const navigate = useNavigate();
    
// Fetch employees and handle authentication
    useEffect(() => {
        if (!cookies["userName"]) {
            navigate("/login");
        }
        axios
            .get("http://127.0.0.1:5001/empDetail")
            .then((response) => {
                console.log("API Response:", response.data);
                setEmployees(response.data); // Set employee data on success
            })
            .catch((error) => {
                console.error("Error fetching employee details:", error);
            });
        
    }, []);

    return (
        <div>
            <h2>Employee List</h2>
            <div>
                <h3>Hello ! - {cookies["userName"]}</h3>
            </div>
            <div className="d-flex justify-content-end mb-3">
                <h2 className="mb-0 me-5">Total Count: {employees.length}</h2>
                <Link to="/create" className="btn btn-primary">Create Employee</Link>
            </div>
            <div className="d-flex justify-content-end mb-2">
                <label className="me-2 fs-4 fw-bold">Search</label>
                <input
                    type="text"
                    placeholder="Search by name, id, email, or YYYY-MM-DD..."
                    className="form-control w-25 mb-2"
                    onChange={(e) => handleSearch(e.target.value, setEmployees)} // Pass setEmployees to handleSearch
                />
            </div>
            <table className="table table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>Unique Id</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile No</th>
                        <th>Designation</th>
                        <th>Gender</th>
                        <th>Course</th>
                        <th>Create Date</th>
                        <th>LastUpdatedDate</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                     {
                      employees.length > 0 ? (
                        employees.map((employee) => (
                           
                            <tr key={employee.UniqueId}>
                                <td>{employee.UniqueId}</td>
                                <td>
                                    <img
                                        src={`http://127.0.0.1:5001${employee.Image}` }
                                        alt={`Profile of ${employee.Name}`}
                                        
                                        style={{ width: "150px", height: "100px", objectFit: "cover"  }}
                                        
                                    />
                                    { console.log("Employee Image Path:", `http://127.0.0.1:5001${employee.Image}`)}
                                </td>
                                <td>{employee.Name}</td>
                                <td>{employee.Email}</td>
                                <td>{employee.Mobile}</td>
                                <td>{employee.Designation}</td>
                                <td>{employee.Gender}</td>                               
                                <td>{Array.isArray(employee.Course) ? employee.Course.join(", ") : employee.Course || "N/A"}</td>
                                <td>{new Date(employee.CreateDate).toLocaleDateString()}</td>
                                <td>{employee.LastUpdatedDate}</td>
                                <td>
                                    <Link 
                                        to={`/empDetails/${employee.UniqueId}`} 
                                        className="btn btn-info me-1"
                                        title="View Employee"
                                    >
                                        <span className="bi bi-eye"></span>
                                    </Link>
                                  
                                    <Link 
                                        to={`/updateEmpdetail/${employee.UniqueId}`} 
                                        className="btn btn-warning me-1"
                                        title="Edit Employee"
                                    >
                                        <span className="bi bi-pen"></span>
                                    </Link>

                                    <button 
                                        className="btn btn-danger" 
                                        onClick={() => deleteEmployee(employee.UniqueId, setEmployees, employees)}
                                    >
                                        <span className="bi bi-trash"></span>
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="10" className="text-center">
                                No employees found.
                            </td>
                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    );
}

