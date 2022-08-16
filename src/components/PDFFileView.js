import React, { Component, useEffect, useRef, useState } from "react";

// core components
import "assets/css/fisco-pdf.css";

import NotificationAlert from "react-notification-alert";
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { updateCompany } from "redux/actions/companyAction";
import notify from "variables/notify";
import img from "../assets/img/Blic_Main_Logo.png";
import ReactToPrint from "react-to-print";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import { useHistory } from "react-router-dom";

const PDFFileView = (props) => {
  const componentRef = useRef();
  const history = useHistory();

  const { companyRed} = useSelector((state) => state);

  const checkForProps = () => {

    console.log(companyRed.company)
    if (!props.location.state) {
      history.push("/");
    }
  };

  return (
    <>
      {checkForProps()}
      <PanelHeader size="sm" />
      <div>
        <div className="content">
          <div ref={componentRef}>
            <Row>
              <Col md={12}>
                <Card>
                  <CardBody className="all-icons">
                    <div>
                      <div className="pdfHeader">
                        <img src={img} />
                        <h2>Račun br. 66555</h2>
                      </div>

                      <hr />

                      <div className="pdfDetails">
                        <div className="sender">
                          <p className="bold">{companyRed.company.name}</p>
                          <p>{companyRed.company.address} {companyRed.company.postalCode}</p>
                          <p>{companyRed.company.postalCode}, {companyRed.company.city}</p>
                          <p className="bold">OIB: {companyRed.company.oib}</p>
                        </div>
                        <div className="reciever">
                          <p className="bold">
                            {props.location.state.invoice.customer.companyName ? 
                              <>{props.location.state.invoice.customer.companyName}</>
                            : <>{props.location.state.invoice.customer.firstName} {props.location.state.invoice.customer.lastName}</>}</p>

                          <p>{props.location.state.invoice.customer.address}</p>
                          <p>{props.location.state.invoice.customer.postalCode}, {props.location.state.invoice.customer.city}</p>
                          <p className="bold">OIB: {props.location.state.invoice.customer.oib}</p>
                        </div>
                      </div>

                      <hr />

                      <div className="pdfBody">
                        <Table
                          responsive
                          style={{ backgroundColor: "#d9d9d9" }}
                        >
                          <thead>
                            <tr>
                              <th>R.br.</th>
                              <th>Opis proizvoda/usluge</th>
                              <th>Jed.</th>
                              <th>Kol.</th>
                              <th>Iznos stavke</th>
                              <th>Cijena</th>
                            </tr>
                          </thead>
                          <tbody>
                            {props.location.state.invoice.serviceDetails.map(
                              (item, index) => {
                                return (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.serviceDescription}</td>
                                    <td>{item.measureUnit}</td>
                                    <td>{item.amount}</td>
                                    <td>{item.price}</td>
                                    <td>{item.finalPrice}</td>
                                  </tr>
                                );
                              }
                            )}
                          </tbody>
                        </Table>
                      </div>

                      <div className="pdfDetails">
                        <div>
                          <p>
                            <strong>Način plaćanja:</strong>{" "}
                            {props.location.state.invoice.paymentMethod}
                          </p>
                        </div>
                        <div className="pdfFinalPrice">
                          <h5>
                            Ukupan iznos računa:{" "}
                            {props.location.state.invoice.finalPrice} kn
                          </h5>
                        </div>
                      </div>

                      <div style={{ marginTop: "20px" }}>
                        <p>
                          <strong>Datum računa:</strong>{" "}
                          {props.location.state.invoice.dateAndTime}
                        </p>
                        <p>
                          <strong>Rok plaćanja:</strong>{" "}
                          {props.location.state.invoice.deliveryDate}
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
          <ReactToPrint
            trigger={() => {
              return <Button type="button">DOWNLOAD PDF</Button>;
            }}
            content={() => componentRef.current}
          />
        </div>
      </div>
    </>
  );
};

export default PDFFileView;
