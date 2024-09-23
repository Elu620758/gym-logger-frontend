import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import resistanceIcon from '../images/resistance.png'; // Replace with the actual icon path
import axios from 'axios';
import CustomNavbar from '../components/CustomNavbar';

const Resistance = ({ user }) => {
  const [resistanceForm, setResistanceForm] = useState({
    name: '',
    weight: '',
    sets: '',
    reps: '',
    date: new Date(),
  });
  const [message, setMessage] = useState('');

  const handleResistanceChange = (event) => {
    const { name, value } = event.target;
    setResistanceForm({ ...resistanceForm, [name]: value });
  };

  const handleDateChange = (date) => {
    setResistanceForm({ ...resistanceForm, date });
  };

  const validateForm = (form) => {
    return form.name && form.weight && form.sets && form.reps && form.date;
  };

  const handleResistanceSubmit = async (event) => {
    event.preventDefault();

    const userId = user ? user._id : null;

    const dataToSend = {
      ...resistanceForm,
      userId: userId,
    };

    if (validateForm(resistanceForm)) {
      try {
        
        const response = await axios.post('https://gymlogger-backend-app.onrender.com/resistance/createResistance', dataToSend);
        if (response.status === 200) {
          setMessage('Resistance exercise successfully added');
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

    setResistanceForm({
      name: '',
      weight: '',
      sets: '',
      reps: '',
      date: new Date(),
    });
  };

  return (
    <div className="resistance">
      <CustomNavbar />
      <div className="d-flex flex-column align-items-center">
        <h2 className="title text-center">Add Resistance Exercise</h2>
        <form className="resistance-form d-flex flex-column" onSubmit={handleResistanceSubmit}>
          <div className="d-flex justify-content-center">
            <img alt="resistance" src={resistanceIcon} className="exercise-form-icon" />
          </div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Bench Press"
            value={resistanceForm.name}
            onChange={handleResistanceChange}
          />
          <label>Weight (lbs):</label>
          <input
            type="number"
            name="weight"
            id="weight"
            placeholder="0"
            value={resistanceForm.weight}
            onChange={handleResistanceChange}
          />
          <label>Sets:</label>
          <input
            type="number"
            name="sets"
            id="sets"
            placeholder="0"
            value={resistanceForm.sets}
            onChange={handleResistanceChange}
          />
          <label>Reps:</label>
          <input
            type="number"
            name="reps"
            id="reps"
            placeholder="0"
            value={resistanceForm.reps}
            onChange={handleResistanceChange}
          />
          <label>Date:</label>
          <DatePicker
            selected={resistanceForm.date}
            onChange={handleDateChange}
            placeholderText="mm/dd/yyyy"
          />
          <button
            className="submit-btn resistance-submit-btn"
            type="submit"
            disabled={!validateForm(resistanceForm)}
          >
            Add
          </button>
        </form>
        <p className="message">{message}</p>
      </div>
    </div>
  );
};

export default Resistance;
