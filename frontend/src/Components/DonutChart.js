import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const DonutChart = () => {
  const [expenseData, setExpenseData] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem('x-auth-token');
      const response = await fetch('http://localhost:5000/expenses', {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': `${token}`
        }
      });
      const data = await response.json();
      setExpenseData(data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const getCategoryCounts = () => {
    const categoryCounts = {
      Food: 0,
      Bills: 0,
      Health: 0,
      Transportation: 0,
      Shopping: 0,
      Entertainment: 0
    };

    expenseData.forEach(expense => {
      categoryCounts[expense.category] += 1;
    });

    return Object.values(categoryCounts);
  };

  const series = getCategoryCounts();

  const options = {
    chart: {
      type: 'donut',
    },
    labels: ['Food', 'Bills', 'Health', 'Transportation', 'Shopping', 'Entertainment'],
    fill: {
      colors: ['#FF0000', '#0000FF', '#00FF00', '#FFFF00', '#FF00FF', '#00FFFF'],
    },
    legend: {
      markers: {
        fillColors: ['#FF0000', '#0000FF', '#00FF00', '#FFFF00', '#FF00FF', '#00FFFF'],
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="donut" />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default DonutChart;
