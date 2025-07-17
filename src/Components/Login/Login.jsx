import React, { useState, useContext } from "react";
import "./Login.css";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import * as Yup from "yup";
import img from "./../../assets/login2.jpg";
import { auth } from "./../firebase"; // import Firebase auth module
import { signInWithEmailAndPassword } from "firebase/auth"; // import the Firebase signIn function

export default function Login() {
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Enter a valid email"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^[A-Z][a-z0-9]{6,12}$/,
        "Password must be 6-12 characters, start with a capital letter, and contain only lowercase letters and digits"
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleLogin,
  });

  const navigate = useNavigate();
  const [apiError, SetapiError] = useState("");
  const { SetIsLogin } = useContext(UserContext);

  async function handleLogin(formData) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      console.log("User logged in successfully:", user);

      const token = await user.getIdToken();
      
      localStorage.setItem("UserToken", token);

      SetIsLogin(token);

      navigate("/dashboard");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        SetapiError("No account found for this email.");
      } else if (error.code === "auth/wrong-password") {
        SetapiError("Incorrect password. Please try again.");
      } else {
        SetapiError("Something went wrong. Please try again later.");
      }
    }
  }

  return (
    <section className="d-flex justify-content-center align-items-center vh-100 login">
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-10 col-lg-7 p-5 col-xl-6 order-2 order-lg-1">
            <form
              className="mx-1 mx-md-4 w-100 p-5"
              onSubmit={formik.handleSubmit}
            >
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                Log In
              </p>

              {apiError ? (
                <div className="api text-danger bg-light px-2 my-2 py-2 rounded">
                  {apiError}
                </div>
              ) : null}

              {/* Email Field */}
              <div className="d-flex flex-row align-items-center mb-4">
                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                  <input
                    type="email"
                    id="formMail"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Your Email"
                    className={`form-control ${
                      formik.touched.email && formik.errors.email
                        ? "is-invalid"
                        : ""
                    }`}
                    required
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-danger small mt-1">
                      {formik.errors.email}
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Password Field */}
              <div className="d-flex flex-row align-items-center mb-4">
                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                  <input
                    type="password"
                    id="formPass"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Password"
                    className={`form-control ${
                      formik.touched.password && formik.errors.password
                        ? "is-invalid"
                        : ""
                    }`}
                    required
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-danger small mt-1">
                      {formik.errors.password}
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Submit Button */}
              <div className="d-flex justify-content-center mx-4 mb-3 mt-5 mb-lg-4 flex-column align-items-center">
                <button
                  type="submit"
                  data-mdb-button-init
                  data-mdb-ripple-init
                  className="btn btn-primary btn-lg"
                >
                  LogIn
                </button>
                <p>
                  <Link to={"/signup"}>Create New Account?</Link>
                </p>
              </div>
            </form>
          </div>

          {/* Image */}
          <div className="col-md-9 col-lg-5 col-xl-6 d-flex align-items-center order-1 order-lg-2">
            <img src={img} className="img-fluid" alt="Sample image" />
          </div>
        </div>
      </div>
    </section>
  );
}
