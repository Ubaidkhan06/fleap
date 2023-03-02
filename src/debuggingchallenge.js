import React, { useState, useEffect } from 'react';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/v1/patient/1/vitals');
      const json = await response.json();
      setData(json);
    };
    setInterval(() => {
      fetchData();
    }, 5000);
  }, []);

  return (
    <div>
      <h1>Patient Vital Signs Dashboard</h1>
      {/* ! data is a list it was not mapped this was another issue */}
      {data.map((patient, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div className="card">
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
              </div>
            </div>
          ))}
    </div>
  );
};

// ! App was not written in default
export default App