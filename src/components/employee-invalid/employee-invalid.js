import {Link} from "react-router-dom"; 

export function EmployeeInvalid(){
    return(
        <div className="text-danger text-center" style={{ marginTop: "50px" }}>
            <h3>Invalid User Name / Password</h3>
            <p>
        Please <Link to="/login">try again</Link>.
      </p>
        </div>
    );
}

