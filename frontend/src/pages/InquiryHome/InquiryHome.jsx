import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './InquiryHome.css';
import InquiryHeader from '../InquiryHeader/InquiryHeader';

const InquiryHome = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const infoRef = useRef(null); // Create a ref for the 'Need more info?' section
    const location = useLocation(); // Get location state

    const toggleParagraph = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    useEffect(() => {
        if (location.state?.scrollTo === 'info') {
            // Scroll to the 'Need more info?' section if the state is present
            infoRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [location.state]);

    return (
        <div className='inquiry-home'>
            <InquiryHeader />
            <div className='inquiry-home-content'>
                <div className='support-main' ref={infoRef}>
                    <h2>Need more info?</h2>
                    <p>Looking for more information about our service? Here are some frequently asked questions. Hope these will help you to get more idea about us.</p>
                    <br /><br /><br />
                </div>
                <div className='faq-quiz'>
                    <h2>General Questions</h2><br /><br />

                    <h3 onClick={() => toggleParagraph(0)}>What is the purpose of this system?</h3><br />
                    <p className={activeIndex === 0 ? 'show' : ''}>The system is designed to assist farmers in managing crop diseases and predicting crop yields. It uses advanced algorithms and data analysis to provide valuable insights and recommendations.</p>
                    <br />
                    
                    <h3 onClick={() => toggleParagraph(1)}>How does the system work?</h3><br />
                    <p className={activeIndex === 1 ? 'show' : ''}>The system utilizes various inputs, such as weather data, soil conditions, crop variety, and disease symptoms, to analyze and predict potential disease outbreaks and crop yields.</p>
                    <br />
                    
                    <h3 onClick={() => toggleParagraph(2)}>Is this system compatible with all types of crops?</h3><br />
                    <p className={activeIndex === 2 ? 'show' : ''}>While the system can be adapted to various crops, it may be more effective for certain crops or regions due to data availability and specific disease patterns.</p>
                    <br /><br />

                    <h2>Disease Management</h2><br /><br />

                    <h3 onClick={() => toggleParagraph(3)}>How can I identify diseases using this system?</h3><br />
                    <p className={activeIndex === 3 ? 'show' : ''}>The system provides tools and resources to help identify diseases based on symptoms, images, and other relevant factors. You can compare observed symptoms to known disease patterns and receive potential diagnoses. If you cannot find the relevant disease to your symptoms, you can contact us via "New Disease?" and we will get in touch with you about that.</p>
                    <br />
                    
                    <h3 onClick={() => toggleParagraph(4)}>What kind of treatment recommendations does the system provide?</h3><br />
                    <p className={activeIndex === 4 ? 'show' : ''}>The system can suggest appropriate treatments, including chemical control, biological control, or cultural practices, based on the identified disease and local conditions.</p>
                    <br /><br />

                    <h2>Yield Prediction</h2><br /><br />

                    <h3 onClick={() => toggleParagraph(5)}>How accurate are the yield predictions provided by the system?</h3><br />
                    <p className={activeIndex === 5 ? 'show' : ''}>The accuracy of yield predictions depends on the quality and quantity of data input and the complexity of the crop and environmental factors. The system strives to provide reliable estimates based on available information.</p>
                    <br />
                    
                    <h3 onClick={() => toggleParagraph(6)}>Can I adjust the yield predictions based on my own observations or knowledge?</h3>
                    <p className={activeIndex === 6 ? 'show' : ''}>Yes, you can input additional data or modify existing data to refine the yield predictions according to your specific circumstances.</p>
                </div>
            </div>
        </div>
    );
}

export default InquiryHome;
