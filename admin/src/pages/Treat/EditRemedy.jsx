import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditRemedy.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton, Box, Grid, TextField, Button } from '@mui/material';

const EditRemedy = ({ url }) => {
    const { id } = useParams();
    const navigate = useNavigate();
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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRemedy = async () => {
            try {
                const response = await axios.get(`${url}/api/remediation/${id}`);
                setRemediation(response.data);
            } catch (error) {
                console.error('Error fetching remedy details:', error);
                setError(`Error: ${error.response?.data?.error || error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchRemedy();
    }, [id, url]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRemediation({ ...remediation, [name]: value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    // Form data fields validations
    const validate = () => {
        const newErrors = {};
        if (!remediation.diseaseName) newErrors.diseaseName = 'Disease name is required.';
        if (!remediation.symptoms) newErrors.symptoms = 'Symptoms are required.';
        if (!remediation.steps) newErrors.steps = 'Remediation steps are required.';
        if (!remediation.materials) newErrors.materials = 'Materials needed are required.';
        if (remediation.youtubeTutorial && !/^https?:\/\/.+/.test(remediation.youtubeTutorial)) {
            newErrors.youtubeTutorial = 'Invalid URL format.';
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

        console.log('Updating remediation with ID:', id);
        console.log('FormData:', formData);

        try {
            const response = await axios.put(`${url}/api/remediation/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            localStorage.removeItem('remedies');
            navigate(-1);
        } catch (error) {
            console.error('Error updating remediation:', error);
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="form-container">
            <Box position="absolute" top={90} right={60}>
                <IconButton aria-label="back" color="default" onClick={() => navigate(-1)}>
                    <ArrowBackIcon />
                </IconButton>
            </Box>

            <h2>Edit Remediation</h2>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Disease Name"
                            name="diseaseName"
                            value={remediation.diseaseName}
                            onChange={handleChange}
                            error={!!errors.diseaseName}
                            helperText={errors.diseaseName}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Symptoms"
                            name="symptoms"
                            value={remediation.symptoms}
                            onChange={handleChange}
                            error={!!errors.symptoms}
                            helperText={errors.symptoms}
                            multiline
                            rows={4}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Remediation Steps"
                            name="steps"
                            value={remediation.steps}
                            onChange={handleChange}
                            error={!!errors.steps}
                            helperText={errors.steps}
                            multiline
                            rows={4}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Materials Needed"
                            name="materials"
                            value={remediation.materials}
                            onChange={handleChange}
                            error={!!errors.materials}
                            helperText={errors.materials}
                            multiline
                            rows={4}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="YouTube Tutorial (URL)"
                            name="youtubeTutorial"
                            value={remediation.youtubeTutorial}
                            onChange={handleChange}
                            error={!!errors.youtubeTutorial}
                            helperText={errors.youtubeTutorial}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Notes/Warnings"
                            name="notes"
                            value={remediation.notes}
                            onChange={handleChange}
                            multiline
                            rows={4}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <div className="button-group">
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: '#28a745',
                                    '&:hover': {
                                        backgroundColor: '#218838',
                                    },
                                }}
                                type="submit"
                                className="submit-button"
                            >
                                Update Remediation
                            </Button>
                            <Button
                                variant="outlined"
                                sx={{
                                    backgroundColor: '#6c757d',
                                    color: 'white', 
                                    '&:hover': {
                                        backgroundColor: '#5a6268', 
                                        color: 'white', 
                                    },
                                }}
                                type="button"
                                className="cancel-button"
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default EditRemedy;
