import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './RemedyDetail.css'; 

const RemedyDetail = ({ url }) => {
    const { id } = useParams();
    const [remedy, setRemedy] = useState(null);

    useEffect(() => {
        const fetchRemedy = async () => {
            try {
                const response = await axios.get(`${url}/api/remediation/${id}`);
                setRemedy(response.data);
            } catch (error) {
                console.error('Error fetching remedy details:', error);
            }
        };

        fetchRemedy();
    }, [id, url]);

    if (!remedy) return <p>Loading...</p>;

    return (
        <div className="remedy-detail">
            <h2>{remedy.diseaseName}</h2>
            <p><strong>Symptoms:</strong> {remedy.symptoms}</p>
            <p><strong>Steps:</strong> {remedy.steps}</p>
            <p><strong>Materials:</strong> {remedy.materials}</p>
            <p><strong>YouTube Tutorial:</strong> <a href={remedy.youtubeTutorial} target="_blank" rel="noopener noreferrer">Watch here</a></p>
            <p><strong>Notes:</strong> {remedy.notes}</p>
        </div>
    );
};

export default RemedyDetail;
