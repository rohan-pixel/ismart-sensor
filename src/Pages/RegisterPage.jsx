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

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { control, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSignUp = useCallback((data) => {
    setIsLoading(true);

    if (data?.password !== data?.confirmPassword) {
      setError(
        "Password and confirm password do not match. Please ensure both fields contain the same password."
      );
      setIsLoading(false);
      return;
    }

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
                <strong>Sign up for Integer Smart Sensor today!</strong> Our
                web-based system is tailored for maintenance engineers and
                facility managers, offering efficient asset monitoring and
                management in industrial settings. With a user-friendly
                interface, you can effortlessly oversee assets and fine-tune
                their performance parameters.
              </p>
              <p className="desc detail">
                Integer Smart Sensor simplifies asset management. Join us now to
                access a powerful platform for <strong>monitoring</strong>,{" "}
                <strong>managing</strong>, and
                <strong>optimizing</strong> industrial assets. Sign up today and
                experience the convenience of real-time data monitoring and easy
                configuration.
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
                Sign Up
              </Typography>

              {error && (
                <div className="error-box">
                  <Alert severity="error">{error || ""}</Alert>
                </div>
              )}

              <form onSubmit={handleSubmit(onSignUp)} className="login-form">
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
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                  }}
                />

                <CustomPassword
                  control={control}
                  name="confirmPassword"
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  rules={{
                    required: "Confirm Password is required",
                    minLength: {
                      value: 8,
                      message:
                        "Confirm Password must be at least 8 characters long",
                    },
                  }}
                />

                <LoadingButton
                  loading={isLoading}
                  size="small"
                  onClick={handleSubmit(onSignUp)}
                  type="submit"
                  variant="contained"
                  endIcon={<Login />}
                  sx={{
                    marginTop: "1rem",
                  }}
                >
                  Sign Up
                </LoadingButton>
                <Typography variant="caption" textAlign={"center"}>
                  Already have account?{" "}
                  <Typography
                    component={Link}
                    to="/login"
                    variant="caption"
                    className="link"
                  >
                    Log In
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

export default RegisterPage;
