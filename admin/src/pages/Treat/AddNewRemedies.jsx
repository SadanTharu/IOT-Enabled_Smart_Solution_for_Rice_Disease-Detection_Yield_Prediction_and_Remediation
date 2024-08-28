import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    const [image, setImage] = useState(null); // State for the selected image

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRemediation({ ...remediation, [name]: value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]); // Update state with the selected image file
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(); // Use FormData to handle file uploads
        formData.append('diseaseName', remediation.diseaseName);
        formData.append('symptoms', remediation.symptoms);
        formData.append('steps', remediation.steps);
        formData.append('materials', remediation.materials);
        formData.append('youtubeTutorial', remediation.youtubeTutorial);
        formData.append('notes', remediation.notes);
        if (image) {
            formData.append('image', image); // Append image file
        }

        try {
            console.log('Submitting data:', remediation); // Log the data being sent
            const response = await axios.post('http://localhost:4000/api/remediation', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set the content type for file upload
                },
            });
            console.log('Response:', response.data); // Log the response
            toast.success('Remediation added successfully!');
            // Clear the form after successful submission
            setRemediation({
                diseaseName: '',
                symptoms: '',
                steps: '',
                materials: '',
                youtubeTutorial: '',
                notes: '',
            });
            setImage(null); // Clear the image state
        } catch (error) {
            console.error('Error response:', error.response); // Log the full error response
            toast.error('Error adding remediation: ' + (error.response ? error.response.data.error : error.message));
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
                <div className="form-group">
                    <label>Upload Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>
                <button type="submit" className="submit-button">Add Remediation</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default AddNewRemedies;
