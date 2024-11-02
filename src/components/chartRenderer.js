import React from "react";
import { Bar, Pie, Scatter } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

function ChartRenderer({ formData, chartData }) {
  const { chart, feature } = formData;

  // Prepare data based on feature selection
  const featureData = chartData[feature] || [];;
  const priceData = chartData.Price;

  console.log('Feature Data:', featureData);
  console.log('Price Data:', priceData);
  console.log('Chart:', chart);
  console.log('Feature:', feature);

  if (!featureData.length) {
    return <p>Please select a valid feature to display the chart.</p>;
  }

  // Bar chart data
  const barChartData = {
    labels: [...new Set(featureData)], // Unique values of the selected feature
    datasets: [
      {
        label: `${feature} Count`,
        data: featureData.reduce((counts, value) => {
          counts[value] = (counts[value] || 0) + 1;
          return counts;
        }, {}),
        backgroundColor: 'rgba(75, 192, 192, 0.6)', 
      },
    ],
  };

  // Pie chart data
  const pieChartData = {
    labels: [...new Set(featureData)],
    datasets: [
      {
        label: `${feature} Distribution`,
        data: featureData.reduce((counts, value) => {
          counts[value] = (counts[value] || 0) + 1;
          return counts;
        }, {}),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
      },
    ],
  };

  // Scatter plot data
  const scatterChartData = {
    datasets: [
      {
        label: `Price vs ${feature}`,
        data: featureData.map((val, index) => ({
          x: val,
          y: priceData[index],
        })),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  return (
    <div>
      {chart === "bar" && (
        <Bar
          data={{
            labels: Object.keys(barChartData.datasets[0].data),
            datasets: [
              {
                label: `${feature} Count`,
                data: Object.values(barChartData.datasets[0].data),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: `Bar Chart of ${feature}`,
              },
            },
          }}
        />
      )}

      {chart === "pie" && (
        <Pie
          data={{
            labels: Object.keys(pieChartData.datasets[0].data),
            datasets: [
              {
                label: `${feature} Distribution`,
                data: Object.values(pieChartData.datasets[0].data),
                backgroundColor: [
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                ],
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: `Pie Chart of ${feature} Distribution`,
              },
            },
          }}
        />
      )}

      {chart === "scatter" && (
        <Scatter
          data={scatterChartData}
          options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: `Scatter Plot of Price vs ${feature}`,
              },
            },
            scales: {
              x: {
                type: 'linear',
                position: 'bottom',
                title: {
                  display: true,
                  text: feature,
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Price',
                },
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default ChartRenderer;