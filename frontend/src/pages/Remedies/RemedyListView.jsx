import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    Box,
    TextField,
    IconButton,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ClearIcon from '@mui/icons-material/Clear';
import Skeleton from '@mui/material/Skeleton';
import './RemedyListView.css';

const RemedyListView = () => {
    const url = "http://localhost:4000";
    const [remedies, setRemedies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortOption, setSortOption] = useState('createdDate');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRemedies = async () => {
            try {
                const response = await axios.get(`${url}/api/remediation/list`);
                setRemedies(response.data);
            } catch (error) {
                setError('Failed to load remedies.');
                toast.error('Error fetching remedies: ' + error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchRemedies();
        window.scrollTo(0, 0);
    }, [url]);

    const formatDate = (dateString) => {
        if (!dateString) return 'No Date';
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const handleCardClick = (id) => {
        navigate(`/remedy-detail-view/${id}`);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const handleClearSearch = () => {
        setSearchTerm('');
    };

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    const sortRemedies = (remedies) => {
        const sortedRemedies = [...remedies]; // Create a copy of the remedies array
        switch (sortOption) {
            case 'alphabetical':
                return sortedRemedies.sort((a, b) => a.diseaseName.localeCompare(b.diseaseName));
            case 'createdDate':
                return sortedRemedies.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            case 'updatedDate':
                return sortedRemedies.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
            default:
                return sortedRemedies;
        }
    };

    const filteredRemedies = sortRemedies(remedies).filter((remedy) =>
        remedy.diseaseName.toLowerCase().includes(searchTerm)
    );

    return (
        <Box className="remedy-list-container" padding={3}>
            <Typography variant="h4" className="remedy-list-title">
                Explore Our Remedy Collection
            </Typography>

            <Box className="search-and-filter-container" marginY={2}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={8}>
                        <TextField
                            label="Search by Disease Name"
                            variant="outlined"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="search-bar"
                            fullWidth
                            InputProps={{
                                endAdornment: searchTerm && (
                                    <IconButton onClick={handleClearSearch} edge="end">
                                        <ClearIcon />
                                    </IconButton>
                                ),
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                            <InputLabel>Sort by</InputLabel>
                            <Select value={sortOption} onChange={handleSortChange}>
                                <MenuItem value="alphabetical">Alphabetical Order</MenuItem>
                                <MenuItem value="createdDate">Created Date</MenuItem>
                                <MenuItem value="updatedDate">Updated Date</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
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
                <Grid container spacing={3}>
                    {filteredRemedies.length ? (
                        filteredRemedies.map((remedy) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={remedy._id}>
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
                                            {remedy.symptoms.slice(0, 50)}...
                                        </Typography>
                                        <Box className="remedy-card-dates">
                                            <Typography variant="caption" className="remedy-card-date">
                                                Created At: {formatDate(remedy.createdAt)}
                                            </Typography>
                                            <Typography variant="caption" className="remedy-card-date">
                                                Updated At: {formatDate(remedy.updatedAt)}
                                            </Typography>
                                        </Box>

                                    </CardContent>
                                    <CardActions className="remedy-card-actions">
                                        <Button
                                            size="small"
                                            color="primary"
                                            className="remedy-card-button"
                                        >
                                            Learn More
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Typography variant="h6" textAlign="center" width="100%">
                            No remedies found.
                        </Typography>
                    )}
                </Grid>
            )}
        </Box>
    );
};

export default RemedyListView;
