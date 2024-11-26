import { Formik } from "formik";
import * as Yup from "yup";
import styles from "./SignUpForm.module.scss";
import classNames from "classnames/bind";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchCreateUser } from "../../../../store/slices/UserSlice";
import { RootState } from "../../../../store/store";
import { Link, NavLink, useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);

const SignUpForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData: any = useSelector(
    (state: RootState) => state.userState.users
  );
  const initialValues = {
    username: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    phone: Yup.string().required("Phone is required"),
    address: Yup.string().required("Address is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = (values: any) => {
    const value: any = {
      username: values.username,
      phone: values.phone,
      address: values.address,
      password: values.password,
      isAdmin: false,
    };
    navigate("/userLogin", { state: value });
  };

  return (
    <div className={cx("sign-up-form-container")}>
      <Link to="/" className={cx("link")}>
        Quay lại
      </Link>
      <Container className={cx("sign-up-form")}>
        <Typography
          variant="h4"
          component="h4"
          fontWeight="bold"
          color="#131118"
          sx={{ fontSize: "40px", marginTop: "30px" }}
        >
          Create New Account
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            errors,
            touched,
          }) => (
            <form onSubmit={handleSubmit} className={cx("form")}>
              <Typography
                sx={{
                  fontFamily: "Jost",
                  fontStyle: "normal",
                  fontWeight: "600",
                  fontSize: "20px",
                  lineHeight: "17px",
                  color: "#131118",
                  mt: 2,
                }}
              >
                Username
              </Typography>
              <TextField
                type="text-area"
                fullWidth
                className={cx("input")}
                id="username"
                name="username"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
                slotProps={{
                  input: {
                    style: { fontSize: "16px" },
                  },
                  inputLabel: {
                    style: {
                      fontSize: "18px",
                      fontFamily: "Jost",
                      fontStyle: "normal",
                      fontWeight: "400",
                      lineHeight: "17px",
                      color: "#131118",
                    },
                  },
                  formHelperText: {
                    style: { fontSize: "16px" },
                  },
                }}
              />
              <Typography
                sx={{
                  fontFamily: "Jost",
                  fontStyle: "normal",
                  fontWeight: "600",
                  fontSize: "20px",
                  lineHeight: "17px",
                  color: "#131118",
                  mb: 1,
                }}
              >
                Phone
              </Typography>
              <TextField
                fullWidth
                className={cx("input")}
                type="text-area"
                id="phone"
                name="phone"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
                error={touched.phone && Boolean(errors.phone)}
                helperText={touched.phone && errors.phone}
                slotProps={{
                  input: {
                    style: { fontSize: "16px" },
                  },
                  inputLabel: {
                    style: {
                      fontSize: "18px",
                      transform: "translate(14px, 12px) scale(1)",
                      fontFamily: "Jost",
                      fontStyle: "normal",
                      fontWeight: "400",
                      lineHeight: "17px",
                      color: "#131118",
                    },
                  },
                  formHelperText: {
                    style: { fontSize: "16px" },
                  },
                }}
              />
              <Typography
                sx={{
                  fontFamily: "Jost",
                  fontStyle: "normal",
                  fontWeight: "600",
                  fontSize: "20px",
                  lineHeight: "17px",
                  color: "#131118",
                  mb: 1,
                }}
              >
                Address
              </Typography>
              <TextField
                fullWidth
                className={cx("input")}
                type="text-area"
                id="address"
                name="address"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address}
                error={touched.address && Boolean(errors.address)}
                helperText={touched.address && errors.address}
                slotProps={{
                  input: {
                    style: { fontSize: "16px" },
                  },
                  inputLabel: {
                    style: {
                      fontSize: "18px",
                      transform: "translate(14px, 12px) scale(1)",
                      fontFamily: "Jost",
                      fontStyle: "normal",
                      fontWeight: "400",
                      lineHeight: "17px",
                      color: "#131118",
                    },
                  },
                  formHelperText: {
                    style: { fontSize: "16px" },
                  },
                }}
              />

              <Typography
                sx={{
                  fontFamily: "Jost",
                  fontStyle: "normal",
                  fontWeight: "600",
                  fontSize: "20px",
                  lineHeight: "17px",
                  color: "#131118",
                  mb: 1,
                }}
              >
                Password
              </Typography>
              <TextField
                fullWidth
                className={cx("input")}
                id="password"
                name="password"
                type="password"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                slotProps={{
                  input: {
                    style: { fontSize: "16px" },
                  },
                  inputLabel: {
                    style: {
                      fontSize: "18px",
                      transform: "translate(14px, 12px) scale(1)",
                      fontFamily: "Jost",
                      fontStyle: "normal",
                      fontWeight: "400",
                      lineHeight: "17px",
                      color: "#131118",
                    },
                  },
                  formHelperText: {
                    style: { fontSize: "16px" },
                  },
                }}
              />
              <Typography
                sx={{
                  fontFamily: "Jost",
                  fontStyle: "normal",
                  fontWeight: "600",
                  fontSize: "20px",
                  lineHeight: "17px",
                  color: "#131118",
                  mb: 1,
                }}
              >
                Confirm Password
              </Typography>
              <TextField
                className={cx("input")}
                fullWidth
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
                error={
                  touched.confirmPassword && Boolean(errors.confirmPassword)
                }
                helperText={touched.confirmPassword && errors.confirmPassword}
                slotProps={{
                  input: {
                    style: { fontSize: "16px" },
                  },
                  inputLabel: {
                    style: {
                      fontSize: "18px",
                      transform: "translate(14px, 12px) scale(1)",
                      fontFamily: "Jost",
                      fontStyle: "normal",
                      fontWeight: "400",
                      lineHeight: "17px",
                      color: "#131118",
                    },
                  },
                  formHelperText: {
                    style: { fontSize: "16px" },
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                className={cx("btn-submit")}
                sx={{
                  fontFamily: "Jost",
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: "16px",
                  lineHeight: "17px",
                  color: "#FFFFFF",
                }}
              >
                Sign Up
              </Button>

              <div className={cx("register")}>
                Already have an account?
                <NavLink to="/login" className={cx("register-link")}>
                  Login
                </NavLink>
              </div>
            </form>
          )}
        </Formik>
      </Container>
    </div>
  );
};

export default SignUpForm;
