import React from "react";
import ChartSelection from "../components/chartSelection";
import ChartRenderer from "../components/chartRenderer";
import { Container } from "react-bootstrap";

function AnalyticsPage(props) {
    const [formData, setFormData] = React.useState({
      chart: '',
      feature: ''
    })

    const chartData = {
      bedrooms: [1, 1, 2, 3, 3, 3 , 4],
      bathrooms:[1, 1, 2, 2, 2, 3, 4],
      price: [100, 120, 150, 200, 250, 300, 350]  
    };
    

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      console.log(`chart: ${formData.chart} \nfeature: ${formData.feature}`);
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    return (
      <div>
        <Container>
        <h1>Analytics</h1>
        </Container>
        <Container>
          <ChartSelection formData={formData} onInputChange={handleInputChange}/>
        </Container>
        <Container>
        <ChartRenderer formData={formData} chartData={chartData} />
        </Container>
      </div>
  );
}
export default AnalyticsPage;