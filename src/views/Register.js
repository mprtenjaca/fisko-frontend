import PanelHeader from "components/PanelHeader/PanelHeader";
import React, { Component, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Row } from "reactstrap";
import { register } from "redux/actions/authAction";

const Register = () => {

  const initialUserDataState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    oib: "",
    phoneNumber: "",
  };

  const dispatch = useDispatch();

  const [userData, setUserData] = useState(initialUserDataState);

  const {
    firstName,
    lastName,
    email,
    password,
    oib,
    phoneNumber
  } = userData;

  useEffect(() => {
  }, []);


  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    console.log(userData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(register(userData))

  };

  return (
    <>
      <div className="container-fluid vh-100">
        <div className="">
          <div className="rounded d-flex justify-content-center loginCenter">
            <div className="col-lg-4 col-md-6 col-sm-12 shadow-lg p-5 bg-light">
              <div className="text-center">
                <h3 className="text-info">Registracija</h3>
              </div>
              <form method="POST" onSubmit={handleSubmit} className="loginForm">
                <div className="p-4">
                  <div className="input-group mb-3">
                    <span className="input-group-text bg-info">
                      <i className="bi bi-person-plus-fill text-white"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ime"
                      name="firstName"
                      value={firstName}
                      onChange={handleChangeInput}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text bg-info">
                      <i className="bi bi-person-plus-fill text-white"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Prezime"
                      name="lastName"
                      value={lastName}
                      onChange={handleChangeInput}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text bg-info">
                      <i className="bi bi-person-plus-fill text-white"></i>
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="E-mail"
                      name="email"
                      value={email}
                      onChange={handleChangeInput}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text bg-info">
                      <i className="bi bi-person-plus-fill text-white"></i>
                    </span>
                    <input
                      type="oib"
                      className="form-control"
                      placeholder="OIB"
                      name="oib"
                      value={oib}
                      onChange={handleChangeInput}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text bg-info">
                      <i className="bi bi-person-plus-fill text-white"></i>
                    </span>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Kontakt broj"
                      name="phoneNumber"
                      value={phoneNumber}
                      onChange={handleChangeInput}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text bg-info">
                      <i className="bi bi-person-plus-fill text-white"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Lozinka"
                      name="password"
                      value={password}
                      onChange={handleChangeInput}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text bg-info">
                      <i className="bi bi-key-fill text-white"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Ponovi lozinku"
                      name="repeatPassword"
                      // value={repeatPassword}
                      // onChange={handleChangeInput}
                    />
                  </div>
                  <div className="text-center">
                    <button
                      className="btn btn-info text-center mt-2"
                      type="submit"
                    >
                      Registriraj se
                    </button>
                  </div>
                  <p className="text-center mt-5">
                    Već imaš profil?
                    <Link to="/register">Prijavi se</Link>
                  </p>
                  {/* <p className="text-center text-info">Forgot your password?</p> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
