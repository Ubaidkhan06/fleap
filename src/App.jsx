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
        "systolic": 120,
        "diastolic": 80
      },
      "respiratory_rate": 16,
      "temperature": 36.5
    }
  ])

  const [warning, setWarning] = useState(false)

  const fetchData = async () => {
    const response = await fetch('http://localhost:5000/api/v1/patient/1/vitals');
    const json = await response.json();
    setData(json);

    // !warning for heart Rate
    if (data[0].heart_rate > 100 || data[0].heart_rate < 60) {
      const notify = () => toast.error("Heart Rate not Stable");
      notify()
    }

    // ! Warning for blood pressure
    // let bloodPressure = data[0].blood_pressure.diastolic / data[0].blood_pressure.systolic
    if (data[0].blood_pressure.systolic > 140 || data[0].blood_pressure.systolic < 90 ||
      data[0].blood_pressure.diastolic > 90 || data[0].blood_pressure.diastolic < 60
    ) {
      const notify = () => toast.error("Blood Pressure not Stable");
      notify()
    }

    //  ! Respiratory rates warning
    if (data[0].respiratory_rate < 12 || data[0].respiratory_rate > 20) {
      const notify = () => toast.error("Respiration not Stable");
      notify()
    }

    // !Temperature Warning
    if (data[0].temperature < 35.5 || data[0].temperature > 37.5) {
      const notify = () => toast.error("Temperature not Stable");
      notify()
    }
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
      <div className="container">
        {data.map((patient, index) => (
          <div className="row" key={index}>
            <motion.div className="card"
              initial={{ opacity: 1, x: -800 }}
              animate={{ x: 0 }}
              whileHover={{ scale: 1.1 }}
              transition={{ delay: 0.1, type:'tween'}}
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
              transition={{ delay: 0.1, type:'tween' }}
            >
              <VitalsChart data={[patient]} />
            </motion.div>
          </div>
        ))}

      </div>
    </>
  );
};

export default App;
