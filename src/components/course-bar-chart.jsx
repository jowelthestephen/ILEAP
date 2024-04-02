import React, { useEffect, useRef } from "react";
import { Chart as ChartJS } from "chart.js";
import { Bar } from "react-chartjs-2"; // DONT DELETE !!!!
import "../css/graph.css"

const CourseBarChart = ({ CoursesCount }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Course Bar Chart",
      },
    },
  };

  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Destroy existing Chart instance
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Create a new Chart instance with the latest data
    chartRef.current = new ChartJS(context, {
      type: "bar",
      data: {
        labels: Object.keys(CoursesCount), // Use the locations as labels
        datasets: [
          {
            label: "Company Count",
            data: Object.values(CoursesCount), // Use the count of companies as data
            backgroundColor: "rgba(75, 192, 192, 0.5)",
          },
        ],
      },
      options,
    });

    return () => {
      // Cleanup on component unmount
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [CoursesCount, options]);

  return (
    <div >
      <canvas ref={canvasRef} /> 
    </div>
  );
};

export default CourseBarChart;
