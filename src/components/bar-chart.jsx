import React, { useEffect, useRef, useState } from "react";
import { Chart as ChartJS } from "chart.js";
import { Bar } from "react-chartjs-2"; //DONT DELETE!!!!
import "../css/graph.css"

const BarChart = ({male,female,jobs,internships}) => {
 const options = {
   responsive: true,
   plugins: {
     legend: {
       position: "top",
     },
     title: {
       display: true,
       text: "Studet/Alumni Bar Chart",
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
       labels: ["Data Set"], // Modify this as needed
       datasets: [
         {
           label: "Male",
           data: [male], // Use the male prop
           backgroundColor: "rgba(255, 99, 132, 0.5)",
         },
         {
           label: "Female",
           data: [female], // Use the female prop
           backgroundColor: "rgba(53, 162, 235, 0.5)",
         },
         // Add more datasets based on your requirements (jobs, internships, etc.)
         // Example:
         {
           label: "Jobs",
           data: [jobs],
           backgroundColor: "rgba(255, 206, 86, 0.5)",
         },
         {
           label: "Internships",
           data: [internships],
           backgroundColor: "rgba(255, 206, 86, 0.5)",
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
 }, [male, female, jobs, internships, options]);

  return (
    <div >
      <canvas ref={canvasRef}  />
    </div>
  );
};

export default BarChart;
