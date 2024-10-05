import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MsgList.css'; 

const MsgList = ({ url }) => {
    const [remedies, setRemedies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRemedies = async () => {
            try {
                const response = await axios.get(`${url}/api/contactRemedy/messages`); 
                setRemedies(response.data.reverse()); // Reverse to display latest first
            } catch (error) {
                console.error("Error fetching remedies:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRemedies();
    }, [url]); 

    const handleDeleteMessage = async (id) => {
        try {
            await axios.delete(`${url}/api/contactRemedy/messages/${id}`);
            // Remove the deleted message from the UI by filtering it out
            setRemedies(remedies.filter(remedy => remedy._id !== id));
        } catch (error) {
            console.error("Error deleting message:", error);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="chat-container">
            <h2>All Messages From Disease Admin</h2>
            {remedies.length === 0 ? (
                <p>No remedies found.</p>
            ) : (
                <div className="chat-messages"> 
                    {remedies.map(remedy => (
                        <div key={remedy._id} className="chat-bubble"> 
                            <h3>{remedy.newDiseaseName}</h3>
                            <p><strong>Symptoms:</strong> {remedy.symptoms}</p>
                            <p><strong>Severity Level:</strong> {remedy.severityLevel}</p>
                            <p><strong>Category:</strong> {remedy.category}</p>
                            <p><strong>Recommended Treatment:</strong> {remedy.recomendedTreatment}</p>
                            <img src={`http://localhost:4000/uploads/${remedy.image}`} alt={remedy.newDiseaseName} className="remedy-image" />
                            {/* Delete Button */}
                            <button 
                                className="delete-button" 
                                onClick={() => handleDeleteMessage(remedy._id)}
                            >
                                Delete Message
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MsgList;
