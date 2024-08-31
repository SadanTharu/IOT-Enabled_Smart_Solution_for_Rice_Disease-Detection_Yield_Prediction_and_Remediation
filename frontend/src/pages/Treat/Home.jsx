import React, { useRef, useEffect } from 'react';
import { Box, Typography, Button, Card, CardContent, CardMedia, Container, Avatar, Divider } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { assets } from '../../assets/assets';
import './Home.css';

const Home = () => {
  const featuresRef = useRef(null);
  const navigate = useNavigate();

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Scroll to top when the component is mounted
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box>
      <Navbar />

      {/* Hero Section */}
      <Box className="hero-section">
        {/* Background Video */}
        <video className="hero-video" autoPlay loop muted playsInline>
          <source src={assets.rice_field} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay for Gradient and Text */}
        <Box className="hero-overlay">
          <Typography variant="h2" className="hero-title">
            CROP SHIELD
          </Typography>
          <Typography variant="h6" className="hero-subtitle">
            Protect your crops with expert solutions, ensuring a healthier and more productive harvest.
          </Typography>
          <Button className="hero-button" variant="contained" color="none" onClick={scrollToFeatures}>
            Get Started
          </Button>
        </Box>
      </Box>

      {/* Features Section */}
      <Container className="features-section" ref={featuresRef}>
        <Typography variant="h4" gutterBottom className="features-title">
          Our Key Features
        </Typography>
        <Divider className="features-divider" variant="middle" />
        <Box display="flex" flexWrap="wrap" justifyContent="center" gap={4}>
          {[
            { title: "Disease Identification", description: "Quickly identify rice diseases using our comprehensive databa", image: assets.rice01, link: "/disease-identification" },
            { title: "Expert Remedies", description: "Access expert-recommended remedies for effective disease management.", image: assets.rice02, link: "/RemedyListView" },
            { title: "Community Support", description: "Join our community for support and share your experiences with fellow farmers.", image: assets.rice03, link: "/community-support" },
            { title: "Harvest Prediction", description: "Utilize advanced algorithms to predict your rice yield based on various factors such as weather, soil conditions, and crop health. Make informed decisions to maximize your harvest and optimize your resources.", image: assets.rice04, link: "/harvest-prediction" }
          ].map((feature, index) => (
            <Box
              key={index}
              width={{ xs: '100%', sm: '45%', md: '30%' }}
              maxWidth={300}
            >
              <Card className="feature-card">
                <Link to={feature.link} style={{ textDecoration: 'none' }}>
                  <CardMedia
                    component="img"
                    height="160"
                    image={feature.image}
                    alt={feature.title}
                  />
                  <CardContent sx={{ padding: '20px' }}>
                    <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ marginTop: '10px' }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Link>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>

      {/* 
      users word Section */}
      <Box className="testimonials-section">
        <Container>
          <Typography variant="h4" gutterBottom className="testimonials-title">
            What Our Users Say
          </Typography>
          <Divider className="testimonials-divider" variant="middle" />
          <Box display="flex" flexWrap="wrap" justifyContent="center" gap={4}>
            {[
              { name: "Mr. W.A.A.I Wijesuriya", quote: "This platform has significantly improved our ability to manage rice diseases. The expert remedies are spot on!", avatar: "/path/to/avatar1.jpg" },
              { name: "Mr. T.H.N.M Thenuwara", quote: "The community support feature has connected me with fellow farmers who share their knowledge and experiences.", avatar: "/path/to/avatar2.jpg" },
            ].map((testimonial, index) => (
              <Box
                key={index}
                width={{ xs: '100%', sm: '45%', md: '30%' }}
                maxWidth={300}
                padding={2}
              >
                <Card className="testimonial-card">
                  <Avatar 
                    src={testimonial.avatar} 
                    className="testimonial-avatar"
                    sx={{ width: 60, height: 60 }}
                  />
                  <Typography variant="h6" sx={{ marginTop: '20px', fontWeight: 'bold' }}>
                    {testimonial.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ marginTop: '15px' }}>
                    "{testimonial.quote}"
                  </Typography>
                </Card>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box className="call-to-action-section" sx={{ backgroundColor: '#e9ffdd' }}>
        <Typography variant="h4" gutterBottom className="call-to-action-title">
          Ready to Protect Your Rice?
        </Typography>
        <Button className="call-to-action-button" variant="contained" color="primary" sx={{ backgroundColor: '#115f1d' }}>
          Contact Us
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
