//
import React from "react";
import ChartSelection from "./chart_selection_component";
import ChartRenderer from "./chart_renderer_component";

export default class AnalyticsPage extends React.Component {
    render() {
      return (
        <div>
          <h1>Analytics</h1>
          <ChartSelection/>
          <ChartRenderer/>
        </div>
      );
    }
  }
