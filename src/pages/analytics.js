//
import React from "react";
import ChartSelection from "../components/chartSelection";
import ChartRenderer from "../components/chartRenderer";
import { Container } from "react-bootstrap";

export default class AnalyticsPage extends React.Component {
    render() {
      return (
        <div>
          <Container>
          <h1>Analytics</h1>
          </Container>
          <Container>
            <ChartSelection/>
          </Container>
          <Container>
            <ChartRenderer/>
          </Container>
        </div>
      );
    }
  }
