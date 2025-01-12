import axios from "axios";

export const handleSearch = async (searchValue, setEmployees) => {
    try {
        if (!searchValue.trim()) {
            // Fetch all employees if search value is empty or whitespace
            const response = await axios.get("http://127.0.0.1:5001/empDetail");
            setEmployees(response.data);
        } else {
            // Correctly use the /detail/:searchValue endpoint
            const response = await axios.get(`http://127.0.0.1:5001/searchEmp/detail/${searchValue}`);
            setEmployees(response.data);
        }
    } catch (error) {
        console.error("Error searching employees:", error);
        setEmployees([]); // Set an empty list if no results or an error occurs
    }
};
