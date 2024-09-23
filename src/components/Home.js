import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";


function Home() {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <div>
        <h1 className="head-title">
          <i className="fa-sharp fa-solid fa-heart-circle-bolt"></i>Fitness Logger
        </h1>
      </div>
      <Container className="home d-flex flex-column align-items-center justify-content-center flex-wrap text-center">
        <h1 className="home-title">
          Your Daily Workout<br />Partner
        </h1>
        <p className="home-text">
          Aerobic? Cardio? Resistance?<br />Track your daily exercises and stay fit
          with us.
        </p>
        <button className="home-btn" onClick={() => navigate("/login")}>
          Get started
        </button>
      </Container>
    </div>
  );
}

export default Home;
