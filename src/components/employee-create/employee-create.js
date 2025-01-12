import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as yup from "yup";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export function EmployeeCreate() {
  const navigate = useNavigate();
  const [emails, setEmails] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  // Fetch existing emails from the server
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5001/emails")
      .then((response) => setEmails(response.data))
      .catch((error) => console.error("Error fetching emails:", error));
  }, [emails]);

  const validationSchema = yup.object({
    Name: yup.string().required("User Name is Required"),
    Email: yup
      .string()
      .email("Invalid Email")
      .required("User Email is Required")
      .test(
        "unique-email",
        "Email already exists, try another email",
        (value) => value && Array.isArray(emails) && !emails.includes(value)
      ),
    Mobile: yup
      .string()
      .required("User Mobile is Required")
      .matches(/\+91\d{10}/, "Invalid Mobile: +91 followed by 10 digits"),
    Designation: yup.string().required("User Designation is Required"),
    Gender: yup.string().required("User Gender is Required"),
    Course: yup.array().min(1, "Select at least one Course"),
    Image: yup.mixed()
      .required("User Image is Required")
      .test(
        "fileFormat",
        "Only .jpg or .png files are allowed",
        (value) =>
          value ? ["image/jpeg", "image/png"].includes(value.type) : false
      )
      .test(
        "fileSize",
        "File size is too large (maximum 2MB allowed)",
        (value) => !value || (value && value.size <= 1024 * 1024 * 2)
      ),
  });

  const handleSubmit = (values, { resetForm, setFieldValue }) => {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }

    axios
      .post("http://127.0.0.1:5001/insertEmpDetails", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        alert("Employee Registered Successfully.");
        resetForm();
        setImagePreview(null);
        if (fileInputRef.current) 
          fileInputRef.current.value = "";

        navigate("/list");
      })
      .catch((error) => {
        alert("Error submitting the form: " + error.message);
      });
  };

  return (
    <div className="container-fluid">
      <h3>Create Employee</h3>
      <Formik
        initialValues={{
          Name: "",
          Email: "",
          Mobile: "",
          Designation: "",
          Gender: "",
          Course: [],
          Image: null,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, validateField }) => (
          <Form>
            <dl>
              <dt>Name</dt>
              <dd>
                <Field type="text" name="Name" className="form-control" style={{ width: "240px" }} />
              </dd>
              <dd className="text-danger">
                <ErrorMessage name="Name" />
              </dd>

              <dt>Email</dt>
              <dd>
                <Field
                  type="text"
                  name="Email"
                  className="form-control"
                  onKeyUp={(e) => {
                    setFieldValue("Email", e.target.value);
                    validateField("Email");
                  }}
                  style={{ width: "240px" }}
                />
              </dd>
              <dd className="text-danger">
                <ErrorMessage name="Email" />
              </dd>

              <dt>Mobile</dt>
              <dd>
                <Field type="text" name="Mobile" className="form-control" style={{ width: "240px" }}/>
              </dd>
              <dd className="text-danger">
                <ErrorMessage name="Mobile" />
              </dd>

              <dt>Designation</dt>
              <dd>
                <Field as="select" name="Designation" className="form-control" style={{ width: "240px" }}>
                  <option value="">Select Designation</option>
                  <option value="hr">HR</option>
                  <option value="manager">Manager</option>
                  <option value="sales">Sales</option>
                </Field>
              </dd>
              <dd className="text-danger">
                <ErrorMessage name="Designation" />
              </dd>

              <dt>Gender</dt>
              <dd>
                <Field name="Gender" type="radio" value="Male" /> Male{" "}
                <Field name="Gender" type="radio" value="Female" /> Female
              </dd>
              <dd className="text-danger">
                <ErrorMessage name="Gender" />
              </dd>

              <dt>Course</dt>
              <dd>
                <Field name="Course" type="checkbox" value="MCA" /> MCA{" "}
                <Field name="Course" type="checkbox" value="BCA" /> BCA{" "}
                <Field name="Course" type="checkbox" value="BSC" /> BSC
              </dd>
              <dd className="text-danger">
                <ErrorMessage name="Course" />
              </dd>

              <dt>Upload Image</dt>
              <dd>
                <input
                  type="file"
                  name="Image"
                  accept="image/jpeg, image/png"
                  className="form-control"
                  ref={fileInputRef}
                  onChange={(event) => {
                    const file = event.target.files[0];
                    if (file) {
                      const previewUrl = URL.createObjectURL(file);
                      setImagePreview(previewUrl);
                      setFieldValue("Image", file);
                    }
                  }}
                  style={{ width: "240px" }}
                />
                {imagePreview && (
                  <div className="mt-3">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="img-thumbnail"
                      style={{
                        width: "150px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  </div>
                )}

              </dd>
              <dd className="text-danger">
                <ErrorMessage name="Image" />
              </dd>
            </dl>
            <div className=" mt-3">
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}


