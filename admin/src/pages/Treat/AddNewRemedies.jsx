import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
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
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRemediation({ ...remediation, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        //Image Type, size validation
        if (file) {
            if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    image: 'Invalid file type. Only JPEG, PNG, and GIF are allowed.',
                }));
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    image: 'File size exceeds 5MB limit.',
                }));
                return;
            }
            setImage(file);
            setErrors((prevErrors) => ({
                ...prevErrors,
                image: '',
            }));
        }
    };

    //Form Data field Validations
    const validate = () => {
        const newErrors = {};
        if (!remediation.diseaseName) newErrors.diseaseName = 'Disease name is required.';
        if (!remediation.symptoms) newErrors.symptoms = 'Symptoms are required.';
        if (!remediation.steps) newErrors.steps = 'Remediation steps are required.';
        if (!remediation.materials) newErrors.materials = 'Materials needed are required.';
        if (remediation.youtubeTutorial && !/^https?:\/\/.+/.test(remediation.youtubeTutorial)) {
            newErrors.youtubeTutorial = 'Invalid URL format. Please enter a valid URL.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        const formData = new FormData();
        formData.append('diseaseName', remediation.diseaseName);
        formData.append('symptoms', remediation.symptoms);
        formData.append('steps', remediation.steps);
        formData.append('materials', remediation.materials);
        formData.append('youtubeTutorial', remediation.youtubeTutorial || ''); 
        formData.append('notes', remediation.notes || '');
        if (image) {
            formData.append('image', image);
        }

        try {
            console.log('Submitting data:', remediation);
            const response = await axios.post('http://localhost:4000/api/remediation/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Response:', response.data);

            toast.success('Remediation added successfully!', {
                autoClose: 1000,
                onClose: () => {
                    navigate('/RemedyList');
                }
            });

            setRemediation({
                diseaseName: '',
                symptoms: '',
                steps: '',
                materials: '',
                youtubeTutorial: '',
                notes: '',
            });
            setImage(null);
            setErrors({});
        } catch (error) {
            console.error('Error response:', error.response);
            toast.error('Error adding remediation: ' + (error.response ? error.response.data.error : error.message));
        }
    };

    const handleCancel = () => {
        navigate('/RemedyList');
    };

    return (
        <div className="form-container">
            <h2>Add New Remediation</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="diseaseName">Disease Name:</label>
                    <input
                        type="text"
                        name="diseaseName"
                        id="diseaseName" 
                        value={remediation.diseaseName}
                        onChange={handleChange}
                        placeholder="Enter disease name" 
                    />
                    {errors.diseaseName && <p className="error-text">{errors.diseaseName}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="symptoms">Symptoms:</label>
                    <textarea
                        name="symptoms"
                        id="symptoms" 
                        value={remediation.symptoms}
                        onChange={handleChange}
                        placeholder="Enter symptoms here..." 
                    />
                    {errors.symptoms && <p className="error-text">{errors.symptoms}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="steps">Remediation Steps:</label>
                    <textarea
                        name="steps"
                        id="steps" 
                        value={remediation.steps}
                        onChange={handleChange}
                        placeholder="Outline the remediation steps..."
                    />
                    {errors.steps && <p className="error-text">{errors.steps}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="materials">Materials Needed:</label>
                    <textarea
                        name="materials"
                        id="materials" 
                        value={remediation.materials}
                        onChange={handleChange}
                        placeholder="List materials needed..."
                    />
                    {errors.materials && <p className="error-text">{errors.materials}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="youtubeTutorial">YouTube Tutorial (URL):</label>
                    <input
                        type="text"
                        name="youtubeTutorial"
                        id="youtubeTutorial" 
                        value={remediation.youtubeTutorial}
                        onChange={handleChange}
                        placeholder="Enter a valid URL..."
                    />
                    {errors.youtubeTutorial && <p className="error-text">{errors.youtubeTutorial}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="notes">Notes/Warnings:</label>
                    <textarea
                        name="notes"
                        id="notes" 
                        value={remediation.notes}
                        onChange={handleChange}
                        placeholder="Any additional notes..." 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Upload Image:</label>
                    <input
                        type="file"
                        name="image"
                        id="image" 
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    {errors.image && <p className="error-text">{errors.image}</p>}
                </div>
                <div className="button-group">
                    <button type="submit" className="submit-button">Add Remediation</button>
                    <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default AddNewRemedies;
