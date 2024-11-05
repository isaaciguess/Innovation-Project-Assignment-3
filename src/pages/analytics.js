import React from "react";
import ChartSelection from "../components/chartSelection";
import ChartRenderer from "../components/chartRenderer";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";

function AnalyticsPage(props) {

  // Define state variables
  const [filteredFeatures, setFilteredFeatures] = useState([]);
  const [formData, setFormData] = React.useState({
    chart: 'bar',
    feature: 'Number of Bedrooms'
  })

  // Fetch chart data from the server
  const [chartData, setChartData] = useState([null]);
  useEffect(() => {
    fetch("http://localhost:8000/get_chart_data")
      .then(response => response.json())
      .then(data => setChartData(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);


  // Update filtered features based on selected chart type
  useEffect(() => {
    if (formData.chart) {
      const compatible = compatibleFeatures[formData.chart] || [];
      setFilteredFeatures(Object.keys(chartData).filter((feature) => compatible.includes(feature)));

      // Reset feature if it’s not compatible with the current chart type
      if (!compatible.includes(formData.feature)) {
        setFormData((prevData) => ({
          ...prevData,
          feature: '' // Reset feature to an empty value or a compatible default
        }));
      }
    }
  }, [formData.chart, chartData]); // Run whenever chart type or data changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`chart: ${formData.chart} \nfeature: ${formData.feature}`);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Define compatible features for each chart type
  const compatibleFeatures = {
    bar: ["Number of Bedrooms", "Number of Bathrooms", "Number of Car Spaces", "Property Type"],
    pie: ["Number of Bedrooms", "Number of Bathrooms", "Number of Car Spaces", "Property Type"],
    scatter: ["Suburb Longitude", "Suburb Latitude", "Distance from CBD (km)", "Property Size (sqm)", "Suburb Population", "Suburb Median Income"],
    box: ["Number of Bedrooms", "Number of Bathrooms", "Number of Car Spaces", "Property Type"]
  };

  return (
    <div>
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '12vh' }}>
        <h1>Analytics</h1>
      </Container>
      {/* Render the chart selection form */}
      <Container>
        <ChartSelection features={filteredFeatures} formData={formData} onInputChange={handleInputChange} />
      </Container>
      {/* Render the chart */}
      <Container>
        <ChartRenderer formData={formData} chartData={chartData} />
      </Container>
    </div>
  );
}
export default AnalyticsPage;