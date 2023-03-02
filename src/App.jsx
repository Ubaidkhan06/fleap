import React, { useState, useEffect } from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VitalsChart from './VitalsChart';
import { motion } from 'framer-motion'


const App = () => {
  const [data, setData] = useState([
    {
      "name": 'Fleap',
      "heart_rate": 70,
      "blood_pressure": {
        "systolic": 120,
        "diastolic": 80
      },
      "respiratory_rate": 16,
      "temperature": 36.5
    },
    {
      "name": 'Ubaid',
      "heart_rate": 70,
      "blood_pressure": {
        "systolic": 520,
        "diastolic": 80
      },
      "respiratory_rate": 16,
      "temperature": 36.5
    }
  ])

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };


  const fetchData = async () => {
    
    // !Uncomment when api is available
    // const response = await fetch('http://localhost:5000/api/v1/patient/1/vitals');
    // const json = await response.json();
    // setData(json);

    data.map(item => {
      // !warning for heart Rate
      if (item.heart_rate > 100 || item.heart_rate < 60) {
        const notify = () => toast.error(`${item.name}'s Heart Rate is not Stable`);
        notify()
      }

      // ! Warning for blood pressure
      // let bloodPressure = data[0].blood_pressure.diastolic / data[0].blood_pressure.systolic
      if (item.blood_pressure.systolic > 140 || item.blood_pressure.systolic < 90 ||
        data[0].blood_pressure.diastolic > 90 || data[0].blood_pressure.diastolic < 60
      ) {
        const notify = () => toast.error(`${item.name}'s blood pressure is not Stable`);
        notify()
      }

      //  ! Respiratory rates warning
      if (item.respiratory_rate < 12 || item.respiratory_rate > 20) {
        const notify = () => toast.error(`${item.name}'s respiration rate is not normal`);
        notify()
      }

      // !Temperature Warning
      if (item.temperature < 35.5 || item.temperature > 37.5) {
        const notify = () => toast.error(`${item.name}'s temperature is not normal`);
        notify()
      }
    })


  };

  // !Fetch data every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData()
    }, 5000);

    // ? Return a cleanup function that clears the interval
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        limit={2}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <h1 className="title">Patient Vital Signs Dashboard</h1>
      <motion.div className="container"
        initial="hidden"
        animate="visible"
      >
        {data.map((patient, index) => (
          <motion.div className="row" key={index}>
            <motion.div className="card"
              initial={{ opacity: 1, x: -800 }}
              animate={{ x: 0 }}
              whileHover={{ scale: 1.1 }}
              transition={{ delay: 0.1, type: 'tween' }}
            >
              <h2 className="card-title">{patient.name}</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>Vital Sign</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Heart Rate (BPM)</td>
                    <td style={patient.heart_rate > 100 || patient.heart_rate < 60 ? { backgroundColor: 'red' } : null}>{patient.heart_rate}</td>
                  </tr>
                  <tr>
                    <td>Blood Pressure (mmHg)</td>
                    <td>
                      {patient.blood_pressure.systolic}/
                      {patient.blood_pressure.diastolic}
                    </td>
                  </tr>
                  <tr>
                    <td>Respiratory Rate (breaths per minute)</td>
                    <td>{patient.respiratory_rate}</td>
                  </tr>
                  <tr>
                    <td>Temperature (degrees Celsius)</td>
                    <td>{patient.temperature}</td>
                  </tr>
                </tbody>
              </table>
            </motion.div>
            <motion.div
              initial={{ opacity: 1, x: 800 }}
              animate={{ x: 0 }}
              whileHover={{ scale: 1.1 }}
              transition={{ delay: 0.1, type: 'tween' }}
            >
              <VitalsChart data={[patient]} />
            </motion.div>
          </motion.div>
        ))}

      </motion.div>
    </>
  );
};

export default App;
