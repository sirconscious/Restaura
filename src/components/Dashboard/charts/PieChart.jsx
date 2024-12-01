import { Pie } from 'react-chartjs-2';
import React from 'react';
import { Chart, Tooltip, Legend, ArcElement } from 'chart.js';

export default function PieChart() {
  Chart.register(Tooltip, Legend, ArcElement);

  const data = {
    labels: ['Moroccan', 'Italian', 'Asian'],
    datasets: [{
      label: '# of Votes',
      data: [30, 45, 25], 
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)', // Moroccan
        'rgba(54, 162, 235, 0.2)', // Italian
        'rgba(75, 192, 192, 0.2)'  // Asian
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(75, 192, 192, 1)'
      ],
      borderWidth: 1
    }]
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom', 
      }
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
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' 
      }}
    >
      <Pie data={data} options={options} />
    </div>
  );
}
