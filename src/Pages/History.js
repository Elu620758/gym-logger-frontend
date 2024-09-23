import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CustomNavbar from '../components/CustomNavbar';
import axios from 'axios';
import cardioIcon from '../images/cardio.png';
import resistanceIcon from '../images/resistance.png';
import aerobicIcon from '../images/aerobic.png';
import Footer from './Footer';

export default function History({ user }) {
  const userId = user._id;
  // console.log(userId);

  const [exerciseData, setExerciseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayedItems, setDisplayedItems] = useState(10);

  useEffect(() => {
    const fetchExerciseData = async () => {
      try {
        const aerobicResponse = await axios.get(`https://gymlogger-backend-app.onrender.com/aerobic/getAerobic/${userId}`);
        // console.log('Aerobic Exercise Data:', aerobicResponse.data);

        const resistanceResponse = await axios.get(`https://gymlogger-backend-app.onrender.com/resistance/getResistance/${userId}`);
        // console.log('Resistance Exercise Data:', resistanceResponse.data);

        const cardioResponse = await axios.get(`https://gymlogger-backend-app.onrender.com/cardio/getCardio/${userId}`);
        // console.log('Cardio Exercise Data:', cardioResponse.data);

        const combinedExerciseData = [
          ...(aerobicResponse.data || []),
          ...(Array.isArray(resistanceResponse.data) ? resistanceResponse.data : [resistanceResponse.data]),
          ...(Array.isArray(cardioResponse.data) ? cardioResponse.data : [cardioResponse.data]),
        ];

        setExerciseData(combinedExerciseData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching exercise data:', error);
        setError(error);
        setIsLoading(false);
      }
    };

    fetchExerciseData();
  }, [userId]);

  function showMoreItems() {
    setDisplayedItems(displayedItems + 3);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    
    <div className="history">
    <div className="history-page">
     <CustomNavbar style={{ color: 'blue' }} />

      <div className="d-flex flex-column align-items-center">
        <h2 className="title">History</h2>
        {exerciseData.length ? (
          <div className="history-data">
            {exerciseData.slice(0, displayedItems).map((exercise) => {
              let dateToDisplay = exercise.date;
              return (
                <div className="history-div d-flex" key={exercise._id}>
                  <div className="date d-flex align-items-center">{dateToDisplay}</div>
                  <Link className="text-decoration-none" to={`/history/${exercise.type}/${exercise._id}`}>
                    {exercise.type === 'cardio' ? (
                      <div className="history-card cardio-title d-flex">
                        <div className="d-flex align-items-center">
                          <img alt="cardio" src={cardioIcon} className="history-icon" />
                        </div>
                        <div>
                          <p className="history-name">{exercise.name}</p>
                          <p className="history-index">{exercise.distance} miles</p>
                        </div>
                      </div>
                    ) : exercise.type === 'resistance' ? (
                      <div className="history-card resistance-title d-flex">
                        <div className="d-flex align-items-center">
                          <img alt="resistance" src={resistanceIcon} className="history-icon" />
                        </div>
                        <div>
                          <p className="history-name">{exercise.name}</p>
                          <p className="history-index">{exercise.weight} lbs</p>
                        </div>
                      </div>
                    ) : exercise.type === 'aerobic' ? (
                      <div className="history-card aerobic-title d-flex">
                        <div className="d-flex align-items-center">
                          <img alt="aerobic" src={aerobicIcon} className="history-icon" />
                        </div>
                        <div>
                          <p className="history-name">{exercise.name}</p>
                          <p className="history-index">{exercise.caloriesBurned} calories</p>
                        </div>
                      </div>
                    ) : null}
                  </Link>
                </div>
              );
            })}
            {exerciseData.length > displayedItems ? (
              <div className="d-flex justify-content-center">
                <button className="show-btn" onClick={showMoreItems}>
                  Show More
                </button>
              </div>
            ) : null}
          </div>
        ) : (
          <div>
            <h3 className="history-text">No exercise data yet...</h3>
            <Link to="/allexcercisepage">
              <button className="home-btn">Add Exercise</button>
            </Link>
          </div>
          
        )}
        <Footer />
      </div>
     
      </div>
      
    </div>
  );
}
