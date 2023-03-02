import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';


const VitalsChart = ({ data }) => {
    const [chart, setChart] = useState(null);

    useEffect(() => {
        const ctx = document.getElementById(data[0].name);
        const heartRate = data[0].heart_rate;
        const systolic = data[0].blood_pressure.systolic;
        const diastolic = data[0].blood_pressure.diastolic;
        const respiratoryRate = data[0].respiratory_rate;
        const temperature = data[0].temperature;

        const heartRateColor = (heartRate < 60 || heartRate > 100) ? '#FF4136' : '#0074D9';
        const systolicColor = (systolic < 90 || systolic > 140) ? '#FF4136' : '#0074D9';
        const diastolicColor = (diastolic < 60 || diastolic > 90) ? '#FF4136' : '#0074D9';
        const respiratoryRateColor = (respiratoryRate < 12 || respiratoryRate > 20) ? '#FF4136' : '#0074D9';
        const temperatureColor = (temperature < 35.5 || temperature > 37.5) ? '#FF4136' : '#0074D9';

        const chartData = {
            labels: ['Heart Rate', 'Systolic', 'Diastolic', 'Respiratory Rate', 'Temperature'],
            datasets: [{
                label: 'Vitals',
                data: [heartRate, systolic, diastolic, respiratoryRate, temperature],
                backgroundColor: [
                    heartRateColor,
                    systolicColor,
                    diastolicColor,
                    respiratoryRateColor,
                    temperatureColor
                ],
                borderColor: '#000000',
                borderWidth: 1
            }]
        };




        const chartOptions = {
            scales: {
                y: {
                    ticks: {
                        beginAtZero: true
                    }
                }
            },
            legend: {
                display: false
            }
        };

        const newChart = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: chartOptions
        });

        setChart(newChart);
        return () => {
            newChart.destroy()
        }
    }, [data]);

    return (
        <div style={{
            width: '100%',
            height: '100%'
        }}>
            <canvas id={data[0].name} width={'500px'} height={'360px'}></canvas>
        </div>
    );
};

export default VitalsChart;
