import React, { useEffect, useRef, useState } from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

// core components
import ReactNotificationAlert from "react-notification-alert";
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { updateCompany } from "redux/actions/companyAction";
import notify from "variables/notify";
import Dialog from "components/FixedPlugin/CustomDialog";
import { createCompany } from "redux/actions/companyAction";

const User = () => {

  const dispatch = useDispatch();
  const { auth, companyRed } = useSelector((state) => state);

  const initialUserDataState = {
    firstName: "",
    lastName: "",
    email: "",
    oib: "",
    phoneNumber: "",
  };

  const initialCompanyDataState = {
    user: null,
    name: "",
    companyOib: "",
    companyEmail: "",
    address: "",
    city: "",
    postalCode: "",
    companyPhoneNumber: "",
    taxRate: 0,
    isVATsystem: false,
    reference: "",
    website: "",
    customReference: "",
  };

  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false
  });

  const notificationAlert = useRef();
  const [companyData, setCompanyData] = useState(initialCompanyDataState);
  const [company, setCompany] = useState(initialCompanyDataState);
  const [userData, setUserData] = useState(initialUserDataState);
  const [isUserDisabled, setIsUserDisabled] = useState(true);
  const [isCompanyDisabled, setIsCompanyDisabled] = useState(true);

  const {firstName, lastName, email, oib, phoneNumber} = userData;
  // const {name, companyOib, companyEmail, address, city, postalCode, companyPhoneNumber, taxRate, isVATsystem, reference, website, customReference} = companyData;

  useEffect(() => {
    setCompanyData({ ...companyData, user: auth.user });
    setCompanyData(companyRed.company);
    setUserData(auth.user);
  }, [auth.user, companyRed.company]);

  const handleDialog = (message, isLoading) => {
    setDialog({
      message,
      isLoading
    });
  };

  const handleAction = (e) => {
    handleDialog("Jeste li siguni da želite spremiti nove izmjene?", true);
  };

  const handleConfirmation = (choose) => {
    if (choose) {
      //ACTION
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };


  const handleEnableComapnyEdit = (e) => {
    setIsCompanyDisabled(!isCompanyDisabled);
  };

  const handleUserChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    console.log(userData);
  };

  const handleCompanyChangeInput = (e) => {
  
    const { name, value, checked } = e.target;
    if(e.target.name === "isVATsystem"){
      setCompanyData({ ...companyData, [name]: checked});
    }else{
      setCompanyData({ ...companyData, [name]: value });
    }
    console.log(companyData);
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    // dispatch(createCompany(companyData));
  };

  const handleComapnySubmit = (e) => {
    e.preventDefault();
    companyData.id ? dispatch(updateCompany(companyData)) : dispatch(createCompany(companyData));
    notify("br", "success", notificationAlert);
  };

  return (
    <>
      {console.log(companyData)}
      <ReactNotificationAlert ref={notificationAlert} />
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h5 className="title">Profil</h5>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleUserSubmit}>
                  <Row>
                    <Col className="pr-1" md="3">
                      <FormGroup>
                        <label>Ime</label>
                        <Input
                          placeholder="Ime"
                          type="text"
                          value={userData.firstName}
                          onChange={handleUserChangeInput}
                          name="firstName"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Prezime</label>
                        <Input
                          placeholder="Prezime"
                          type="text"
                          onChange={handleUserChangeInput}
                          value={userData.lastName}
                          name="lastName"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="3">
                      <FormGroup>
                        <label>E-mail</label>
                        <Input
                          placeholder="E-mail"
                          type="email"
                          onChange={handleUserChangeInput}
                          value={userData.email}
                          name="email"
                          disabled={true}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="3">
                      <FormGroup>
                        <label>OIB</label>
                        <Input
                          placeholder="OIB"
                          type="number"
                          onChange={handleUserChangeInput}
                          value={userData.oib}
                          name="oib"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label>Mobitel</label>
                        <Input
                          placeholder="09xxxxxxxx"
                          type="number"
                          onChange={handleUserChangeInput}
                          value={userData.phoneNumber}
                          name="phoneNumber"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="3">
                      <Button
                        className="btn btn-primary btn-block btn-round"
                        type="submit"
                      >
                        Spremi
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h5 className="title">Poduzeće</h5>
                {/*style={{float: isCompanyDisabled ? "none" : "left"}}*/}
                {/* {isCompanyDisabled ? <></> : <><i className="now-ui-icons ui-1_simple-remove primary edit-company" onClick={handleEnableComapnyEdit}></i></>} */}
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleComapnySubmit}>
                  <Row>
                    <Col className="pr-1" md="3" sm="6" xs="6">
                      <FormGroup>
                        <label>Ime poduzeća</label>
                        <Input
                          placeholder="Ime firme"
                          type="text"
                          value={companyData.name}
                          onChange={handleCompanyChangeInput}
                          name="name"
                          disabled={isCompanyDisabled}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3" sm="6" xs="6">
                      <FormGroup>
                        <label>OIB</label>
                        <Input
                          placeholder="Oib"
                          type="number"
                          onChange={handleCompanyChangeInput}
                          value={companyData.companyOib}
                          name="companyOib"
                          disabled={isCompanyDisabled}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="3" sm="6" xs="6">
                      <FormGroup>
                        <label>E-mail</label>
                        <Input
                          placeholder="E-mail"
                          type="email"
                          onChange={handleCompanyChangeInput}
                          value={companyData.companyEmail}
                          name="companyEmail"
                          disabled={isCompanyDisabled}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="3" sm="6" xs="6">
                      <FormGroup>
                        <label>Adresa</label>
                        <Input
                          placeholder="Adresa"
                          type="text"
                          onChange={handleCompanyChangeInput}
                          value={companyData.address}
                          name="address"
                          disabled={isCompanyDisabled}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pl-1" md="3" sm="6" xs="6">
                      <FormGroup>
                        <label>Grad</label>
                        <Input
                          placeholder="Grad"
                          type="text"
                          onChange={handleCompanyChangeInput}
                          value={companyData.city}
                          name="city"
                          disabled={isCompanyDisabled}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="3" sm="6" xs="6">
                      <FormGroup>
                        <label>Poštanski broj</label>
                        <Input
                          placeholder="Poštanski broj"
                          type="number"
                          onChange={handleCompanyChangeInput}
                          value={companyData.postalCode}
                          name="postalCode"
                          disabled={isCompanyDisabled}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="3" sm="6" xs="6">
                      <FormGroup>
                        <label>Kontakt broj</label>
                        <Input
                          placeholder="Kontakt broj"
                          type="number"
                          onChange={handleCompanyChangeInput}
                          value={companyData.companyPhoneNumber}
                          name="companyPhoneNumber"
                          disabled={isCompanyDisabled}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="3" sm="6" xs="6">
                      <FormGroup>
                        <label>Web stranica</label>
                        <Input
                          placeholder="Web stranica"
                          type="text"
                          onChange={handleCompanyChangeInput}
                          value={companyData.website}
                          name="website"
                          disabled={isCompanyDisabled}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pl-1" md="3" sm="6" xs="6">
                      <FormGroup>
                        <label>Porez. stopa</label>
                        <Input
                          placeholder="%"
                          type="number"
                          onChange={handleCompanyChangeInput}
                          value={companyData.taxRate}
                          name="taxRate"
                          disabled={isCompanyDisabled || !companyData.isVATsystem}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="3" sm="6" xs="6">
                      <FormGroup>
                        <label>Napomena (opcionalno)</label>
                        <Input
                          placeholder="Upišite napomen..."
                          type="text"
                          onChange={handleCompanyChangeInput}
                          value={companyData.reference}
                          name="reference"
                          disabled={isCompanyDisabled}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="3" sm="6" xs="6">
                      <FormGroup>
                        <label>Dodatna napomena (opcionalno)</label>
                        <Input
                          placeholder="Upišite dodatnu napomenu..."
                          type="text"
                          onChange={handleCompanyChangeInput}
                          value={companyData.customReference}
                          name="customReference"
                          disabled={isCompanyDisabled}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <label style={{color: "gray"}}>U sustavu PDV-a?</label>
                      <Input 
                        type="checkbox" 
                        onChange={handleCompanyChangeInput}
                        style={{marginLeft: "5px", fontSize: "16px", border: "2px solid gray"}}
                        checked={companyData.isVATsystem}
                        name="isVATsystem"
                        disabled={isCompanyDisabled}/>
                        
                    </Col>
                </Row>
                </Form>
                <Row>
                  <Col md="3">
                    {isCompanyDisabled ? (
                      <Button
                        variant="info"
                        className="btn btn-primary btn-block btn-round"
                        type="button"
                        onClick={handleEnableComapnyEdit}
                      >
                        UREDI
                      </Button>
                    ) : (
                      <Button
                        variant="danger"
                        className="btn btn-primary btn-block btn-round"
                        type="submit"
                        onClick={handleComapnySubmit}
                      >
                        SPREMI PROMJENE
                      </Button>
                    )}
                  </Col>
                </Row>
                
              </CardBody>
            </Card>
          </Col>
        </Row>
        {dialog.isLoading && (
          <Dialog
            nameProduct={dialog.nameProduct}
            onDialog={handleConfirmation}
            message={dialog.message}
          />
        )}
      </div>
      
    </>
  );
};

export default User;
