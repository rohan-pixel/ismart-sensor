import { Email, Login } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Alert, Divider, InputAdornment, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import CustomInput from "../Components/CustomInput";
import CustomPassword from "../Components/CustomPassword";
import { motion } from "framer-motion";
import { EMAIL_PATTERN } from "../helpers/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/features/auth/authSlice";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { control, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogin = useCallback((data) => {
    setIsLoading(true);
    dispatch(setUser({ name: "user" }));

    // simulate for 2 seconds
    setTimeout(() => {
      navigate("/");
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="bg">
      <Container className={"min-height-container"}>
        <div className="login-container">
          <div className={"login-sub-container"}>
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="left"
            >
              <Typography variant="h5" className="heading">
                ISS
              </Typography>
              <Typography className="heading-detail">
                integer smart sensor
              </Typography>

              <p className="desc detail">
                <strong>Welcome back to Integer Smart Sensor!</strong> Log in to
                our platform designed to empower maintenance engineers and
                facility managers with efficient asset monitoring and
                management. Access your account and enjoy the benefits of
                real-time data monitoring and performance optimization.
              </p>
              <p className="desc detail">
                <strong>Returning user?</strong> Log in to Integer Smart Sensor
                and regain control over your asset management. Our user-friendly
                interface allows you to seamlessly monitor and configure assets
                for peak performance. Log in now and continue your journey with
                us.
              </p>
            </motion.div>

            <Divider orientation="vertical" variant="middle" flexItem />

            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="right"
            >
              <Typography variant="h5" className="heading" textAlign={"center"}>
                Login
              </Typography>

              {error && (
                <div className="error-box">
                  <Alert severity="error">
                    Email or password is incorrect!
                  </Alert>
                </div>
              )}

              <form onSubmit={handleSubmit(onLogin)} className="login-form">
                <CustomInput
                  control={control}
                  name="email"
                  label="Email"
                  placeholder="xyz@org.com"
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: EMAIL_PATTERN,
                      message: "Invalid email address",
                    },
                  }}
                  inputProps={{
                    InputProps: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                <CustomPassword
                  control={control}
                  name="password"
                  label="Password"
                  rules={{
                    required: "Password is required",
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                  }}
                />

                <Typography
                  component={Link}
                  to="/reset-password"
                  variant="caption"
                  className="link"
                  textAlign={"right"}
                >
                  Forgot password?
                </Typography>

                <LoadingButton
                  loading={isLoading}
                  size="small"
                  onClick={handleSubmit(onLogin)}
                  type="submit"
                  variant="contained"
                  endIcon={<Login />}
                  sx={{
                    marginTop: "1rem",
                  }}
                >
                  Login
                </LoadingButton>
                <Typography variant="caption" textAlign={"center"}>
                  Don't have account?{" "}
                  <Typography
                    component={Link}
                    to="/registration"
                    variant="caption"
                    className="link"
                  >
                    Sign Up
                  </Typography>
                </Typography>
              </form>
            </motion.div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LoginPage;
