import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Box, TextField, CircularProgress, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ClearIcon from '@mui/icons-material/Clear';
import Skeleton from '@mui/material/Skeleton';
import Rating from '@mui/material/Rating'; 
import './RemedyListView.css';

const RemedyListView = ({ url }) => {
    const [remedies, setRemedies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRemedies = async () => {
            try {
                const response = await axios.get(`${url}/api/remediation`);
                setRemedies(response.data);
                localStorage.setItem('remedies', JSON.stringify(response.data));
            } catch (error) {
                console.error('Error fetching remedies:', error);
                setError('Failed to load remedies.');
                toast.error('Error fetching remedies: ' + error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchRemedies();

        
        window.scrollTo(0, 0);
    }, [url]);

    const handleCardClick = (id) => {
        navigate(`/remedy-detail-view/${id}`);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const handleClearSearch = () => {
        setSearchTerm('');
    };

    const filteredRemedies = remedies.filter(remedy =>
        remedy.diseaseName.toLowerCase().includes(searchTerm)
    );

    return (
        <Box className="remedy-list-container" padding={3}>
            <Typography variant="h4" className="remedy-list-title">
                Explore Our Remedy Collection
            </Typography>
            <Box className="search-bar-container" marginY={2}>
                <TextField
                    label="Search by Disease Name"
                    variant="outlined"
                    margin="normal"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-bar"
                    InputProps={{
                        endAdornment: searchTerm && (
                            <IconButton onClick={handleClearSearch} edge="end">
                                <ClearIcon />
                            </IconButton>
                        ),
                    }}
                    fullWidth
                />
            </Box>
            {loading ? (
                <Box className="loading-container">
                    <Skeleton variant="rectangular" width="100%" height={200} />
                    <Skeleton width="60%" />
                    <Skeleton width="40%" />
                </Box>
            ) : error ? (
                <Typography variant="body1" color="error">
                    {error}
                </Typography>
            ) : (
                <Box display="flex" flexWrap="wrap" gap={3} justifyContent="center">
                    {filteredRemedies.length ? (
                        filteredRemedies.map(remedy => (
                            <Box
                                key={remedy._id}
                                width={{ xs: '100%', sm: '45%', md: '30%' }}
                                maxWidth={300}
                            >
                                <Card className="remedy-card" onClick={() => handleCardClick(remedy._id)}>
                                    {remedy.image ? (
                                        <CardMedia
                                            component="img"
                                            image={remedy.image}
                                            alt={remedy.diseaseName}
                                            className="remedy-card-image"
                                        />
                                    ) : (
                                        <Box className="remedy-card-no-image" padding={2}>
                                            No image available
                                        </Box>
                                    )}
                                    <CardContent className="remedy-card-content">
                                        <Typography
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
                                    <CardActions className="remedy-card-actions" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Button
                                            size="small"
                                            className="remedy-card-button"
                                        >
                                            Learn More
                                        </Button>
                                        <Rating
                                            name={`rating-${remedy._id}`}
                                            value={remedy.rating || 0} // Display rating or default to 0
                                            readOnly
                                        />
                                    </CardActions>
                                </Card>
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

export default RemedyListView;
