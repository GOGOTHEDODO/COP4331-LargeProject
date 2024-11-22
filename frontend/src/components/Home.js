import React from "react";
import "../styles/Home.scss";

const Home = () => {
  return (
    <div className="home-container">
      <div className="welcome-box">
        <h1>Welcome to Fitness Tracker</h1>
        <p>Track your progress, plan your workouts, and achieve your goals.</p>
        <button className="get-started-btn">Get Started</button>
      </div>
    </div>
  );
};

export default Home;
