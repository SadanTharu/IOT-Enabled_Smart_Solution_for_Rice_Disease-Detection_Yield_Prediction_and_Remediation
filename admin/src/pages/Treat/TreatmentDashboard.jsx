import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './TreatmentDashboard.css'; 
import axios from 'axios';
import RemediesPieChart from './RemediesPieChart';
import moment from 'moment';

const TreatmentDashboard = ({ url }) => {
  const [remedies, setRemedies] = useState([]);
  const [remedyCount, setRemedyCount] = useState(0);
  const [newRemediesAdded, setNewRemediesAdded] = useState(0);
  const [updatedRemediesCount, setUpdatedRemediesCount] = useState(0);
  const [dailyRemedies, setDailyRemedies] = useState([]);
  const [diseasesWithoutRemedies, setDiseasesWithoutRemedies] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching both remedies and diseases
        const [remedyResponse, diseaseResponse] = await Promise.all([
          axios.get(`${url}/api/remediation/list`),
          axios.get(`${url}/api/disease/diseaseListWithoutRemedies`),
        ]);

        // Handling remedies data
        const allRemedies = remedyResponse.data;
        const lastWeekRemedies = allRemedies.filter((remedy) =>
          moment(remedy.updatedAt).isAfter(moment().subtract(7, 'days'))
        );

        setRemedies(lastWeekRemedies);
        setRemedyCount(lastWeekRemedies.length);
        setNewRemediesAdded(lastWeekRemedies.length);

        const groupedByDay = {};
        lastWeekRemedies.forEach((remedy) => {
          const remedyDate = moment(remedy.updatedAt).format('dddd');
          if (!groupedByDay[remedyDate]) {
            groupedByDay[remedyDate] = { count: 0, diseases: [] };
          }
          groupedByDay[remedyDate].count += 1;
          groupedByDay[remedyDate].diseases.push(remedy.diseaseName);
        });

        const dailyData = Object.keys(groupedByDay).map((day) => ({
          name: day,
          value: groupedByDay[day].count,
          diseases: groupedByDay[day].diseases,
        }));

        setDailyRemedies(dailyData);
        setUpdatedRemediesCount(lastWeekRemedies.length);

        // Handling diseases data
        setDiseasesWithoutRemedies(diseaseResponse.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Stop loading when fetching is complete
      }
    };

    fetchData();
  }, [url]);

  const handleAddRemedy = async (diseaseId) => {
    try {
      // Assuming you have an API to add a remedy, call it here
      // Replace with actual logic to add remedy
      await axios.post(`${url}/api/remediation/add`, { diseaseId });

      // After successfully adding a remedy, fetch diseases again to update the list
      const response = await axios.get(`${url}/api/disease/diseaseListWithoutRemedies`);
      setDiseasesWithoutRemedies(response.data.data); // Update the state with the new list
    } catch (error) {
      console.error('Error adding remedy:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-background">
        <div className="dashboard-content">
          <h1 className="dashboard-title">CROPSHIELD. <br />ADMIN - REMEDIATION MANAGEMENT</h1>

          <div className="summary-cards">
            <div className="summary-card">
              <h2>Total Remedies</h2>
              <p>{remedyCount}</p>
            </div>
            <div className="summary-card">
              <h2>New Remedies Added (Last Week)</h2>
              <p>{newRemediesAdded}</p>
            </div>
            <div className="summary-card">
              <h2>Updated Remedies</h2>
              <p>{updatedRemediesCount}</p>
            </div>
          </div>

          <div className="dashboard-links">
            <Link to="/AddNewRemedies" className="dashboard-link">Add New Remedy</Link>
            <Link to="/RemedyList" className="dashboard-link">Remedy Collection</Link>
            <Link to="/RemedyReport" className="dashboard-link">View Remedy Report</Link>
          </div>

          {/* Enhanced Diseases Without Remedies Section */}
          <div className="diseases-container">
            <h2>Diseases Without Remedies</h2>
            <div className="disease-card">
              {loading ? ( // Show loading state
                <p>Loading diseases...</p>
              ) : diseasesWithoutRemedies.length === 0 ? (
                <p>No newly added diseases without remedies.</p>
              ) : (
                <ul>
                  {diseasesWithoutRemedies.map((disease) => (
                    <li key={disease._id}>
                      {disease.diseaseName}
                      <button 
                        onClick={() => handleAddRemedy(disease._id)} 
                        className="add-remedy-button"
                      >
                        Add Remedy
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <RemediesPieChart dailyRemedies={dailyRemedies} />
        </div>
      </div>
    </div>
  );
};

export default TreatmentDashboard;
