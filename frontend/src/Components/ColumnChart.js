import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const ColumnChart = () => {
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

  const getMonthlyExpenses = () => {
    const monthlyExpenses = new Array(12).fill(0);

    expenseData.forEach(expense => {
      const month = new Date(expense.date).getMonth();
      monthlyExpenses[month] += expense.amount;
    });

    return monthlyExpenses;
  };

  const series = [{
    name: 'Expenses',
    data: getMonthlyExpenses()
  }];

  const options = {
    chart: {
      type: 'bar',
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: 'top', // top, center, bottom
        },
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val.toFixed(2); // Format to two decimal places
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ["#304758"]
      }
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      position: 'bottom',
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          }
        }
      },
      tooltip: {
        enabled: true,
      }
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val) {
          return val.toFixed(2); // Format to two decimal places
        }
      }
    },
    title: {
      text: 'Monthly Expenses',
      floating: true,
      offsetY: 500,
      align: 'center',
      style: {
        color: '#444'
      }
    }
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="bar" height={500} width={700} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ColumnChart;
