import { yupResolver } from "@hookform/resolvers/yup";
import Checkbox from "@mui/material/Checkbox";
import { signInWithEmailAndPassword } from "firebase/auth";
import ParticlesBg from "particles-bg";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/main-logo.png";
import CustomNotification from "../components/controls/CustomNotification";
import LoadingBtn from "../components/controls/LoadingBtn";
import { auth } from "../firebase/Firebase.config";
import { loginSchema } from "../helpers/validation/loginSchema";

const AdminLogin = () => {
  // Password hide/show state
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState();
  const [notify, setNotify] = useState({
    open: false,
    type: "",
    message: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  // redirect
  const from = location.state?.from?.pathname || "/dashboard";

  // React hook form state
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  // React hook form data submit
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate(from, { replace: true });
      setLoading(false);
    } catch (error) {
      setNotify({
        open: true,
        type: "error",
        message: error.message,
      });
      setLoading(false);
    }
  };

  // const handleRest = (event) => {
  //   event.preventDefault();
  //   const email = "";
  //   forgetPassword(email);
  // };

  return (
    <div className="adminLogin">
      <div className="container">
        <div className="adminLogin__logo">
          <img src={Logo} alt="logo" />
        </div>

        <div className="adminLogin__form">
          <h1 className="adminLogin__title">Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <span className="form__group">
              <input
                className="form__control"
                type="email"
                placeholder="Type your email"
                {...register("email")}
              />
              {errors?.email && (
                <span className="form__error">{errors?.email.message}</span>
              )}
            </span>

            <span className="form__group">
              <input
                className="form__control"
                type={showPass ? "text" : "password"}
                placeholder="Type your password"
                {...register("password")}
              />
              {errors?.password && (
                <span className="form__error">{errors?.password.message}</span>
              )}
            </span>

            <div className="form__flex">
              <div className="form__checkbox">
                <Checkbox
                  size="small"
                  color="secondary"
                  checked={showPass}
                  onClick={() => setShowPass(!showPass)}
                />
                <span className="checkbox__text">
                  {showPass ? "Hide password" : "Show password"}
                </span>
              </div>

              {/* <Link  className="form__forget" to="/forgot-password">
                Forgotten password?
              </Link> */}
            </div>

            <LoadingBtn
              className="adminLogin__btn"
              text="Login"
              size="large"
              defaultColor="warning"
              loading={loading}
              type="submit"
            />
          </form>
        </div>
      </div>
      <ParticlesBg color="#7879F1" num={10} type="cobweb" bg={true} />
      <CustomNotification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default AdminLogin;
