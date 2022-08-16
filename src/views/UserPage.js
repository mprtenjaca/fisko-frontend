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

const User = () => {
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
    oib: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    phoneNumber: "",
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
  const [userData, setUserData] = useState(initialUserDataState);
  const [isUserDisabled, setIsUserDisabled] = useState(true);
  const [isCompanyDisabled, setIsCompanyDisabled] = useState(true);

  //const {firstName, lastName, email, oib, phoneNumber} = userData;
  //const {name, companyOib, companyEmail, address, city, postalCode, companyPhoneNumber, taxRate, reference, website, customReference} = companyData;
  const dispatch = useDispatch();
  const { auth, companyRed } = useSelector((state) => state);

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
    dispatch(createComa);
  };

  const handleComapnySubmit = (e) => {
    e.preventDefault();
    dispatch(updateCompany(companyData));
    notify("br", "success", notificationAlert);
  };

  return (
    <>
      {/* {console.log(companyRed.company)} */}
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
                <h5 className="title">Firma</h5>
                {/*style={{float: isCompanyDisabled ? "none" : "left"}}*/}
                {/* {isCompanyDisabled ? <></> : <><i className="now-ui-icons ui-1_simple-remove primary edit-company" onClick={handleEnableComapnyEdit}></i></>} */}
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleComapnySubmit}>
                  <Row>
                    <Col className="pr-1" md="3">
                      <FormGroup>
                        <label>Ime firme</label>
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
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>OIB</label>
                        <Input
                          placeholder="Oib"
                          type="number"
                          onChange={handleCompanyChangeInput}
                          value={companyData.oib}
                          name="oib"
                          disabled={isCompanyDisabled}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="3">
                      <FormGroup>
                        <label>E-mail</label>
                        <Input
                          placeholder="E-mail"
                          type="email"
                          onChange={handleCompanyChangeInput}
                          value={companyData.email}
                          name="email"
                          disabled={isCompanyDisabled}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="3">
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
                    <Col className="pl-1" md="3">
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
                    <Col className="pl-1" md="3">
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
                    <Col className="pl-1" md="3">
                      <FormGroup>
                        <label>Kontakt broj</label>
                        <Input
                          placeholder="Kontakt broj"
                          type="number"
                          onChange={handleCompanyChangeInput}
                          value={companyData.phoneNumber}
                          name="phoneNumber"
                          disabled={isCompanyDisabled}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="3">
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
                    <Col className="pl-1" md="3">
                      <FormGroup>
                        <label>Porez. stopa</label>
                        <Input
                          placeholder="%"
                          type="number"
                          onChange={handleCompanyChangeInput}
                          value={companyData.taxRate}
                          name="taxRate"
                          disabled={isCompanyDisabled}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="3">
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
                    <Col className="pl-1" md="3">
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
