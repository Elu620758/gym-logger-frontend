import React, { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';

const ExerciseChart = ({ exerciseData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && exerciseData) {
      const ctx = chartRef.current.getContext('2d');
      new Bar(ctx, {
        type: 'bar',
        data: {
          labels: ['Aerobic', 'Cardio', 'Resistance'],
          datasets: [
            {
              data: [
                exerciseData.filter((exercise) => exercise.type === 'aerobic').length,
                exerciseData.filter((exercise) => exercise.type === 'cardio').length,
                exerciseData.filter((exercise) => exercise.type === 'resistance').length,
              ],
              backgroundColor: ['#53777a', '#c02942', '#d95b43'],
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              suggestedMax: 10, // Set a fixed maximum value for the y-axis (adjust as needed)
            },
          },
          title: {
            display: true,
            text: 'Number of Exercises by Type',
          },
        },
      });
    }
  }, [exerciseData]);

  if (!exerciseData || exerciseData.length === 0) {
    return <div>No exercise data available.</div>;
  }

  return (
    <div>
      <Bar ref={chartRef} data={{}} />
    </div>
  );
};

export default ExerciseChart;
