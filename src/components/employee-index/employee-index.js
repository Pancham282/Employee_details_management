import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { EmployeeLogin } from "../employee-login/employee-login.js";
import { EmployeeInvalid } from "../employee-invalid/employee-invalid.js";
import { EmployeeCreate } from "../employee-create/employee-create.js";
import { EmployeeList } from "../employee-list/employee-list.js";
import { EmployeeDetails } from "../employee-details/employee-details.js";
import { EmployeeUpdate } from "../employee-update/employee-update.js";
import { useCookies } from "react-cookie";
import { HomeComponent } from "../employee-home/employee-home.js";
import { SignoutClick } from "../employee-signout/employee-signout.js";
import { useEffect } from "react";

export function EmployeeIndex() {
  const [cookies, removeCookies] = useCookies(["userName"]);
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies["userName"]===undefined) {
          navigate("/login");
    }
  },[]);

  return (
    <div className="container-fluid">
      <header className="d-flex p-2 justify-content-between align-items-center">
        <div>
          <h2>Employee Management</h2>
        </div>
        <nav className="d-flex">
          <div className="me-4">
            <Link to="/home" className="btn btn-outline-primary">
              Home
            </Link>
          </div>
          <div className="me-4">
          <Link to="/list" className="btn btn-outline-secondary"> 
          Employee List
            </Link>
          </div>
        </nav>
        <div>
          <span className="me-2">{cookies["userName"]}</span> 
          <button
            type="button"
            onClick={() => SignoutClick(removeCookies, navigate)}
            className="btn btn-link"
            style={{ textDecoration: "none", color: "inherit" }}
            aria-label="Sign out" 
          >
            Sign Out
          </button>
        </div>  
      </header>

      <main className="mt-3">
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/home" element={<HomeComponent />} />
          <Route path="/list" element={<EmployeeList />} />
          <Route path="/login" element={<EmployeeLogin />} />
          <Route path="/invalid" element={<EmployeeInvalid />} />
          <Route path="/create" element={<EmployeeCreate />} />
          <Route path="/empdetails/:id" element={<EmployeeDetails />} />
          <Route path="/updateEmpdetail/:id" element={<EmployeeUpdate />} />
          {/* <Route path="*" element={<EmployeeInvalid />} /> Catch-all for undefined routes */}

        </Routes>
      </main>
    </div>
  );
}


