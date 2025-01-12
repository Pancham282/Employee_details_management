                  
import { useEffect, useState } from "react";
import { useNavigate, useParams,Link } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

export function EmployeeUpdate() {
  const params = useParams(); // Get the employee ID from URL params
  const navigate = useNavigate(); // For navigation after update
  const [employee, setEmployee] = useState(null); // Initialize as null
  const [error, setError] = useState(null);

  
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5001/viewDetails/empId/${params.id}`)
      .then((response) => {
        console.log("API Response:", response.data);
        setEmployee(response.data); // Set employee data on success
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching Employee Details", error);
        setError("Failed to fetch employee details. Please try again later.");
      });
  }, [params.id]);

  // Validation schema for Formik using Yup
  const validationSchema = yup.object({
    Name: yup.string().required("Name is required"),
    Email: yup.string().email("Invalid email").required("Email is required"),
    Mobile: yup
      .string()
      .matches(/^[+0-9]{10,15}$/, "Invalid mobile number")
      .required("Mobile is required"),
    Designation: yup.string().required("Designation is required"),
    Gender: yup.string().required("Gender is required"),
    Course: yup.array().min(1, "At least one course must be selected"),
    Image: yup.mixed().nullable(),
  });

  // Form submission handler
  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append("UniqueId", values.UniqueId);
    formData.append("Name", values.Name);
    formData.append("Email", values.Email);
    formData.append("Mobile", values.Mobile);
    formData.append("Designation", values.Designation);
    formData.append("Gender", values.Gender);
    values.Course.forEach((course) => formData.append("Course", course));
    if (values.Image) {
      formData.append("Image", values.Image);
    }

    axios
      .put(`http://127.0.0.1:5001/updateDetails/updateEmpDetails/${params.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        alert("Employee details updated.");
        navigate("/list");
      })
      .catch((error) => {
        console.error("Error updating employee:", error);
        alert("Failed to update employee details.");
      });
  };

  // Display error message if data fetching fails
  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  // Show loading state while data is being fetched
  if (!employee) {
    return <div>Loading...</div>;
  }

  const initialValues = {
    UniqueId: employee.UniqueId || "",
    Name: employee.Name || "",
    Email: employee.Email || "",
    Mobile: employee.Mobile || "",
    Designation: employee.Designation || "",
    Gender: employee.Gender || "",
    Course: employee.Course
      ? Array.isArray(employee.Course)
        ? employee.Course
        : employee.Course.split(",").map((c) => c.trim())
      : [],
    Image: null,
  };

  const imageBaseUrl = "http://127.0.0.1:5001";

  return (
    <div className="container mt-4">
      <h2>Update Employee Details</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ setFieldValue, values }) => (
          <Form>
            {/* Form fields */}
            {/* Unique ID */}
            <dl className="row">
              <dt className="col-sm-3">Unique ID</dt>
              <dd className="col-sm-9">
                <Field type="text" name="UniqueId" className="form-control" readOnly />
                <ErrorMessage
                  name="UniqueId"
                  component="div"
                  className="text-danger"
                />
              </dd>
              {/* Other fields */}
              
               {/* Name Field */}
               <dt className="col-sm-3">Name</dt>
               <dd className="col-sm-9">
                 <Field
                  type="text"
                  name="Name"
                  className="form-control"
                  placeholder="Enter name"
                />
                <ErrorMessage
                  name="Name"
                  component="div"
                  className="text-danger"
                />
              </dd>

               {/* Email Field */}
              <dt className="col-sm-3">Email</dt>
              <dd className="col-sm-9">
                <Field
                  type="email"
                  name="Email"
                  className="form-control"
                  placeholder="Enter email"
                />
                <ErrorMessage
                  name="Email"
                  component="div"
                  className="text-danger"
                />
              </dd>

               {/* Mobile Field */}
              <dt className="col-sm-3">Mobile</dt>
              <dd className="col-sm-9">
                <Field
                  type="text"
                  name="Mobile"
                  className="form-control"
                  placeholder="Enter mobile number"
                />
                <ErrorMessage
                  name="Mobile"
                  component="div"
                  className="text-danger"
                />
              </dd>

               {/* Designation Dropdown */}
              <dt className="col-sm-3">Designation</dt>
              <dd className="col-sm-9">
                <Field
                  as="select"
                  name="Designation"
                  className="form-control"
                >
                  <option value="">Select Designation</option>
                  <option value="hr">HR</option>
                  <option value="manager">Manager</option>
                  <option value="sales">Sales</option>
                </Field>
                <ErrorMessage
                  name="Designation"
                  component="div"
                  className="text-danger"
                />
              </dd>

               {/* Gender Radio Buttons */}
              <dt className="col-sm-3">Gender</dt>
              <dd className="col-sm-9">
                <div role="group" aria-labelledby="gender-group">
                  <label className="me-3">
                    <Field type="radio" name="Gender" value="Male" />
                    Male
                  </label>
                  <label>
                    <Field type="radio" name="Gender" value="Female" />
                    Female
                  </label>
                </div>
                <ErrorMessage
                  name="Gender"
                  component="div"
                  className="text-danger"
                />
              </dd>

               {/* Course Checkboxes */}
              <dt className="col-sm-3">Course</dt>
              <dd className="col-sm-9">
                <div role="group" aria-labelledby="checkbox-group">
                  <label className="me-3">
                    <Field type="checkbox" name="Course" value="MCA" />
                    MCA
                  </label>
                  <label className="me-3">
                    <Field type="checkbox" name="Course" value="BCA" />
                    BCA
                  </label>
                  <label>
                    <Field type="checkbox" name="Course" value="BSC" />
                    BSC
                  </label>
                </div>
                <ErrorMessage
                  name="Course"
                  component="div"
                  className="text-danger"
                />
              </dd>

               {/* Image Upload and Preview */}
              <dt className="col-sm-3">Upload Image</dt>
              <dd className="col-sm-9">
                <input
                  type="file"
                  name="Image"
                  accept="image/jpeg, image/png"
                  className="form-control"
                  onChange={(event) => {
                    const file = event.currentTarget.files[0];
                    setFieldValue("Image", file);
                  }}
                />
                 {/* //For file inputs, Formik does not handle onChange by default. 
                // You need to handle it manually using setFieldValue. event.currentTarget.files[0] */}
                <ErrorMessage
                  name="Image"
                  component="div"
                  className="text-danger"
                />

                 {/* Display Existing Image */}
                {employee.Image && (
                  <div className="mt-3">
                    <p>Current Image:</p>
                    <img
                      src={`${imageBaseUrl}${employee.Image}`}
                      alt="Employee"
                      className="img-thumbnail"
                      style={{ width: "150px", height: "100px" }}
                    />
                  </div>
                )}

                {/* Display New Image Preview */}
                {values.Image && (
                  <div className="mt-3">
                    <p>New Image Preview:</p>
                    <img
                      src={URL.createObjectURL(values.Image)}
                      alt="Preview"
                      className="img-thumbnail"
                      style={{ width: "150px", height: "100px" }}
                    />
                  </div>
                )}
              </dd>
            </dl>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </Form>
        )}
      </Formik>
      <Link to="/list" className="btn btn-secondary mt-3">
                Back to Employee List
            </Link>
    </div>
  );
}
