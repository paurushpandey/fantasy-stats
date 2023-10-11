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
    tension: 0.2,
    borderJoinStyle: 'round',
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
    onHover: (e, activeEls, chart) => {
        if (activeEls.length === 0) {
          chart.data.datasets.forEach((dataset) => {
            // dataset.backgroundColor = dataset.backgroundColor.length === 9 ? dataset.backgroundColor.slice(0, -2) : dataset.backgroundColor;
            dataset.borderColor = dataset.borderColor.length === 9 ? dataset.borderColor.slice(0, -2) : dataset.borderColor;
          });
          chart.update();
          return;
        }
  
        const hoveredEl = chart.getElementsAtEventForMode(e, 'point', {
          intersect: true
        }, true)[0]
  
        chart.data.datasets.forEach((dataset, i) => {
        //   dataset.backgroundColor = (hoveredEl.datasetIndex === i || dataset.backgroundColor.length === 9) ? dataset.backgroundColor : dataset.backgroundColor + '4D';
          dataset.borderColor = (hoveredEl.datasetIndex === i || dataset.borderColor.length === 9) ? dataset.borderColor : dataset.borderColor + '4D';
        });
  
        chart.update();
      },
}

  return <Line data={chartData} options={options} />;
};


export default LineGraph;
