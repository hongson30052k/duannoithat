import { Formik } from "formik";
import * as Yup from "yup";
import styles from "./LoginForm.module.scss";
import classNames from "classnames/bind";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchGetUser,
  loginUser,
  setError,
} from "../../../../store/slices/UserSlice";
import { RootState } from "../../../../store/store";
import { Link, useNavigate } from "react-router-dom";
import { fetchGetUserLogin } from "../../../../store/slices/UserLoginSlice";
const cx = classNames.bind(styles);

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.userState.isAuthenticated
  );
  const loginStatus = useSelector((state: RootState) => state.userState.status);
  const loginError = useSelector((state: RootState) => state.userState.error);
  console.log(loginError, "error");
  useEffect(() => {
    dispatch(fetchGetUser());
    dispatch(fetchGetUserLogin());
  }, [dispatch]);

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long"),
  });

  const handleSubmit = async (values: any) => {
    const res: any = await dispatch(loginUser(values));
    const payload = res.payload;
    if (typeof payload === "string") {
      alert(payload);
      return;
    }

    navigate("/");
    alert("Login thành công");
  };

  const onClearError = () => {
    dispatch(setError());
  };

  return (
    <>
      <div className={cx("form-container")}>
        <Container className={cx("sign-up-form")}>
          <Link to="/" className={cx("link")}>
            Quay lại
          </Link>
          <Typography
            variant="h4"
            component="h4"
            fontWeight="bold"
            color="#131118"
            sx={{ fontSize: "40px" }}
          >
            Welcome 👋
          </Typography>
          <Typography
            variant="subtitle1"
            component="p"
            sx={{
              fontFamily: "Jost",
              fontStyle: "normal",
              fontWeight: "400",
              fontSize: "16px",
              lineHeight: "23px",
              color: "#A4A2AA",
            }}
          >
            Please login here
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
                    lineHeight: "20px",
                    color: "#131118",
                    mt: 2,
                  }}
                >
                  Username
                </Typography>
                <TextField
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
                  onFocus={onClearError}
                  slotProps={{
                    input: {
                      style: { fontSize: "16px", marginBottom: "10px" },
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
                      style: { fontSize: "16px", marginBottom: "10px" },
                    },
                  }}
                />

                <Typography
                  sx={{
                    fontFamily: "Jost",
                    fontStyle: "normal",
                    fontWeight: "600",
                    fontSize: "20px",
                    lineHeight: "20px",
                    color: "#131118",
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
                  onFocus={onClearError}
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
                      style: { fontSize: "16px", marginBottom: "10px" },
                    },
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loginStatus === "loading"}
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
                  {loginStatus === "loading"
                    ? "Đang đăng nhập..."
                    : "Đăng nhập"}
                </Button>
                {loginError ? (
                  <p className={cx("error-message")} style={{ color: "red" }}>
                    {loginError}
                  </p>
                ) : null}
                <div className={cx("register")}>
                  If you don't have an account?{" "}
                  <Link className={cx("register-link")} to="/signup">
                    Register
                  </Link>
                </div>
              </form>
            )}
          </Formik>
        </Container>
      </div>
    </>
  );
};

export default LoginForm;
