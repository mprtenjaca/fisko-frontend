import React, { useEffect, useState } from "react";
// react plugin used to create charts
import { Line, Bar, Pie, Bubble, Scatter } from "react-chartjs-2";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table,
  Button,
  Label,
  FormGroup,
  Input,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

import {
  dashboardPanelChart,
  dashboardShippedProductsChart,
  dashboardAllProductsChart,
  dashboard24HoursPerformanceChart,
} from "variables/charts.js";
import { useSelector } from "react-redux";
import { hexToRGB } from "variables/charts";
import { dashboardPanelChart1 } from "variables/charts";

const Dashboard = () => {
  const { outputInvoiceRed, inputInvoiceRed, customersRed, serviceRed, companyRed, auth } =
    useSelector((state) => state);

  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col>
          <Card className="card-chart">
              <CardBody>
                <div className="chart-area-lg">
                <Bar
                  data={dashboardPanelChart1(outputInvoiceRed.outputInvoices).data}
                  options={dashboardPanelChart1(outputInvoiceRed.outputInvoices).options}
                />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">2022</h5>
                <CardTitle tag="h4">Klijenti</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={dashboardShippedProductsChart(customersRed.customers).data}
                    options={dashboardShippedProductsChart(customersRed.customers).options}
                  />
                </div>
              </CardBody>
              {/* <CardFooter>
                <div className="stats">
                  <i className="now-ui-icons arrows-1_refresh-69" /> Just
                  Updated
                </div>
              </CardFooter> */}
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">2022</h5>
                <CardTitle tag="h4">Ulazni računi</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={dashboardAllProductsChart(inputInvoiceRed.inputInvoices).data}
                    options={dashboardAllProductsChart(inputInvoiceRed.inputInvoices).options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Dashboard;
