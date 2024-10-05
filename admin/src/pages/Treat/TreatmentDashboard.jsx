import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch remedies and diseases without remedies simultaneously
                const [remedyResponse, diseaseResponse] = await Promise.all([
                    axios.get(`${url}/api/remediation/list`),
                    axios.get(`${url}/api/disease/diseaseListWithoutRemedies`),
                ]);

                // Handle remedies data
                const allRemedies = remedyResponse.data;
                setRemedies(allRemedies);

                // Remedies added in the last week
                const lastWeekRemedies = allRemedies.filter((remedy) =>
                    moment(remedy.updatedAt).isAfter(moment().subtract(7, 'days'))
                );
                setRemedyCount(allRemedies.length);
                setNewRemediesAdded(lastWeekRemedies.length);

                // Group remedies by day for daily remedies chart
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

                // Fetch diseases without remedies
                const diseasesWithoutRemedy = diseaseResponse.data.data;

                // Filter out diseases that already have a remedy
                const filteredDiseases = diseasesWithoutRemedy.filter(
                    disease => !allRemedies.some(remedy => remedy.diseaseName === disease.diseaseName)
                );
                setDiseasesWithoutRemedies(filteredDiseases);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    const handleAddRemedy = (disease) => {
        navigate('/AddNewRemedies', { state: { diseaseName: disease.diseaseName } });
        setDiseasesWithoutRemedies((prev) => prev.filter(item => item._id !== disease._id));
    };

    const viewmsg = () => {
        navigate('/msgList');
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

                    <div className="diseases-container">
                        <h2>Diseases Without Remedies</h2>
                        <div className="disease-card">
                            {loading ? (
                                <p>Loading diseases...</p>
                            ) : diseasesWithoutRemedies.length === 0 ? (
                                <p>All diseases have remedies.</p>
                            ) : (
                                <ul>
                                    {diseasesWithoutRemedies.map((disease) => (
                                        <li key={disease._id}>
                                            <strong>{disease.diseaseName}</strong>: {disease.symptoms}
                                            <button
                                                onClick={() => handleAddRemedy(disease)}
                                                className="add-remedy-button"
                                            >
                                                <p>Add Remedy</p>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    <RemediesPieChart dailyRemedies={dailyRemedies} />
                    <button onClick={viewmsg} className="add-remedy-button">
                        Disease Updates from Disease Management
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TreatmentDashboard;
