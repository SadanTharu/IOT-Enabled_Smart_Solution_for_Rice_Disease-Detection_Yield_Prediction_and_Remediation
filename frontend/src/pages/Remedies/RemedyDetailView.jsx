import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardContent, CardMedia, Button, CircularProgress, IconButton, Rating, Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './RemedyDetailView.css';

const RemedyDetailView = () => {

    const url = "http://localhost:4000"

    const { id } = useParams();
    const navigate = useNavigate();
    const [remedy, setRemedy] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [rating, setRating] = useState(0);

    useEffect(() => {
        const fetchRemedy = async () => {
            try {
                const response = await axios.get(`${url}/api/remediation/${id}`);
                setRemedy(response.data);
                if (response.data.rating) {
                    setRating(response.data.rating); // Set initial rating if available
                }
            } catch (error) {
                console.error('Error fetching remedy details:', error);
                setError(`Error: ${error.response?.data?.error || error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchRemedy();
    }, [id, url]);

    const handleRatingChange = async (event, newValue) => {
        setRating(newValue);
        try {
            await axios.patch(`${url}/api/remediation/${id}`, { rating: newValue });
        } catch (error) {
            console.error('Error updating rating:', error);
        }
    };

    if (loading) return (
        <Box className="loading-container">
            <CircularProgress size={60} className="loading-spinner" />
        </Box>
    );

    if (error) return (
        <Box className="error-container">
            <Typography variant="h6" color="error">{error}</Typography>
        </Box>
    );

    return (
        <Box className="remedy-detail-container" style={{ position: 'relative' }}>
            <Box position="absolute" top={-112} right={-100}>
                <IconButton aria-label="back" color="default" onClick={() => navigate(-1)}>
                    <ArrowBackIcon />
                </IconButton>
            </Box>
            <Card className="remedy-detail-card">
                <CardContent>
                    <br /><hr /><br />
                    <Typography variant="h4" component="div" className="remedy-detail-title" sx={{ fontWeight: 'bold', marginBottom: '16px' }}>
                        {remedy?.diseaseName}
                    </Typography>
                    <hr /><br /><br /><br />
                    <Grid container spacing={4}>
                        {/* First Column */}
                        <Grid item xs={12} md={6}>
                            {remedy?.image && (
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image={remedy.image}
                                    alt={remedy.diseaseName}
                                    className="remedy-detail-image"
                                />
                            )}
                            <br /><br />
                            <Typography variant="h6" component="div" className="remedy-detail-subtitle" sx={{ fontWeight: 'bold' }}>
                                Symptoms
                            </Typography>
                            <hr /><br />
                            <Typography variant="body1" className="remedy-detail-text">
                                {remedy?.symptoms.split('\n').map((line, index) => (
                                    <div key={index} style={{ marginBottom: '8px' }}>{line.trim()}</div>
                                ))}
                            </Typography>
                            <br />

                            <Typography variant="h6" component="div" className="remedy-detail-subtitle" sx={{ fontWeight: 'bold' }}>
                                Remediation Steps
                            </Typography>
                            <hr /><br />
                            <Typography variant="body1" className="remedy-detail-text">
                                {remedy?.steps.split('\n').map((line, index) => (
                                    <div key={index} style={{ marginBottom: '8px' }}>{line.trim()}</div>
                                ))}
                            </Typography>
                        </Grid>

                        {/* Second Column */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" component="div" className="remedy-detail-subtitle" sx={{ fontWeight: 'bold' }}>
                                Materials
                            </Typography>
                            <hr /><br />
                            <Typography variant="body1" className="remedy-detail-text">
                                {remedy?.materials.split('\n').map((line, index) => (
                                    <div key={index} style={{ marginBottom: '8px' }}>{line.trim()}</div>
                                ))}
                            </Typography>
                            <br />

                            <Typography variant="h6" component="div" className="remedy-detail-subtitle" sx={{ fontWeight: 'bold' }}>
                                YouTube Tutorial
                            </Typography>
                            <hr /><br /><br />
                            <Button
                                variant="contained"
                                style={{ backgroundColor: '#28a745', color: '#ffffff' }}
                                href={remedy?.youtubeTutorial}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="remedy-detail-button"
                            >
                                Watch Tutorial
                            </Button>
                            <br /><br /><br />

                            <Typography variant="h6" component="div" className="remedy-detail-subtitle" sx={{ fontWeight: 'bold' }}>
                                Notes
                            </Typography>
                            <hr /><br />
                            <Typography variant="body1" className="remedy-detail-text">
                                {remedy?.notes.split('\n').map((line, index) => (
                                    <div key={index} style={{ marginBottom: '8px' }}>{line.trim()}</div>
                                ))}
                            </Typography>

                            {/* Rating Section */}
                            <Box mt={4}>
                                <Typography variant="h6" component="div" className="remedy-detail-subtitle" sx={{ fontWeight: 'bold', color: '#28a745' }}>
                                    Rating
                                </Typography>
                                <hr /><br />
                                <Rating
                                    name="remedy-rating"
                                    value={rating}
                                    onChange={handleRatingChange}
                                    precision={0.5}
                                    size="medium"
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
};

export default RemedyDetailView;
