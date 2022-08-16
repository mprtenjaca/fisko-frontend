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

import PanelHeader from "components/PanelHeader/PanelHeader.js";
import { oInvoiceHead } from "variables/general";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Dialog from "components/FixedPlugin/CustomDialog";
import ReactNotificationAlert from "react-notification-alert";
import notify from "variables/notify";
import {
  measureUnits,
  paymentMethods,
} from "components/Util/Util";
import { handleFinalPriceValue } from "components/Util/Util";
import { updateOffer } from "redux/actions/offerAction";
import { createOffer } from "redux/actions/offerAction";
import { deleteOffer } from "redux/actions/offerAction";
import { offerValidation } from "components/Validation/ValidateValues";

const Offer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { offerRed, customersRed, serviceRed, auth } = useSelector((state) => state);

  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
  });

  const [formErrors, setFromErrors] = useState({
    offerNumber: "",
    customer: "",
    serviceModel: "",
    paymentMethod: "",
  });
  const [formDetailsErrors, setFromDetailsErrors] = useState({
    serviceDescription: "",
    measureUnit: "",
    amount: "",
    price: "",
    discount: "",
    taxRate: "",
  });

  const serviceDetailsEmptyData = {
    serviceDescription: "",
    measureUnit: "",
    amount: 1,
    price: "",
    discount: "",
    taxRate: "",
  };

  const [optionData, setOptionData] = useState({
    customerId: 0,
    serviceId: 0,
    measureUnit: "",
    paymentMethod: "",
  });

  const initialOfferDataState = {
    user: auth.user,
    offerNumber: 0,
    customer: null,
    serviceModel: null,
    serviceDetails: [
      {
        serviceDescription: "",
        measureUnit: "",
        amount: 1,
        price: "",
        finalPrice: 0,
        discount: "",
        taxRate: "",
      },
    ],
    paymentMethod: "",
    finalPrice: 0,
    offerDate: "",
    paymentDate: "",
  };

  const notificationAlert = useRef();
  const mainRef = useRef();
  const [isEditedOffer, setIsEditedOffer] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [servicesData, setServicesData] = useState([]);
  const [offerList, setOfferList] = useState([]);
  const [offerData, setOfferData] = useState(initialOfferDataState);

  const {
    offerNumber,
    customer,
    serviceModel,
    serviceDetails,
    paymentMethod,
    finalPrice,
    offerDate,
    paymentDate,
  } = offerData;

  useEffect(() => {
    setOfferList(offerRed.offers);
    setCustomers(customersRed.customers);
    setServicesData(serviceRed.services);
  }, [offerRed.offers]);

  // Confirmation dialog
  const handleDialog = (message, isLoading) => {
    setDialog({
      message,
      isLoading,
    });
  };

  const handleAction = (e) => {
    handleDialog(
      "Jeste li siguni da želite ponudu br." + offerData.offerNumber,
      true
    );
  };

  const handleConfirmation = (choose, e) => {
    console.log(e);
    if (choose) {
      //ACTION
      handleDialog("", false);
      handleDeleteOffer(e);
    } else {
      handleDialog("", false);
    }
  };

  const handleAddDetailsSection = (e) => {
    setOfferData({
      ...offerData,
      serviceDetails: [...serviceDetails, serviceDetailsEmptyData],
    });
  };

  const handleViewPDF = () => {
    history.push({
      pathname: "/admin/pdf",
      state: { invoice: offerData },
    });
  };

  const handleRootInput = (e) => {
    setOfferData({
      ...offerData,
      [e.target.name]:
        e.target.type === "number" ? parseInt(e.target.value) : e.target.value,
    });
  };

  const handleServiceDetailsChangeInput = (id, index) => (e) => {
    let editedObject = offerData.serviceDetails;
    editedObject[index][e.target.name] =
      e.target.type === "number" ? parseInt(e.target.value) : e.target.value;
    setOfferData({
      ...offerData,
      serviceDetails: editedObject,
    });
    handleFinalPrice(index);
  };

  const handleFinalPrice = (index) => {
    let editedList = offerData.serviceDetails;
    let editedObject = editedList[index];
    let finalPrice = handleFinalPriceValue(editedList, index)

    editedObject.finalPrice = finalPrice;
    setOfferData({
      ...offerData,
      serviceDetails: editedList,
      finalPrice: offerData.serviceDetails.reduce(
        (a, v) => (a = a + v.finalPrice),
        0
      ),
    });
  };

  const handleDeleteDetailsSection = (idx) => (e) => {
    let updatedList = offerData.serviceDetails.filter((item, index) => {
      if (index != idx) return item;
    });
    setOfferData({
      ...offerData,
      serviceDetails: updatedList,
      finalPrice: updatedList.reduce((a, v) => (a = a + v.finalPrice), 0),
    });
  };

  const handleChangeInput = (level) => (e) => {
    if (!level) {
      const { name, value } = e.target;
      setOfferData({ ...offerData, [name]: value });
    }

    if (level === "customer") {
      var assignedCustomer = { ...offerData.customer };
      assignedCustomer = customers[e.target.value];
      setOfferData({
        ...offerData,
        customer: assignedCustomer,
      });
    }

    if (level === "serviceModel") {
      var assignedServiceModel = { ...offerData.serviceModel };
      assignedServiceModel = servicesData[e.target.value];
      setOfferData({
        ...offerData,
        serviceModel: assignedServiceModel,
      });
    }

    console.log(offerData);
  };

  const handleOfferEdit = (data) => (e) => {
    setOfferData(data);
    setIsEditedOffer(true);

    setOptionData({
      ...optionData,
      customerId: data.customer.id,
      serviceId: data.serviceModel ? data.serviceModel.id : 0,
      paymentMethod: data.paymentMethod,
    });

    document.getElementById("editAnchor").scrollIntoView();
  };

  const handleDeleteOffer = (e) => {
    dispatch(deleteOffer(offerData));
    setIsEditedOffer(false);
    setOfferData(initialOfferDataState);
    setOptionData({
      ...optionData,
      customerId: "",
      serviceId: "",
      measureUnit: "",
    });
  };

  const handleNewOfferAction = (e) => {
    setIsEditedOffer(!isEditedOffer);
    setOfferData(initialOfferDataState);

    setOptionData({
      ...optionData,
      customerId: "",
      serviceId: "",
      measureUnit: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFromErrors(offerValidation(offerData));

    if (Object.keys(offerValidation(offerData)).length === 0) {
      if (isEditedOffer) {
        dispatch(updateOffer(offerData, auth));
        setOfferData(initialOfferDataState);
        setIsEditedOffer(false);
      } else {
        dispatch(createOffer(offerData));
        setOfferData(initialOfferDataState);
      }

      setOfferData(initialOfferDataState);
      notify("br", "success", notificationAlert);


    }
  };

  return (
    <>
      {console.log(offerList)}
      <ReactNotificationAlert ref={notificationAlert} />
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col md="12" className="center-custom">
                    <h5 className="title" id="editAnchor" ref={mainRef}>
                      Ponude
                    </h5>
                    {isEditedOffer ? (
                      <>
                        <Button
                          variant="info"
                          type="button"
                          onClick={handleNewOfferAction}
                        >
                          Dodaj novu ponudu
                        </Button>
                        <Button type="button" onClick={handleViewPDF}>
                          PDF
                        </Button>
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
                    <Col className="pr-1" md="3">
                      <FormGroup>
                        <label>Usluga</label>
                        <br></br>
                        <select
                          name="serviceModel"
                          className="dropdownSelect"
                          onChange={handleChangeInput("serviceModel")}
                        >
                          <option value="Select">Odaberi uslugu...</option>
                          {servicesData.map((service, index) => {
                            if (service.id === optionData.serviceId) {
                              return (
                                <option selected key={service.id} value={index}>
                                  {service.serviceName}
                                </option>
                              );
                            }
                            return (
                              <option key={service.id} value={index}>
                                {service.serviceName}
                              </option>
                            );
                          })}
                        </select>
                        <p className="error">{formErrors.serviceModel}</p>
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="3">
                      <FormGroup>
                        <label>Kupac</label>
                        <br></br>
                        <select
                          name="customer"
                          className="dropdownSelect"
                          onChange={handleChangeInput("customer")}
                        >
                          <option value="Select">Odaberi kupca...</option>
                          {customers.map((customer, index) => {
                            if (customer.id === optionData.customerId) {
                              return (
                                <option
                                  selected
                                  key={customer.id}
                                  value={index}
                                >
                                  {customer.firstName} {customer.lastName}
                                </option>
                              );
                            }
                            return (
                              <option key={customer.id} value={index}>
                                {customer.firstName} {customer.lastName}
                              </option>
                            );
                          })}
                        </select>
                        <p className="error">{formErrors.customer}</p>
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="3">
                      <FormGroup>
                        <label>Broj ponude</label>
                        <Input
                          placeholder="Invoice Number"
                          type="number"
                          value={offerNumber}
                          onChange={handleRootInput}
                          name="offerNumber"
                        />
                        <p className="error">{formErrors.offerNumber}</p>
                      </FormGroup>
                    </Col>
                  </Row>
                  <label>Stavke ponude</label>
                  {offerData.serviceDetails.map((detail, index) => {
                    return (
                      <div key={index}>
                        <div className="details-section">
                          <Row className="details-section-row-x">
                            {index > 0 ? (
                              <div className="details-section-x">
                                <i
                                  className="now-ui-icons ui-1_simple-remove"
                                  style={{
                                    textAlign: "right",
                                    color: "black",
                                    fontWeight: "bold",
                                    fontSize: "20px",
                                    cursor: "pointer",
                                  }}
                                  onClick={handleDeleteDetailsSection(index)}
                                />
                              </div>
                            ) : (
                              <></>
                            )}
                          </Row>
                          <Row>
                            <Col className="pr-1" md="4">
                              <FormGroup>
                                <label>Jed. mjera</label>
                                <br />
                                <select
                                  id="selectisize"
                                  className="dropdownSelect"
                                  required
                                  onChange={handleServiceDetailsChangeInput(
                                    detail.id,
                                    index
                                  )}
                                  name="measureUnit"
                                >
                                  <option value={detail.measureUnit}>
                                    Select
                                  </option>
                                  {measureUnits.map((measureUnit) => {
                                    if (
                                      measureUnit.value === detail.measureUnit
                                    ) {
                                      return (
                                        <option
                                          selected
                                          key={measureUnit.value}
                                          value={measureUnit.value}
                                        >
                                          {measureUnit.value}
                                        </option>
                                      );
                                    }
                                    return (
                                      <option
                                        key={measureUnit.value}
                                        value={measureUnit.value}
                                      >
                                        {measureUnit.value}
                                      </option>
                                    );
                                  })}
                                </select>
                                {/* <p className="error">
                                  {formDetailsErrors.measureUnit}
                                </p> */}
                              </FormGroup>
                            </Col>
                            <Col className="pr-1" md="4">
                              <FormGroup>
                                <label>Količina</label>
                                <Input
                                  placeholder="0"
                                  min={1}
                                  value={detail.amount}
                                  onChange={handleServiceDetailsChangeInput(
                                    detail.id,
                                    index
                                  )}
                                  name="amount"
                                  type="number"
                                />
                                <p className="error">
                                  {formDetailsErrors.amount}
                                </p>
                              </FormGroup>
                            </Col>
                            <Col className="pr-1" md="4">
                              <FormGroup>
                                <label>Cijena</label>
                                <Input
                                  placeholder="0,00 kn"
                                  value={detail.price}
                                  onChange={handleServiceDetailsChangeInput(
                                    detail.id,
                                    index
                                  )}
                                  required
                                  min="0.00"
                                  max="999999"
                                  name="price"
                                  type="number"
                                />
                                {/* <p className="error">
                                  {formDetailsErrors.price}
                                </p> */}
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col className="pr-1" md="3">
                              <FormGroup>
                                <label>Porez. stopa %</label>
                                <Input
                                  placeholder="0%"
                                  value={
                                    detail.taxRate === null ? 0 : detail.taxRate
                                  }
                                  onChange={handleServiceDetailsChangeInput(
                                    detail.id,
                                    index
                                  )}
                                  type="number"
                                  name="taxRate"
                                />
                                {/* <p className="error">
                                  {formDetailsErrors.taxRate}
                                </p> */}
                              </FormGroup>
                            </Col>
                            <Col className="pr-1" md="3">
                              <FormGroup>
                                <label>Popust %</label>
                                <Input
                                  placeholder="0%"
                                  value={detail.discount}
                                  onChange={handleServiceDetailsChangeInput(
                                    detail.id,
                                    index
                                  )}
                                  name="discount"
                                  type="number"
                                />
                                {/* <p className="error">
                                  {formDetailsErrors.discount}
                                </p> */}
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Row>
                              <Col className="pr-1" md="12">
                                <FormGroup>
                                  <label>Opis usluge/proizvoda</label>
                                  <textarea
                                    style={{
                                      width: "100%",
                                      resize: "none",
                                      padding: "5px",
                                    }}
                                    rows="6"
                                    placeholder="Opiši opis usluge ili proizvoda..."
                                    value={detail.serviceDescription}
                                    onChange={handleServiceDetailsChangeInput(
                                      detail.id,
                                      index
                                    )}
                                    name="serviceDescription"
                                  />
                                  <p className="error">
                                    {formDetailsErrors.serviceDescription}
                                  </p>
                                </FormGroup>
                              </Col>
                            </Row>
                          </Row>
                        </div>
                      </div>
                    );
                  })}
                  <Row>
                    <Col md="2">
                      <Button
                        className="rounded-sm"
                        type="button"
                        onClick={handleAddDetailsSection}
                      >
                        <i className="now-ui-icons ui-1_simple-add" />
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="3">
                      <FormGroup>
                        <label>Način plaćanja</label>
                        <br />
                        <select
                          className="dropdownSelect"
                          onChange={handleRootInput}
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
                    <Col className="pr-1" md="3">
                      <FormGroup>
                        <label>Datum ponude</label>
                        <Input
                          type="date"
                          value={offerDate}
                          onChange={handleRootInput}
                          name="offerDate"
                        />
                        <p className="error">{formErrors.offerDate}</p>
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="3">
                      <FormGroup>
                        <label>Rok plaćanja</label>
                        <Input
                          type="date"
                          value={paymentDate}
                          onChange={handleRootInput}
                          name="paymentDate"
                        />
                        <p className="error">{formErrors.paymentDate}</p>
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="3">
                      <FormGroup>
                        <label>Ukupno</label>
                        <h3>{finalPrice} kn</h3>
                        {/* <Input
                          disabled
                          type="number"
                          value={finalPrice}
                          name="finalPrice"
                        /> */}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="3" className="editor">
                      {isEditedOffer ? (
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
                          Dodaj novu ponudu
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
                {/* <CardTitle tag="h4">Ponude</CardTitle> */}
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      {oInvoiceHead.map((prop, key) => {
                        return <th key={key}>{prop}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {offerList.map((data) => {
                      return (
                        <tr
                          key={data.id}
                          onClick={handleOfferEdit(data)}
                          style={{ cursor: "pointer" }}
                        >
                          <td>{data.offerNumber}</td>
                          <td>
                            {data.customer.firstName} {data.customer.lastName}
                          </td>
                          <td>{data.finalPrice} kn</td>
                          <td>{data.offerDate}</td>
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

export default Offer;
