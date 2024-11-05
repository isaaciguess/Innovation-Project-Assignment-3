import React from "react";
import Plot from "react-plotly.js";

function ChartRenderer({ formData, chartData }) {
  const { chart, feature } = formData;

  // Prepare data based on feature selection
  const featureData = chartData[feature] || [];
  const priceData = chartData.Price;

  if (!featureData.length) {
    return <p>Please select a valid feature to display the chart.</p>;
  }

  // Data processing for different chart types
  const uniqueFeatureValues = [...new Set(featureData)];
  const featureCounts = uniqueFeatureValues.map(
    (val) => featureData.filter((item) => item === val).length
  );

  const commonLayout = {
    responsive: true,
    width: 1300, // Set a large width
    height: 600, // Set a large height
    margin: { t: 60, r: 40, b: 80, l: 60 }, // Adjust margins for readability
    font: { size: 16 }, // Increase font size for labels and titles
  };

  return (
    <div>
      {/* Render the selected chart */}
      {chart === "bar" && (
        <Plot
          data={[
            {
              x: uniqueFeatureValues,
              y: featureCounts,
              type: "bar",
              marker: { color: "rgba(75, 192, 192, 0.6)" },
            },
          ]}
          layout={{
            ...commonLayout,
            title: `Bar Chart of ${feature}`,
            xaxis: { title: feature },
            yaxis: { title: `${feature} Count`,
                     standoff: 100, 
            },
            responsive: true,
            transition: {
              duration: 800, // Duration of the transition animation in ms
              easing: "cubic-in-out", // Easing function for smooth animation
            },
            frame: {
              duration: 500, // Duration of each frame in the animation sequence
            },
          }}
        />
      )}

      {chart === "pie" && (
        <Plot
          data={[
            {
        
              labels: uniqueFeatureValues,
              values: featureCounts,
              type: "pie",
              marker: {
                colors: [
                  "rgba(255, 99, 132, 0.6)",
                  "rgba(54, 162, 235, 0.6)",
                  "rgba(255, 206, 86, 0.6)",
                  "rgba(75, 192, 192, 0.6)",
                ],
              },
            },
          ]}
          layout={{
            ...commonLayout,
            title: `Pie Chart of ${feature} Distribution`,
            responsive: true,
          }}
        />
      )}

      {chart === "scatter" && (
        <Plot
          data={[
            {
     
              x: featureData,
              y: priceData,
              mode: "markers",
              type: "scatter",
              marker: { color: "rgba(153, 102, 255, 0.6)" },
            },
          ]}
          layout={{
            ...commonLayout,
            title: `Scatter Plot of Price vs ${feature}`,
            xaxis: { title: feature },
            yaxis: { title: "Price" },
            responsive: true,
          }}
        />
      )}
           {chart === "box" && (
        <Plot
          data={[
            {
              x: featureData,
              y: priceData,
              type: "box",
              marker: { color: "rgba(54, 162, 235, 0.6)" },
              boxpoints: false,
              jitter: 0.3,
              pointpos: -1.8,
            },
          ]}
          layout={{
            ...commonLayout,
            title: { text: `Box Plot of Price Distribution by ${feature}`, font: { size: 24 } },
            xaxis: { title: { text: feature, font: { size: 18 } } },
            yaxis: { title: { text: "Price", font: { size: 18 } } },
          }}
        />
      )}
    </div>
     );
}

export default ChartRenderer;