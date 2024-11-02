import React from "react";
import ChartSelection from "../components/chartSelection";
import ChartRenderer from "../components/chartRenderer";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";

function AnalyticsPage(props) {
    const [formData, setFormData] = React.useState({
      chart: '',
      feature: ''
    })

    const[chartData, setChartData] = useState([null]);
    useEffect(() => {
      fetch("http://localhost:8000/get_chart_data")
        .then(response => response.json())
        .then(data => setChartData(data))
        .catch(error => console.error("Error fetching data:", error));
    }, []);

    console.log(`file data ${chartData}`);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      console.log(`chart: ${formData.chart} \nfeature: ${formData.feature}`);
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    const chartable_features = Object.keys(chartData).filter(key => key !== 'Price');

    return (
      <div>
        <Container>
        <h1>Analytics</h1>
        </Container>
        <Container>
          <ChartSelection features={chartable_features} formData={formData} onInputChange={handleInputChange}/>
        </Container>
        <Container>
        <ChartRenderer formData={formData} chartData={chartData} />
        </Container>
      </div>
  );
}
export default AnalyticsPage;