import React, { useEffect, useRef, useState } from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import Button from "react-bootstrap/Button";

// core components
import "assets/css/fisco-custom.css";

import { useDispatch, useSelector } from "react-redux";
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import { oInvoiceHead } from "variables/general";
import { useHistory } from "react-router-dom";
import Dialog from "components/FixedPlugin/CustomDialog";
import ReactNotificationAlert from "react-notification-alert";
import notify from "variables/notify";
import { createInputInvoice } from "redux/actions/inputInvoiceAction";
import { oInputInvoiceHead } from "variables/general";
import { inputInvoiceValidation } from "components/Validation/ValidateValues";
import { deleteInputInvoice } from "redux/actions/inputInvoiceAction";

const InputInvoice = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const notificationAlert = useRef();
  const { auth, inputInvoiceRed } = useSelector((state) => state);

  const initialInputInvoiceDataState = {
    user: auth.user,
    expenseType: "",
    issuer: "",
    city: "",
    streetAddress: "",
    streetNumber: "",
    postalCode: "",
    oib: "",
    description: "",
    paymentMethod: "",
    reference: "",
    taxRate: "",
    pretax: "",
    price: "",
    finalPrice: 0,
    invoiceDate: "",
    paymentDeadline: "",
    paymentDate: "",
  };

  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
  });

  const [isEditedInputInvoice, setIsEditedInputInvoice] = useState(false);
  const [inputInvoiceData, setInputInvoiceData] = useState(
    initialInputInvoiceDataState
  );
  const [inputInvoicesList, setInputInvoicesList] = useState([]);
  const [formErrors, setFromErrors] = useState(initialInputInvoiceDataState);

  const {
    expenseType,
    issuer,
    city,
    streetAddress,
    streetNumber,
    postalCode,
    oib,
    description,
    reference,
    paymentMethod,
    taxRate,
    pretax,
    price,
    finalPrice,
    invoiceDate,
    paymentDeadline,
    paymentDate,
  } = inputInvoiceData;

  const paymentMethods = [
    { value: "GOTOVINA" },
    { value: "KARTICA" },
    { value: "ČEK" },
    { value: "OSTALO" },
  ];

  const [optionData, setOptionData] = useState({
    paymentMethod: "",
  });

  const date = new Date();
  const currentDate = new Date();
  const currDate = date.getDate() + 0;
  const futureDate = date.getDate() + 15;
  date.setDate(futureDate);
  currentDate.setDate(currDate);
  const inoviceFutureDate = date.toLocaleDateString("en-CA");
  const invoiceCurrentDate = currentDate.toLocaleDateString("en-CA");

  useEffect(() => {
    setInputInvoiceData({
      ...inputInvoiceData,
      invoiceDate: invoiceCurrentDate,
      paymentDate: inoviceFutureDate,
      paymentDeadline: inoviceFutureDate,
    });

    setInputInvoicesList(inputInvoiceRed.inputInvoices);
  }, [inputInvoiceRed.inputInvoices]);

  const handleOutputInvoiceEdit = (data) => (e) => {
    console.log(data);
    setInputInvoiceData(data);
    setIsEditedInputInvoice(true);
    window.scrollTo(0,0)

    setOptionData({
      ...optionData,
      paymentMethod: data.paymentMethod
    });

    document.getElementById("editAnchor").scrollIntoView();
  };

  const handleNewOutputInvoiceAction = (e) => {
    setIsEditedInputInvoice(!isEditedInputInvoice);
    setInputInvoiceData(initialInputInvoiceDataState);

    setOptionData({
      ...optionData,
      measureUnit: "",
    });
  };

  const handleDeleteOutputInvoice = (e) => {
    dispatch(deleteInputInvoice(inputInvoiceData, auth));
    setIsEditedInputInvoice(false);
    setInputInvoiceData(initialInputInvoiceDataState)
    setOptionData({
      ...optionData,
      measureUnit: "",
    });
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInputInvoiceData({ ...inputInvoiceData, [name]: value });
    console.log(inputInvoiceData);
  };

  // Confirmation dialog
  const handleDialog = (message, isLoading) => {
    setDialog({
      message,
      isLoading,
    });
  };

  const handleAction = (e) => {
    handleDialog("Potvrdi brisanje troška", true);
  };

  const handleConfirmation = (choose, e) => {
    console.log(e);
    if (choose) {
      //ACTION
      handleDialog("", false);
      handleDeleteOutputInvoice(e);
    } else {
      handleDialog("", false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFromErrors(inputInvoiceValidation(inputInvoiceData));

    console.log(Object.keys(inputInvoiceValidation(inputInvoiceData)).length);

    if (Object.keys(inputInvoiceValidation(inputInvoiceData)).length === 0) {
      dispatch(createInputInvoice(inputInvoiceData));
      setInputInvoiceData(initialInputInvoiceDataState);
      notify("br", "success", notificationAlert);

      setOptionData({
        ...optionData,
        measureUnit: "",
      });
    }
  };

  return (
    <>
      {console.log(inputInvoiceRed.inputInvoices)}
      <ReactNotificationAlert ref={notificationAlert} />
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col md="12" className="center-custom">
                    <h5 className="title" id="editAnchor">Ulazni računi</h5>
                    {isEditedInputInvoice ? (
                      <>
                        <Button
                          variant="info"
                          type="button"
                          onClick={handleNewOutputInvoiceAction}
                        >
                          Dodaj novi
                        </Button>
                        {/* <Button type="button" onClick={handleViewPDF}>
                          PDF
                        </Button> */}
                      </>
                    ) : (
                      <></>
                    )}
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col className="pr-1" md="12">
                      <FormGroup>
                        <label>Vrsta troška (informativno)</label>
                        <Input
                          placeholder="Vrsta troška..."
                          type="text"
                          value={expenseType}
                          onChange={handleChangeInput}
                          name="expenseType"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="3" sm="6" xs="6">
                      <FormGroup>
                        <label>Izdavatelj računa</label>
                        <Input
                          placeholder="Izdavatelj računa"
                          type="text"
                          value={issuer}
                          onChange={handleChangeInput}
                          name="issuer"
                        />
                        <p className="error">{formErrors.issuer}</p>
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="3" sm="6" xs="6">
                      <FormGroup>
                        <label>OIB</label>
                        <Input
                          placeholder="OIB"
                          type="number"
                          value={oib}
                          onChange={handleChangeInput}
                          name="oib"
                        />
                        <p className="error">{formErrors.oib}</p>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="3" sm="6" xs="6">
                      <FormGroup>
                        <label>Mjesto</label>
                        <Input
                          placeholder="Mjesto"
                          type="text"
                          value={city}
                          onChange={handleChangeInput}
                          name="city"
                        />
                        <p className="error">{formErrors.city}</p>
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="3" sm="6" xs="6">
                      <FormGroup>
                        <label>Adresa</label>
                        <Input
                          placeholder="Adresa"
                          type="text"
                          value={streetAddress}
                          onChange={handleChangeInput}
                          name="streetAddress"
                        />
                        <p className="error">{formErrors.streetAddress}</p>
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="3" sm="6" xs="6">
                      <FormGroup>
                        <label>Kućni broj</label>
                        <Input
                          placeholder="Kućni broj"
                          type="text"
                          value={streetNumber}
                          onChange={handleChangeInput}
                          name="streetNumber"
                        />
                        <p className="error">{formErrors.streetNumber}</p>
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="3" sm="6" xs="6">
                      <FormGroup>
                        <label>Poštanski broj</label>
                        <Input
                          placeholder="Poštanski broj"
                          type="number"
                          value={postalCode}
                          onChange={handleChangeInput}
                          name="postalCode"
                        />
                        <p className="error">{formErrors.postalCode}</p>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="12">
                      <FormGroup>
                        <label>Opis (svrha) plaćanja</label>
                        <Input
                          placeholder="Svrha plaćanja..."
                          type="text"
                          value={description}
                          onChange={handleChangeInput}
                          name="description"
                        />
                        <p className="error">{formErrors.description}</p>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="3" sm="6" xs="6">
                      <FormGroup>
                        <label>Porez</label>
                        <Input
                          placeholder="0 %"
                          type="number"
                          value={taxRate}
                          onChange={handleChangeInput}
                          name="taxRate"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="3" sm="6" xs="6">
                      <FormGroup>
                        <label>Pretporez</label>
                        <Input
                          placeholder="0 %"
                          type="number"
                          value={pretax}
                          onChange={handleChangeInput}
                          name="pretax"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="3">
                      <FormGroup>
                        <label>Iznos računa (kn)</label>
                        <Input
                          placeholder="0 kn"
                          type="number"
                          value={price}
                          onChange={handleChangeInput}
                          name="price"
                        />
                        <p className="error">{formErrors.price}</p>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="3" sm="6" xs="6">
                      <FormGroup>
                        <label>Način plaćanja</label>
                        <br />
                        <select
                          className="dropdownSelect"
                          onChange={handleChangeInput}
                          name="paymentMethod"
                        >
                          <option value={paymentMethod}>
                            Odaberi način plaćanja...
                          </option>
                          {paymentMethods.map((paymentMethod) => {
                            if (
                              paymentMethod.value === optionData.paymentMethod
                            ) {
                              return (
                                <option
                                  selected
                                  key={paymentMethod.value}
                                  value={paymentMethod.value}
                                >
                                  {paymentMethod.value}
                                </option>
                              );
                            }
                            return (
                              <option
                                key={paymentMethod.value}
                                value={paymentMethod.value}
                              >
                                {paymentMethod.value}
                              </option>
                            );
                          })}
                        </select>
                        <p className="error">{formErrors.paymentMethod}</p>
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="3" sm="6" xs="6">
                      <FormGroup>
                        <label>Datum računa</label>
                        <Input
                          type="date"
                          value={invoiceDate}
                          onChange={handleChangeInput}
                          name="invoiceDate"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="3" sm="6" xs="6">
                      <FormGroup>
                        <label>Datum dospijeća</label>
                        <Input
                          type="date"
                          value={paymentDeadline}
                          onChange={handleChangeInput}
                          name="paymentDeadline"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="3" sm="6" xs="6">
                      <FormGroup>
                        <label>Datum uplate</label>
                        <Input
                          type="date"
                          value={paymentDate}
                          onChange={handleChangeInput}
                          name="paymentDate"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="12">
                      <FormGroup>
                        <label>Napomena</label>
                        <textarea
                          style={{
                            width: "100%",
                            resize: "none",
                            padding: "5px",
                          }}
                          rows="3"
                          placeholder=""
                          value={reference}
                          onChange={handleChangeInput}
                          name="reference"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="3" className="editor">
                      {isEditedInputInvoice ? (
                        <>
                          <Button variant="primary" type="submit">
                            Spremi izmjene
                          </Button>
                          <Button
                            variant="danger"
                            type="button"
                            onClick={handleAction}
                          >
                            Obriši
                          </Button>
                        </>
                      ) : (
                        <Button variant="info" type="submit">
                          Dodaj novi račun
                        </Button>
                      )}
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col xs={12}>
            <Card className="card-plain">
              <CardHeader>
                <CardTitle tag="h4">Izlazni računi</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      {oInputInvoiceHead.map((prop, key) => {
                        return <th key={key}>{prop}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {inputInvoicesList.map((data) => {
                      return (
                        <tr
                          key={data.id}
                          onClick={handleOutputInvoiceEdit(data)}
                          style={{cursor: "pointer"}}
                        >
                          <td>{data.issuer}</td>
                          <td>{data.paymentMethod}</td>
                          <td>{data.invoiceDate}</td>
                          <td>{data.paymentDate}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
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

export default InputInvoice;
