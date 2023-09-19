import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  
const LineGraph = ({ data }) => {
  // Extract the week labels (x-axis)
  const weekLabels = Array.from({ length: data['Chubs'].length }, (_, i) => `Week ${i + 1}`);

  // Create a dataset for each category
  const datasets = Object.keys(data).map((categoryName) => ({
    label: categoryName,
    data: data[categoryName],
    borderColor: getRandomColor(),
    fill: false,
  }));

  const chartData = {
    labels: weekLabels,
    datasets: datasets,
  };

  const options = {
    scales: {
      x: {
        type: 'category', // Use 'category' for the x-axis
        title: {
          display: true,
          text: 'Weeks',
        },
      },
      y: {
        type: 'linear', // Use 'linear' for the y-axis
        title: {
          display: true,
          text: 'Win Loss Differential',
        },
      },
    },
}

  return <Line data={chartData} options={options} />;
};


export default LineGraph;
