import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function LineChart() {
  const lineChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [{
      label: "Sales",
      data: [12, 19, 3, 5, 2, 3, 10],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)"
    }]
  };

  const options = {
    layout: {
      padding: 10, 
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        enabled: true,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ height: "400px", backgroundColor: "white", padding: "20px" }}>
      <Line options={options} data={lineChartData} />
    </div>
  );
}
