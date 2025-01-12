
import axios from "axios";

export const deleteEmployee = async (uniqueId, setEmployees, employees) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
        try {
             // Makes a DELETE request to the backend to delete the employee
            await axios.delete(`http://127.0.0.1:5001/deleteEmp/deleteEmpDetails/${uniqueId}`); 
            
            alert("Record Deleted successfully.");
            setEmployees(employees.filter((employee) => employee.UniqueId !== uniqueId));
        } catch (error) {
            console.error("Error deleting employee:", error);
            alert("Error deleting employee. Please try again.");
        }
    }
};


