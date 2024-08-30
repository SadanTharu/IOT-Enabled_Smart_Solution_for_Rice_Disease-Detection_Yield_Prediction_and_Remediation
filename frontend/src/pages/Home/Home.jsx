import React, { useState } from 'react';
import "./Home.css";
import Header from '../../components/Header/Header';
import FoodDisplay from '../../components/FoodDisplay/foodDisplay';
import AppDownload from '../../components/AppDownload/AppDownload';
import ChatBot from '../../components/ChatBot/chatBot';
import Prediction from '../../components/Prediction/Prediction';

const Home = () => {
  
  const [category,setCategory] = useState("All");
  
  return (
    <div>
      <Header/>
      <Prediction/>
      <FoodDisplay category={category}/>
      <AppDownload/>
      <ChatBot/>
    </div>
  )
}

export default Home
