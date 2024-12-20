import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, TextField, CircularProgress, Button, IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from 'react-router-dom';
import './RemedyList.css';

const RemedyList = ({ url, setExistingDiseaseNames }) => {
    const [remedies, setRemedies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchRemedies = async () => {
        try {
            const response = await axios.get(`${url}/api/remediation/list`);
            setRemedies(response.data);
            localStorage.setItem('remedies', JSON.stringify(response.data));
        } catch (error) {
            console.error('Error fetching remedies:', error);
            // Removed toast message
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRemedies();
    }, []);

    const handleRemedyClick = (id) => {
        navigate(`/remedy/${id}`);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const handleDeleteRemedy = async (id) => {
        try {
            await axios.delete(`${url}/api/remediation/${id}`);
            fetchRemedies();
        } catch (error) {
            console.error('Error deleting remedy:', error);
            // Removed toast message
        }
    };

    const handleAddRemedy = () => {
        navigate('/AddNewRemedies');
    };

    // Filter remedies based on search term
    const filteredRemedies = remedies.filter(remedy =>
        remedy.diseaseName.toLowerCase().includes(searchTerm)
    );

    return (
        <Box className="remedy-list-container">
            <Box className="header-container">
                <Typography variant="h4">Remedy Collection</Typography>
                <IconButton
                    color="primary"
                    aria-label="add remedy"
                    onClick={handleAddRemedy}
                    className="add-remedy-button"
                >
                    <AddCircleIcon fontSize="large" />
                </IconButton>
            </Box>
            <Box className="search-bar-container">
                <TextField
                    label="Search by Disease Name"
                    variant="outlined"
                    margin="normal"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-bar"
                />
            </Box>
            {loading ? (
                <Box className="loading-container">
                    <CircularProgress className="loading-spinner" />
                </Box>
            ) : (
                <Box className="remedy-list">
                    {filteredRemedies.length ? (
                        filteredRemedies.map(remedy => (
                            <Box
                                key={remedy._id}
                                className="remedy-list-item"
                                onClick={() => handleRemedyClick(remedy._id)}
                            >
                                <Box className="remedy-list-image-container">
                                    {remedy.image ? (
                                        <img
                                            src={remedy.image}
                                            alt={remedy.diseaseName}
                                            className="remedy-list-image"
                                        />
                                    ) : (
                                        <Box className="remedy-list-no-image">
                                            No image available
                                        </Box>
                                    )}
                                </Box>
                                <Box className="remedy-list-info">
                                    <Typography
                                        variant="h6"
                                        className="remedy-list-title"
                                    >
                                        {remedy.diseaseName}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        className="remedy-list-text"
                                    >
                                        {remedy.symptoms.slice(0, 100)}...
                                    </Typography>
                                </Box>
                                <Box className="remedy-list-action">
                                    <Button
                                        size="small"
                                        className="remedy-list-button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleRemedyClick(remedy._id);
                                        }}
                                    >
                                        Learn More
                                    </Button>
                                    <Button
                                        size="small"
                                        className="remedy-list-button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteRemedy(remedy._id);
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </Box>
                            </Box>
                        ))
                    ) : (
                        <Typography>No remedies found.</Typography>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default RemedyList;
