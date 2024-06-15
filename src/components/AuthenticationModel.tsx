import React, { useState } from "react";
import { Button, Grid, Modal, Paper, TextField } from "@mui/material";
import styles from "../styles/Home.module.scss";
import axios from "axios";
import Cookies from "js-cookie";
interface User {
  name: string;
  // Add any other user properties here
}

interface Props {
  onLogin: (user: User) => void;
}
const bt = {
  bgcolor: "#D63E38",
  "&:hover": {
    bgcolor: "#D63E38", // Change to the desired color
  },
};
const AuthenticationModel: React.FC<Props> = ({ onLogin }) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post<{ token: string; user: User }>(
        "http://localhost:6001/users/signin",
        {
          email,
          password,
        }
      );
      const { token, user } = response.data;
      Cookies.set("token", token, {
        expires: new Date(Date.now() + 10 * 60 * 1000),
      });
      Cookies.set("user", JSON.stringify(user), {
        expires: new Date(Date.now() + 10 * 60 * 1000),
      });
      onLogin(user); // Notify parent component about successful login
      handleClose();
    //   router.push("/"); // Redirect to home page
    } catch (error) {
      console.error("Error during login:", error);
      // Handle login error (e.g., display an error message to the user)
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {};

  return (
    <div>
      <Button
        sx={bt}
        variant="contained"
        onClick={handleOpen}
        startIcon={
        //   <Image src="/WhiteLogoSmall.png" alt="logo" width={25} height={28} />
          <img src="/WhiteLogoSmall.png" alt="logo" width={25} height={28} />
        }
      >
        Login
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Grid container justifyContent="center" alignItems="center">
          <Paper className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>{!isSignUp ? "Log In" : "Register"}</h2>
            </div>
            <div className={styles.tabPanelContent}>
              {isSignUp && (
                <div>
                  <form onSubmit={handleSubmit}>
                    <div>
                      <TextField
                        sx={{ ml: 8, mb: 2, mt: 2, width: "40ch" }}
                        id="username"
                        label="Username"
                        variant="outlined"
                      />
                    </div>
                    <div>
                      <TextField
                        sx={{ ml: 8, mb: 2, width: "40ch" }}
                        id="email"
                        type="email"
                        label="Email"
                        variant="outlined"
                      />
                    </div>
                    <div>
                      <TextField
                        sx={{ ml: 8, width: "40ch" }}
                        id="password"
                        type="password"
                        label="Password"
                        variant="outlined"
                      />
                    </div>
                  </form>
                  <Button type="submit" className={styles.submitBtn} fullWidth>
                    Register
                  </Button>
                  <div className={styles.divider}>Or</div>
                  <button
                    className={styles.gsimaterialbutton}
                    onClick={handleGoogleSignIn}
                  >
                    <div className={styles.gsimaterialbuttonstate}></div>
                    <div className={styles.gsimaterialbuttoncontentwrapper}>
                      <div className={styles.gsimaterialbuttonicon}>
                        <svg
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 48 48"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                          <path
                            fill="#EA4335"
                            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                          ></path>
                          <path
                            fill="#4285F4"
                            d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                          ></path>
                          <path
                            fill="#FBBC05"
                            d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                          ></path>
                          <path
                            fill="#34A853"
                            d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                          ></path>
                          <path fill="none" d="M0 0h48v48H0z"></path>
                        </svg>
                      </div>
                      <span className={styles.gsimaterialbuttoncontents}>
                        Continue with Google
                      </span>
                    </div>
                  </button>
                </div>
              )}
              {!isSignUp && (
                <div>
                  <form onSubmit={handleSubmit}>
                    <div>
                      <TextField
                        sx={{ ml: 8, mb: 2, mt: 2, width: "40ch" }}
                        id="email"
                        type="email"
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <TextField
                        sx={{ ml: 8, width: "40ch" }}
                        id="password"
                        type="password"
                        label="Password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className={styles.forgotPassword}>
                      Forgot password?
                    </div>

                    <Button
                      type="submit"
                      className={styles.submitBtn}
                      disabled={loading}
                    >
                      {loading ? "Logging in..." : "Login"}
                    </Button>
                  </form>
                  <div className={styles.divider}>Or</div>
                  <button
                    className={styles.gsimaterialbutton}
                    onClick={handleGoogleSignIn}
                  >
                    <div className={styles.gsimaterialbuttonstate}></div>
                    <div className={styles.gsimaterialbuttoncontentwrapper}>
                      <div className={styles.gsimaterialbuttonicon}>
                        <svg
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 48 48"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                          <path
                            fill="#EA4335"
                            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                          ></path>
                          <path
                            fill="#4285F4"
                            d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                          ></path>
                          <path
                            fill="#FBBC05"
                            d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                          ></path>
                          <path
                            fill="#34A853"
                            d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                          ></path>
                          <path fill="none" d="M0 0h48v48H0z"></path>
                        </svg>
                      </div>
                      <span
                        className={styles.gsimaterialbuttoncontents}
                        onClick={handleGoogleSignIn}
                      >
                        Continue with Google
                      </span>
                    </div>
                  </button>
                </div>
              )}

              {!isSignUp && (
                <div className={styles.toggleText}>
                  Dont have an account ?&nbsp;
                  <span
                    className={styles.toggleClickableText}
                    onClick={toggleSignUp}
                  >
                    Register
                  </span>
                </div>
              )}
              {isSignUp && (
                <div className={styles.toggleText}>
                  Already have an account ?&nbsp;
                  <span
                    className={styles.toggleClickableText}
                    onClick={toggleSignUp}
                  >
                    Login
                  </span>
                </div>
              )}
            </div>
          </Paper>
        </Grid>
      </Modal>
    </div>
  );
};

export default AuthenticationModel;
