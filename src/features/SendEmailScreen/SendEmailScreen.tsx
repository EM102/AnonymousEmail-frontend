import axios from "axios";
import "./SendEmailcss.css";
import { Clear } from "../..";
import { useAuth } from "../../protectedRoutes/protected";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { CircularProgress } from "@mui/material";
import { reset } from "../Users.slice";
import { useDispatch } from "react-redux";
import Alert from "@mui/material/Alert";
import { Collapse } from "@mui/material";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import * as Yup from "yup";
import { useState } from "react";

function SendEmailScreen() {
  //Alert Success
  const [open, setOpen] = useState(false);

  //Navigation
  const navigate = useNavigate();

  //Auth
  const auth = useAuth();

  //dispatch
  const dispatch = useDispatch();

  //Yup validation
  const SignInSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    subject: Yup.string().required("Required"),
    text: Yup.string().required("Required"),
  });

  //Logout
  const logout = () => {
    Clear();
    auth.logout();
    dispatch(reset([]));
    navigate("/", { replace: true });
  };

  //On Send button press
  const onSend = async (email: any, subject: any, text: any) => {
    try {
      await axios.post("http://localhost:8888/client/sendEmail", {
        email,
        subject,
        text,
      });
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  //UI
  return (
    <div className="SignUp">
      <Formik
        initialValues={{ email: "", subject: "", text: "" }}
        validationSchema={SignInSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            onSend(values.email, values.subject, values.text);
          }, 500);
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
            <h1>Send Email</h1>
            <input
              className="Input2"
              type="email"
              name="email"
              placeholder="Enter email..."
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            <br />
            <p style={{ margin: 0 }} className="errorEmail">
              {errors.email && touched.email && errors.email}
            </p>
            <br />
            <input
              className="Input2"
              type="subject"
              name="subject"
              placeholder="Enter subject..."
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.subject}
            />
            <br />
            <p style={{ margin: 0 }} className="errorEmail">
              {errors.subject && touched.subject && errors.subject}
            </p>
            <br />
            <textarea
              className="textArea"
              name="text"
              placeholder="Enter text..."
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.text}
              rows={15}
            />
            <br />
            <p style={{ margin: 0 }} className="errorEmail">
              {errors.text && touched.text && errors.text}
            </p>
            <br />
            {!isSubmitting && (
              <button
                className="submitButton"
                type="submit"
                disabled={isSubmitting}
              >
                <p style={{ margin: 0 }}>Send</p>
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
            <br />
            <br />
            <Collapse in={open} className="AlertEmail">
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                Thank you for your feedback - your message has been sent
              </Alert>
            </Collapse>
            <button
              className="logoutButton"
              onClick={() => {
                logout();
              }}
            >
              <p style={{ margin: 0 }}>Logout</p>
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default SendEmailScreen;
