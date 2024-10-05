import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DiseaseDetail = ({ url }) => {
    const { id } = useParams(); // Get the disease ID from the URL
    const [disease, setDisease] = useState(null);
    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDiseaseDetails = async () => {
            try {
                const response = await axios.get(`${url}/api/disease/diseasedata/${id}`);
                setDisease(response.data.data);
            } catch (err) {
                setError('Failed to fetch disease details');
            } finally {
                setLoading(false);
            }
        };
    
        fetchDiseaseDetails();
    }, [id, url]);
    
    if (loading) {
        return <p>Loading disease details...</p>;
    }
    
    if (error) {
        return <p>{error}</p>;  // Display error message
    }

    return (
        <div>
            <h2>{disease.diseaseName}</h2>
            <img src={`/uploads/${disease.image}`} alt={disease.diseaseName} />
            <p><strong>Symptoms:</strong> {disease.symptoms}</p>
            <p><strong>Severity Level:</strong> {disease.severityLevel}</p>
            <p><strong>Category:</strong> {disease.category}</p>
            {/* Add more details as needed */}
        </div>
    );
};

export default DiseaseDetail;
