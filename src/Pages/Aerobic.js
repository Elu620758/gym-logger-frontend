import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import aerobicIcon from '../images/aerobic.png';
import axios from 'axios';
import CustomNavbar from '../components/CustomNavbar';

const Aerobic = ({ user }) => {
  // console.log(user)
  const [aerobicForm, setAerobicForm] = useState({
    name: '',
    duration: '',
    caloriesBurned: '',
    date: new Date(),
    heartRate: '', // Add the heartRate field
  });
  const [message, setMessage] = useState('');

  const handleAerobicChange = (event) => {
    const { name, value } = event.target;
    setAerobicForm({ ...aerobicForm, [name]: value });
  };

  const handleDateChange = (date) => {
    setAerobicForm({ ...aerobicForm, date });
  };

  const validateForm = (form) => {
    return (
      form.name &&
      form.duration &&
      form.caloriesBurned &&
      form.date &&
      form.heartRate // Make sure heartRate is included in validation
    );
  };

  const handleAerobicSubmit = async (event) => {
    event.preventDefault();

    const userId = user ? user._id : null;

    const dataToSend = {
      ...aerobicForm,
      userId: userId,
    };

    if (validateForm(aerobicForm)) {
      try {
        const response = await axios.post('https://gymlogger-backend-app.onrender.com/aerobic/createAerobic', dataToSend);

        if (response.status === 200) {
          setMessage('Aerobic exercise successfully added');
          setTimeout(() => {
            setMessage('');
          }, 3000);
        } else {
          setMessage('Something else went wrong');
        }
      } catch (err) {
        setMessage('Something went wrong');
      }
    } else {
      setMessage('Please fill in all required fields.');
    }

    setAerobicForm({
      name: '',
      duration: '',
      caloriesBurned: '',
      date: new Date(),
      heartRate: '', // Reset heartRate field
    });
  };

  return (
    <div className="aerobic">
      <CustomNavbar />
      <div className="d-flex flex-column align-items-center">
        <h2 className="title text-center">Add Aerobic Exercise</h2>
        <form className="aerobic-form d-flex flex-column" onSubmit={handleAerobicSubmit}>
          <div className="d-flex justify-content-center">
            <img alt="aerobic" src={aerobicIcon} className="exercise-form-icon" />
          </div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Running"
            value={aerobicForm.name}
            onChange={handleAerobicChange}
          />
          <label>Duration (minutes):</label>
          <input
            type="number"
            name="duration"
            id="duration"
            placeholder="0"
            value={aerobicForm.duration}
            onChange={handleAerobicChange}
          />
          <label>Calories Burned:</label>
          <input
            type="number"
            name="caloriesBurned"
            id="caloriesBurned"
            placeholder="0"
            value={aerobicForm.caloriesBurned}
            onChange={handleAerobicChange}
          />
          <label>Heart Rate:</label>
          <input
            type="number"
            name="heartRate"
            id="heartRate"
            placeholder="0"
            value={aerobicForm.heartRate}
            onChange={handleAerobicChange}
          />
          <label>Date:</label>
          <DatePicker
            selected={aerobicForm.date}
            onChange={handleDateChange}
            placeholderText="mm/dd/yyyy"
          />
          <button
            className="submit-btn aerobic-submit-btn"
            type="submit"
            disabled={!validateForm(aerobicForm)}
          >
            Add
          </button>
        </form>
        <p className="message">{message}</p>
      </div>
    </div>
  );
};

export default Aerobic;
