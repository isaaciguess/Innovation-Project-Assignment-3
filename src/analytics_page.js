//
import React from "react";
import ChartSelection from "./chart_selection_component";
import ChartRenderer from "./chart_renderer_component";
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
