import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../Context/UserContext";
import { auth, createUserWithEmailAndPassword } from "./../firebase";
import "./SignUp.css";
import img from "./../../assets/login.jpg";
import { Link } from "react-router-dom";
import { db } from "./../firebase";
import { doc, setDoc } from "firebase/firestore";

export default function SignUp() {
  // Validation Schema
  let validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(5, "Minimum length is 5")
      .max(30, "Maximum length is 30"),
    email: Yup.string()
      .required("Email is required")
      .email("Enter a valid email"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^01[1250][0-9]{8}$/, "Phone should be 11 number"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^[A-Z][a-z0-9]{6,12}$/,
        "Password must be 6-12 characters, start with a capital letter, and contain only lowercase letters and digits"
      ),
    rePassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password")],"Passwords must match"  ),});

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleRegister,
  });
  let [userNo,setUserNo]=useState(1)
  

  let navigate = useNavigate();
  const [apiError, SetapiError] = useState("");
  let { SetIsLogin } = useContext(UserContext);

  async function handleRegister(formData) {
    try {
      // Use Firebase Authentication to create a new user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      setUserNo(userNo++)
      await setDoc(doc(db, "Users", `User${userNo}`), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        createdAt: new Date(),
        UserId:user.uid
      });

      // Once the user is created, store the token
      const token = await user.getIdToken(); // Get Firebase token

      // Save token in local storage and set login state
      localStorage.setItem("UserToken", token);
      localStorage.setItem("User", JSON.stringify(user));
      SetIsLogin(token);

      console.log("User registered successfully:", user);

      // Redirect to login page
      navigate("/login");
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          SetapiError("This email is already in use.");
          break;
        case "auth/weak-password":
          SetapiError("Password is too weak.");
          break;
        default:
          SetapiError(error.message);
      }
    }
  }

  return (
    <>
      <section className="vh-100 signup">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-12 col-xl-12">
              <div className="text-black">
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>

                      {apiError ? (
                        <div className="api text-danger bg-light px-2 my-2 py-2 rounded">
                          {apiError}
                        </div>
                      ) : null}

                      <form
                        className="mx-1 mx-md-4"
                        onSubmit={formik.handleSubmit}
                      >
                        {/* Name Field */}
                        <div className="d-flex flex-row align-items-center mb-3">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="formName"
                              name="name"
                              value={formik.values.name}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              placeholder="Your Name"
                              className={`form-control ${
                                formik.touched.name && formik.errors.name
                                  ? "is-invalid"
                                  : ""
                              }`}
                              required
                            />
                            {formik.touched.name && formik.errors.name ? (
                              <div className="text-danger small mt-1">
                                {formik.errors.name}
                              </div>
                            ) : null}
                          </div>
                        </div>

                        {/* Email Field */}
                        <div className="d-flex flex-row align-items-center mb-3">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
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
                        <div className="d-flex flex-row align-items-center mb-3">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              id="formPass"
                              name="password"
                              value={formik.values.password}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              placeholder="Password"
                              className={`form-control ${
                                formik.touched.password &&
                                formik.errors.password
                                  ? "is-invalid"
                                  : ""
                              }`}
                              required
                            />
                            {formik.touched.password &&
                            formik.errors.password ? (
                              <div className="text-danger small mt-1">
                                {formik.errors.password}
                              </div>
                            ) : null}
                          </div>
                        </div>

                        {/* Confirm Password Field */}
                        <div className="d-flex flex-row align-items-center mb-3">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              placeholder="Repeat your password"
                              name="rePassword"
                              value={formik.values.rePassword}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              id="formRePass"
                              className={`form-control ${
                                formik.touched.rePassword &&
                                formik.errors.rePassword
                                  ? "is-invalid"
                                  : ""
                              }`}
                              required
                            />
                            {formik.touched.rePassword && formik.errors.rePassword ? (
                              <div className="text-danger small mt-1">
                                {formik.errors.rePassword}
                              </div>
                            ) : null}
                          </div>
                        </div>

                        {/* Phone Field */}
                        <div className="d-flex flex-row align-items-center mb-3">
                          <i className="fas fa-phone fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="tel"
                              placeholder="Your Phone"
                              name="phone"
                              value={formik.values.phone}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              id="formPhone"
                              className={`form-control ${
                                formik.touched.phone && formik.errors.phone
                                  ? "is-invalid"
                                  : ""
                              }`}
                              required
                            />
                            {formik.touched.phone &&
                            formik.errors.phone ? (
                              <div className="text-danger small mt-1">
                                {formik.errors.phone}
                              </div>
                            ) : null}
                          </div>
                        </div>

                        {/* Submit Button */}
                        <div className="d-flex justify-content-center mx-4 mt-5 flex-column align-items-center ">
                          <button
                            type="submit"
                            data-mdb-button-init
                            data-mdb-ripple-init
                            className="btn btn-primary btn-lg "
                          >
                            Register
                          </button>
                          <p>
                            Already have an account?{" "}
                            <Link to={"/login"}>LogIn</Link>{" "}
                          </p>
                        </div>
                      </form>
                    </div>

                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img src={img} className="img-fluid" alt="Sample image" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
