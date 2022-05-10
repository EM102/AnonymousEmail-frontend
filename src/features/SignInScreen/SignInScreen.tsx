/* eslint-disable jsx-a11y/alt-text */
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../Users.slice";
import Areeba2 from "../../assets/images/Areeba2.jpg";
import { useAuth } from "../../protectedRoutes/protected";
import { Formik } from "formik";
import CircularProgress from "@mui/material/CircularProgress";
import * as Yup from "yup";
import "./SignIncss.css";

const SignIn = () => {
  //Input variable
  const users = { email: "", password: "" };
  const navigate = useNavigate();

  //auth
  const auth = useAuth();

  //Yup validation
  const SignInSchema = Yup.object().shape({
    password: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });

  //redux
  const userList = useSelector((state: any) => state.users.value);
  const dispatch = useDispatch();

  //SignIn press
  const onSignIn = (email: string, password: string) => {
    if (email === "" || password === "") {
      alert("Please fill the required fields");
    } else {
      axios
        .post("http://localhost:8888/client/signin", {
          email,
          password,
        })
        .then((result) => {
          dispatch(
            addUser({
              id: userList[userList.length - 1].id + 1,
              email,
              password,
              token: result.data.token,
            })
          );
          console.log(result.data.token);
          console.log("test");
          auth.login(users);
          navigate("/SendEmailScreen");
        })
        .catch((err) => alert("Wrong credentials"));
    }
  };

  //UI
  return (
    <div className="SignIn">
      <img className="logo" src={Areeba2} />
      <Formik
        initialValues={{ email: "", password: "" }}
        // validate={(values) => {
        //   const errors: any = {};
        //   if (!values.email && !values.password) {
        //     errors.email = "Email is required";
        //     errors.password = "Password is required";
        //   } else if (!values.email) {
        //     errors.email = "Email is required";
        //   } else if (
        //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        //   ) {
        //     errors.email = "Invalid email address";
        //   } else if (!values.password) {
        //     errors.password = "Password is required";
        //   }
        //   return errors;
        // }}
        validationSchema={SignInSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            onSignIn(values.email, values.password);
          });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <input
              className="Input"
              type="email"
              name="email"
              placeholder="Enter email..."
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            <br />
            <p style={{ margin: 0 }} className="error">
              {errors.email && touched.email && errors.email}
            </p>
            <br />
            <input
              className="Input"
              type="password"
              name="password"
              placeholder="Enter password..."
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            <br />
            <p style={{ margin: 0 }} className="error">
              {errors.password && touched.password && errors.password}
            </p>
            <br />
            {!isSubmitting && (
              <button
                className="submitButton"
                type="submit"
                disabled={isSubmitting}
              >
                <p style={{ margin: 0 }}>Submit</p>
              </button>
            )}

            {isSubmitting && (
              <button
                className="submitButton"
                type="submit"
                disabled={isSubmitting}
              >
                <CircularProgress />
              </button>
            )}
          </form>
        )}
      </Formik>
    </div>
  );
};

export default SignIn;
