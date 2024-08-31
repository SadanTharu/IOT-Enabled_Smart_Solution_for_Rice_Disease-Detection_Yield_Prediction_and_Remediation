import React from 'react';
import { Box, Typography, Container, Grid, Paper, Divider, Card, CardContent, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './About.css'; // Import external CSS file for additional styling

const teamMembers = [
    { name: 'Mr. De Silva U.M.T.K', itNumber: 'IT22886286', role: 'Remediation Manager', image: 'path/to/image1.jpg' },
    { name: 'Dias D.G.M', itNumber: 'IT87654321', role: 'Disease Manager', image: 'path/to/image2.jpg' },
    { name: 'Gamlath G.R.A.A', itNumber: 'IT11223344', role: 'Inquiery Manager', image: 'path/to/image3.jpg' },
    { name: 'Sadan M.D.T', itNumber: 'IT44332211', role: 'Yield Prediction Manager', image: 'path/to/image4.jpg' },
];

const About = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="lg" className="about-container">
            <Box textAlign="center" marginY={5}>
                <Typography variant="h3" component="h1" gutterBottom>
                    About Us
                </Typography>
                <Typography variant="h6" color="textSecondary">
                    Discover more about our mission, features, and the team behind the project.
                </Typography>
            </Box>

            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} className="about-section">
                        <Box padding={3}>
                            <Typography variant="h5" component="h2" gutterBottom>
                                Our Mission
                            </Typography>
                            <Divider />
                            <Typography variant="body1" paragraph>
                            At HealthConnect, our mission is to improve healthcare access and quality through innovative technology. We aim to make healthcare more accessible and efficient by using advanced technology to provide real-time solutions. Our focus is on creating user-friendly tools that empower both patients and healthcare professionals, breaking down barriers and enhancing patient outcomes. We are dedicated to fostering a connected and informed healthcare ecosystem, continually innovating to meet the evolving needs of the sector. Our goal is to make healthcare equitable and effective for everyone.
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper elevation={3} className="about-section">
                        <Box padding={3}>
                            <Typography variant="h5" component="h2" gutterBottom>
                                Key Features
                            </Typography>
                            <Divider />
                            <Typography variant="body1" paragraph>
                                <ul>
                                    <li><strong>Real-Time Updates:</strong> Get the latest information on health remedies and treatments.</li>
                                    <li><strong>Expert Advice:</strong> Access a wealth of knowledge from healthcare professionals.</li>
                                    <li><strong>User-Friendly Interface:</strong> Enjoy an intuitive and easy-to-navigate platform.</li>
                                    <li><strong>Personalized Recommendations:</strong> Receive tailored health advice and solutions based on your needs.</li>
                                </ul>
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper elevation={3} className="about-section">
                        <Box padding={3}>
                            <Typography variant="h5" component="h2" gutterBottom>
                                Meet the Team
                            </Typography>
                            <Divider />
                            <Typography variant="body1" paragraph>
                                Our team is composed of dedicated professionals committed to improving healthcare. We bring together experts in technology, healthcare, and user experience to create impactful solutions.
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper elevation={3} className="about-section">
                        <Box padding={3}>
                                           {/* Subtitle for Team Member Cards */}
                <Box textAlign="center" marginY={5}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Our Management Staff
                    </Typography>
                </Box>

                {/* Team Member Cards */}
                <Grid container spacing={4}>
                    {teamMembers.map((member, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card>
                                <CardMedia

                                    component="img"
                                    height="140"
                                    image={member.image}
                                    alt={member.name}
                                />
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        {member.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        IT Number: {member.itNumber}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Role: {member.role}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                        </Box>
                    </Paper>
                </Grid>
                

            </Grid>
        </Container>
    );
};

export default About;
