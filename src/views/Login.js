import React, { useContext, useEffect, useRef, useState } from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Row,
  Col,
  Input,
  Button,
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import { useDispatch } from "react-redux";
import { login } from "redux/actions/authAction";
import NotificationAlert from "react-notification-alert";
import "assets/css/login.css";
import notify from "variables/notify";
import { Link } from "react-router-dom";

const LOGIN_URL = "/login";

const Login = () => {
  const initialLoginState = {
    username: "",
    password: "",
  };

  const userRef = useRef();
  const errRef = useRef();
  const dispatch = useDispatch();


  const [loginData, setLoginData] = useState(initialLoginState);
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const { username, password } = loginData;

  useEffect(() => {
    userRef.current;
  }, []);
  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    console.log(loginData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(username);
    dispatch(login(loginData));
    setLoginData(initialLoginState);
    setSuccess(true);
  };

  return (
    <>
      <div className="container-fluid vh-100">
        <div className="">
          <div className="rounded d-flex justify-content-center loginCenter">
            <div className="col-lg-4 col-md-6 col-sm-12 shadow-lg p-5 bg-light">
              <div className="text-center">
                <h3 className="text-info">Sign In</h3>
              </div>
              <form method="POST" onSubmit={handleSubmit} className="loginForm">
                <div className="p-4">
                  <div className="input-group mb-3">
                    <span className="input-group-text bg-info">
                      <i className="bi bi-person-plus-fill text-white"></i>
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      name="username"
                      value={username}
                      onChange={handleChangeInput}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text bg-info">
                      <i className="bi bi-key-fill text-white"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={handleChangeInput}
                    />
                  </div>
                  <div className="text-center">
                    <button
                      className="btn btn-info text-center mt-2"
                      type="submit"
                    >
                      Login
                    </button>
                  </div>
                  <p className="text-center mt-5">
                    Don't have an account?
                    <Link to="/register"><span className="text-info">Sign Up</span></Link>
                  </p>
                  <p className="text-center text-info">Forgot your password?</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
