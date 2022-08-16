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

import { servicesHead } from "variables/general";
import { servicesValidation } from "components/Validation/ValidateValues.js";
import { useDispatch, useSelector } from "react-redux";
import { updateService } from "redux/actions/serviceAction";
import { createService } from "redux/actions/serviceAction";
import { deleteService } from "redux/actions/serviceAction";
import Dialog from "components/FixedPlugin/CustomDialog";
import ReactNotificationAlert from "react-notification-alert";
import notify from "variables/notify";

const Services = () => {
  const { serviceRed, auth } = useSelector((state) => state);
  const initialServiceData = {
    user: auth.user,
    serviceNumber: 0,
    serviceName: "",
  };

  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false
  });

  const notificationAlert = useRef();
  const dispatch = useDispatch();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isEditedService, setIsEditedService] = useState(false);
  const [services, setServices] = useState([]);
  const [serviceData, setServiceData] = useState(initialServiceData);
  const [formErrors, setFromErrors] = useState({
    serviceNumber: "",
    serviceName: "",
  });

  const { serviceNumber, serviceName } = serviceData;

  useEffect(() => {
    console.log(serviceRed.services)
    setServices(serviceRed.services);
  }, [serviceRed.services]);

   // Confirmation dialog
   const handleDialog = (message, isLoading) => {
    setDialog({
      message,
      isLoading
    });
  };

  const handleAction = (e) => {
    handleDialog("Jeste li siguni da želite obrisati uslugu br." + serviceData.serviceNumber + " ?" , true);
  };

  const handleConfirmation = (choose, e) => {
    console.log(e)
    if (choose) {
      //ACTION
      handleDialog("", false);
      handleDeleteService(e);
    } else {
      handleDialog("", false);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setServiceData({ ...serviceData, [name]: value });
    console.log(serviceData);
  };

  const handleServiceEdit = (data) => (e) => {
    setServiceData(data);
    setIsEditedService(true);

    document.getElementById("editAnchor").scrollIntoView();
  };

  const handleDeleteService = (e) => {
    dispatch(deleteService(serviceData));
    setIsEditedService(false);
    setServiceData(initialServiceData);
  };

  const handleNewServiceAction = (e) => {
    setIsEditedService(!isEditedService);
    setServiceData(initialServiceData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFromErrors(servicesValidation(serviceData));
    setIsSubmit(true);

    if (Object.keys(servicesValidation(serviceData)).length === 0) {
      if (isEditedService) {
        dispatch(updateService(serviceData));
        setServiceData(initialServiceData);
        setIsEditedService(false);
      } else {
        dispatch(createService(serviceData));
        setServiceData(initialServiceData);
      }

      notify("br", "success", notificationAlert);
    }
  };

  return (
    <>
      <ReactNotificationAlert ref={notificationAlert} />
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col md="12" className="center-custom">
                    <h5 className="title" id="editAnchor">Dodaj uslugu</h5>
                    {isEditedService ? (
                      <Button
                        variant="info"
                        type="button"
                        onClick={handleNewServiceAction}
                      >
                        Nova usluga
                      </Button>
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
                        <label>Broj usluge</label>
                        <Input
                          placeholder="Broj usluge (1, 2, 3...)"
                          type="number"
                          value={serviceNumber}
                          onChange={handleChangeInput}
                          name="serviceNumber"
                        />
                        <p className="error">{formErrors.serviceNumber}</p>
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Ime usluge</label>
                        <Input
                          placeholder="Ime usluge"
                          type="text"
                          onChange={handleChangeInput}
                          value={serviceName}
                          name="serviceName"
                        />
                        <p className="error">{formErrors.serviceName}</p>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="3" className="editor">
                      {isEditedService ? (
                        <>
                          <Button variant="primary" type="submit">
                            Spremi nove izmjene
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
                          Dodaj novu uslugu
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
                <CardTitle tag="h4">Usluge</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      {servicesHead.map((prop, key) => {
                        return <th key={key}>{prop}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((data) => {
                      return (
                        <tr key={data.id} onClick={handleServiceEdit(data)} style={{cursor: "pointer"}}>
                          <td>{data.serviceNumber}</td>
                          <td>{data.serviceName}</td>
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

export default Services;
