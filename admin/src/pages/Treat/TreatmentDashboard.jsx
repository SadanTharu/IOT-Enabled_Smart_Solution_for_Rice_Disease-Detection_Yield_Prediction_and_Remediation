import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './TreatmentDashboard.css'; // Import the CSS file
import axios from 'axios'; // Import Axios for API calls
import moment from 'moment'; // Import moment.js for date handling
import RemediesPieChart from './RemediesPieChart'; // Import the new component

const TreatmentDashboard = ({ url }) => {
  const [remedies, setRemedies] = useState([]);
  const [remedyCount, setRemedyCount] = useState(0);
  const [newRemediesAdded, setNewRemediesAdded] = useState(0);
  const [updatedRemediesCount, setUpdatedRemediesCount] = useState(0);
  const [dailyRemedies, setDailyRemedies] = useState([]);

  useEffect(() => {
    const fetchRemedies = async () => {
      try {
        const response = await axios.get(`${url}/api/remediation/list`); // Adjust the URL as needed
        const allRemedies = response.data;

        // Filter remedies updated in the last week
        const lastWeekRemedies = allRemedies.filter((remedy) =>
          moment(remedy.updatedAt).isAfter(moment().subtract(7, 'days'))
        );

        setRemedies(lastWeekRemedies); // Set filtered remedies
        setRemedyCount(lastWeekRemedies.length); // Total remedy count

        // Set the count for new remedies added in the last week
        setNewRemediesAdded(lastWeekRemedies.length);

        // Group remedies by day of the week
        const groupedByDay = {};
        lastWeekRemedies.forEach((remedy) => {
          const remedyDate = moment(remedy.updatedAt).format('dddd'); // Get the day of the week

          if (!groupedByDay[remedyDate]) {
            groupedByDay[remedyDate] = {
              count: 0,
              diseases: []
            };
          }
          groupedByDay[remedyDate].count += 1; // Increment the count for this day
          groupedByDay[remedyDate].diseases.push(remedy.diseaseName); // Add disease name to the array
        });

        // Prepare the data to be displayed on the chart
        const dailyData = Object.keys(groupedByDay).map((day) => ({
          name: day,
          value: groupedByDay[day].count,
          diseases: groupedByDay[day].diseases // Pass the array of disease names directly
        }));

        setDailyRemedies(dailyData);
        setUpdatedRemediesCount(lastWeekRemedies.length); // Set updated remedies count
      } catch (error) {
        console.error('Error fetching remedies:', error);
      }
    };

    fetchRemedies();
  }, [url]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-background">
        <div className="dashboard-content">
          <h1 className="dashboard-title">CROPSHIELD. <br />ADMIN - REMEDIATION MANAGEMENT</h1>

          {/* Summary Cards */}
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
          <br />

          {/* Navigation Links */}
          <div className="dashboard-links">
            <Link to="/AddNewRemedies" className="dashboard-link">
              Add New Remedy
            </Link>
            <Link to="/RemedyList" className="dashboard-link">
              Remedy Collection
            </Link>
            <Link to="/RemedyReport" className="dashboard-link">
              View Remedy Report
            </Link>
          </div>
<br />
          {/* Use the new Pie Chart Component */}
          <RemediesPieChart dailyRemedies={dailyRemedies} />
        </div>
      </div>
    </div>
  );
};

export default TreatmentDashboard;
