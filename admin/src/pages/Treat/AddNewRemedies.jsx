import React, { useState } from 'react';
import axios from 'axios';
import './AddNewRemedies.css';

const AddNewRemedies = () => {
    const [remediation, setRemediation] = useState({
        diseaseName: '',
        symptoms: '',
        steps: '',
        materials: '',
        youtubeTutorial: '',
        notes: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRemediation({ ...remediation, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/remediations', remediation);
            console.log('Remediation added:', response.data);
            // Clear the form or give feedback to the user
            setRemediation({
                diseaseName: '',
                symptoms: '',
                steps: '',
                materials: '',
                youtubeTutorial: '',
                notes: '',
            });
        } catch (error) {
            console.error('Error adding remediation:', error);
        }
    };

    return (
        <div className="form-container">
            <h2>Add New Remediation</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Disease Name:</label>
                    <input
                        type="text"
                        name="diseaseName"
                        value={remediation.diseaseName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Symptoms:</label>
                    <textarea
                        name="symptoms"
                        value={remediation.symptoms}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Remediation Steps:</label>
                    <textarea
                        name="steps"
                        value={remediation.steps}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Materials Needed:</label>
                    <textarea
                        name="materials"
                        value={remediation.materials}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>YouTube Tutorial (URL):</label>
                    <input
                        type="url"
                        name="youtubeTutorial"
                        value={remediation.youtubeTutorial}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Notes/Warnings:</label>
                    <textarea
                        name="notes"
                        value={remediation.notes}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="submit-button">Add Remediation</button>
            </form>
        </div>
    );
};

export default AddNewRemedies;