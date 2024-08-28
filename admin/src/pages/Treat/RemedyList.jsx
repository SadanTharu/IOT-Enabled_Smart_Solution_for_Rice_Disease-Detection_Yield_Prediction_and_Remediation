import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Box } from '@mui/material';
import { toast } from 'react-toastify';
import './RemedyList.css';

const RemedyList = () => {
    const [remedies, setRemedies] = useState([]);

    const fetchRemedy = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/remediation');
            console.log('Fetched remedies:', response.data);
            setRemedies(response.data);
        } catch (error) {
            console.error('Error fetching remedies:', error);
            toast.error('Error fetching remedies: ' + error.message);
        }
    };

    useEffect(() => {
        fetchRemedy();
    }, []);

    const handleCardClick = (id) => {
        console.log('Card clicked with id:', id);
    };

    return (
        <Box className="remedy-list">
            {remedies.length ? (
                remedies.map(remedy => (
                    <Card
                        key={remedy._id}
                        className="remedy-card"
                        onClick={() => handleCardClick(remedy._id)}
                    >
                        {remedy.image ? (
                            <CardMedia
                                component="img"
                                className="remedy-card-image"
                                image={remedy.image || '/path/to/default-image.jpg'}
                                alt={remedy.diseaseName}
                            />
                        ) : (
                            <Box className="remedy-card-no-image">
                                No image available
                            </Box>
                        )}
                        <CardContent className="remedy-card-content">
                            <Typography
                                gutterBottom
                                variant="h6"
                                component="div"
                                className="remedy-card-title"
                            >
                                {remedy.diseaseName}
                            </Typography>
                            <Typography
                                variant="body2"
                                className="remedy-card-text"
                            >
                                {remedy.symptoms.slice(0, 100)}...
                            </Typography>
                        </CardContent>
                        <CardActions className="remedy-card-actions">
                            <Button
                                size="small"
                                className="remedy-card-button"
                                onClick={() => handleCardClick(remedy._id)}
                            >
                                Learn More
                            </Button>
                        </CardActions>
                    </Card>
                ))
            ) : (
                <p>No remedies found.</p>
            )}
        </Box>
    );
};

export default RemedyList;
