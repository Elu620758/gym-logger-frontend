import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CustomNavbar from '../components/CustomNavbar';
import aerobicIcon from '../images/aerobic.png';
import cardioIcon from '../images/cardio.png';
import resistanceIcon from '../images/resistance.png';
import axios from 'axios';

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export default function SingleExercise({ user }) {
  const { id, type } = useParams();
  const [exerciseData, setExerciseData] = useState({});
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [editedExercise, setEditedExercise] = useState({
    name: '',
    distance: '',
    duration: '',
    weight: '',
    sets: '',
    reps: '',
    heartRate: '',
    caloriesBurned: '',
  });

  useEffect(() => {
    const fetchExerciseData = async () => {
      try {
        const userResponse = await axios.get(`https://gymlogger-backend-app.onrender.com/users/userId`);
        const userData = userResponse.data.data;

        if (userData.length > 0) {
          const fetchedUserId = user._id;

          const apiEndpoint =
            type === 'aerobic'
              ? `https://gymlogger-backend-app.onrender.com/aerobic/getAerobic/${fetchedUserId}`
              : type === 'cardio'
                ? `https://gymlogger-backend-app.onrender.com/cardio/getCardio/${fetchedUserId}`
                : type === 'resistance'
                  ? `https://gymlogger-backend-app.onrender.com/resistance/getResistance/${fetchedUserId}`
                  : null;

          if (apiEndpoint) {
            const exerciseResponse = await axios.get(apiEndpoint);
            const exerciseData = exerciseResponse.data;

            if (exerciseData.length > 0) {
              // Assuming you want the exercise with the specified id
              const targetExercise = exerciseData.find((exercise) => exercise._id === id);

              if (targetExercise) {
                setExerciseData(targetExercise);

                setEditedExercise({
                  name: targetExercise.name,
                  distance: targetExercise.distance || '',
                  duration: targetExercise.duration || '',
                  weight: targetExercise.weight || '',
                  sets: targetExercise.sets || '',
                  reps: targetExercise.reps || '',
                  heartRate: targetExercise.heartRate || '', // Fetch heartRate from API
                  caloriesBurned: targetExercise.caloriesBurned || '', // Fetch caloriesBurned from API
                });
              }
            }
          }
        } else {
          // console.error('No user data found.');
        }
      } catch (error) {
        // console.error('Error fetching data:', error);
      }
    };

    fetchExerciseData(); // Call the fetchExerciseData function
  }, [type, id, user._id]);

  const handleDeleteExercise = async () => {
    try {
      const apiEndpoint =
        type === 'aerobic'
          ? `https://gymlogger-backend-app.onrender.com/aerobic/deleteAerobic/${id}`
          : type === 'cardio'
            ? `https://gymlogger-backend-app.onrender.com/cardio/deleteCardio/${id}`
            : type === 'resistance'
              ? `https://gymlogger-backend-app.onrender.com/resistance/deleteResistance/${id}`
              : null;

      if (apiEndpoint) {
        const response = await axios.delete(apiEndpoint);

        if (response.status === 200) {
          // console.log(`${type} exercise deleted successfully`);
          navigate('/history/:userId');
        } else {
          // console.error(`Failed to delete ${type} exercise`);
        }
      }
    } catch (error) {
      // console.error(`Error deleting ${type} exercise:`, error);
    }
  };

  const handleEditExercise = () => {
    setIsEditing(true);
  };

  const handleSaveExercise = async () => {
    try {
      const apiEndpoint =
        type === 'aerobic'
          ? `https://gymlogger-backend-app.onrender.com/aerobic/updateAerobic/${id}`
          : type === 'cardio'
            ? `https://gymlogger-backend-app.onrender.com/cardio/updateCardio/${id}`
            : type === 'resistance'
              ? `https://gymlogger-backend-app.onrender.com/resistance/updateResistance/${id}`
              : null;

      if (apiEndpoint) {
        const updatedExerciseData = {
          ...exerciseData,
          name: editedExercise.name,
          distance: editedExercise.distance,
          duration: editedExercise.duration,
          weight: editedExercise.weight,
          sets: editedExercise.sets,
          reps: editedExercise.reps,
          heartRate: editedExercise.heartRate,
          caloriesBurned: editedExercise.caloriesBurned,
        };

        await axios.patch(apiEndpoint, updatedExerciseData);

        setExerciseData(updatedExerciseData);
        setIsEditing(false);
      }
    } catch (error) {
      // console.error(`Error updating ${type} exercise:`, error);
    }
  };

  return (
    <div className={type === 'aerobic' ? 'single-aerobic' : type === 'cardio' ? 'single-cardio' : 'single-resistance'}>
      <CustomNavbar />
      <h2 className="title text-center">Exercise Details</h2>
      <div className="single-exercise d-flex flex-column align-items-center text-center">
        {type === 'aerobic' && Object.keys(exerciseData).length > 0 && (
          <div className="aerobic-div">
            {isEditing ? (
              <div>
                <input
                  type="number"
                  placeholder="Heart Rate"
                  value={editedExercise.heartRate}
                  onChange={(e) =>
                    setEditedExercise({ ...editedExercise, heartRate: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="Calories Burned"
                  value={editedExercise.caloriesBurned}
                  onChange={(e) =>
                    setEditedExercise({ ...editedExercise, caloriesBurned: e.target.value })
                  }
                />
                <button className="save-btn" onClick={handleSaveExercise}>
                  Save Exercise
                </button>
              </div>
            ) : (
              <div>
                <img alt="aerobic" src={aerobicIcon} className="exercise-form-icon" />
                <p>
                  <span>Date: </span> {formatDate(exerciseData.date)}
                </p>
                <p>
                  <span>Name: </span> {exerciseData.name}
                </p>
                <p>
                  <span>Heart Rate: </span> {exerciseData.heartRate} beats
                </p>
                <p>
                  <span>Calories Burned: </span> {exerciseData.caloriesBurned} calories
                </p>
                <button className="edit-btn" onClick={handleEditExercise}>
                  Edit Exercise
                </button>
                <button className="delete-btn" onClick={handleDeleteExercise}>
                  Delete Exercise
                </button>
              </div>
            )}
          </div>
        )}

        {type === 'cardio' && Object.keys(exerciseData).length > 0 && (
          <div className="cardio-div">
            {isEditing ? (
              <div>
                <input
                  type="text"
                  placeholder="Exercise Name"
                  value={editedExercise.name}
                  onChange={(e) =>
                    setEditedExercise({ ...editedExercise, name: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="Distance (miles)"
                  value={editedExercise.distance}
                  onChange={(e) =>
                    setEditedExercise({ ...editedExercise, distance: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="Duration (minutes)"
                  value={editedExercise.duration}
                  onChange={(e) =>
                    setEditedExercise({ ...editedExercise, duration: e.target.value })
                  }
                />
                <button className="save-btn" onClick={handleSaveExercise}>
                  Save Exercise
                </button>
              </div>
            ) : (
              <div>
                <img alt="cardio" src={cardioIcon} className="exercise-form-icon" />
                <p>
                  <span>Date: </span> {formatDate(exerciseData.date)}
                </p>
                <p>
                  <span>Name: </span> {exerciseData.name}
                </p>
                <p>
                  <span>Distance: </span> {exerciseData.distance} miles
                </p>
                <p>
                  <span>Duration: </span> {exerciseData.duration} minutes
                </p>
                <button className="edit-btn" onClick={handleEditExercise}>
                  Edit Exercise
                </button>
                <button className="delete-btn" onClick={handleDeleteExercise}>
                  Delete Exercise
                </button>
              </div>
            )}
          </div>
        )}

        {type === 'resistance' && Object.keys(exerciseData).length > 0 && (
          <div className="resistance-div">
            {isEditing ? (
              <div>
                <input
                  type="text"
                  placeholder="Exercise Name"
                  value={editedExercise.name}
                  onChange={(e) =>
                    setEditedExercise({ ...editedExercise, name: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="Weight (lbs)"
                  value={editedExercise.weight}
                  onChange={(e) =>
                    setEditedExercise({ ...editedExercise, weight: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="Sets"
                  value={editedExercise.sets}
                  onChange={(e) =>
                    setEditedExercise({ ...editedExercise, sets: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="Reps"
                  value={editedExercise.reps}
                  onChange={(e) =>
                    setEditedExercise({ ...editedExercise, reps: e.target.value })
                  }
                />
                <button className="save-btn" onClick={handleSaveExercise}>
                  Save Exercise
                </button>
              </div>
            ) : (
              <div>
                <img alt="resistance" src={resistanceIcon} className="exercise-form-icon" />
                <p>
                  <span>Date: </span> {formatDate(exerciseData.date)}
                </p>
                <p>
                  <span>Name: </span> {exerciseData.name}
                </p>
                <p>
                  <span>Weight: </span> {exerciseData.weight} lbs
                </p>
                <p>
                  <span>Sets: </span> {exerciseData.sets}
                </p>
                <p>
                  <span>Reps: </span> {exerciseData.reps}
                </p>
                <button className="edit-btn" onClick={handleEditExercise}>
                  Edit Exercise
                </button>
                <button className="delete-btn" onClick={handleDeleteExercise}>
                  Delete Exercise
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
