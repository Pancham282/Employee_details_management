
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import { useCookies } from "react-cookie";

export function EmployeeLogin() {
    const navigate = useNavigate();
    const [cookies, setCookies] = useCookies();

    // Validation schema using Yup
    const validationSchema = yup.object({
        UserName: yup.string().required("UserName is required"),
        Password: yup.string().required("Password is required"),
    });

    const handleLogin = async (values) => {
        try {
            const response = await axios.get("http://127.0.0.1:5001/login");
            const users = response.data;

            let isValidUser = false;
            for (const user of users) {
                if (user.UserName === values.UserName && user.Password === values.Password) {
                    // Set cookie with the username
                    setCookies("userName", values.UserName);
                    isValidUser = true;
                    navigate("/home"); // Navigate to home page
                    break;
                }
            }

            if (!isValidUser) {
                navigate("/invalid"); // Navigate to invalid login page
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    return (
        <div className="container-fluid">
            <h2 className="text-center my-4">User Login</h2>
            <Formik
                initialValues={{
                    UserName: "",
                    Password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
            >
                {() => (
                    <Form>
                        <dl>
                            <dt>User Name</dt>
                            <dd>
                                <Field
                                    type="text"
                                    name="UserName"
                                    className="form-control"
                                    style={{ width: 300 }}
                                    placeholder="Enter your username"
                                />
                            </dd>
                            <dd className="text-danger">
                                <ErrorMessage name="UserName" />
                            </dd>

                            <dt>Password</dt>
                            <dd>
                                <Field
                                    type="password"
                                    name="Password"
                                    className="form-control"
                                    style={{ width: 300 }}
                                    placeholder="Enter your password"
                                />
                            </dd>
                            <dd className="text-danger">
                                <ErrorMessage name="Password" />
                            </dd>
                        </dl>
                        <button type="submit" className="btn btn-success">
                            Login
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
