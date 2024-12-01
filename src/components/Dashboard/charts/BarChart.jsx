import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Barr() {
  const barChartData = {
    labels: ["Moroccan", "Italian", "Asian"],
    datasets: [
      {
        label: "Popularity Score",
        data: [85, 70, 90], 
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)', // Moroccan
          'rgba(54, 162, 235, 0.5)', // Italian
          'rgba(75, 192, 192, 0.5)', // Asian
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
        barThickness: 40, 
        categoryPercentage: 0.6, 
        barPercentage: 0.8,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div
      style={{
        
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Bar options={options} data={barChartData} />
    </div>
  );
}
