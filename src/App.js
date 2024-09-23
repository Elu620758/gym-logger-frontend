import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Home from './components/Home';
import Allexcercisepage from './components/Allexcercisepage';
import Cardio from './Pages/Cardio';
import Aerobic from './Pages/Aerobic';
import Resistance from './Pages/Resistance';
import History from './Pages/History';
import SingleExercise from "./Pages/SingleExercise";
import ErrorPage from './Pages/ErrorPage';
import LoginSignupPage from './components/LoginSignupPage';


function App() {
  const [user, setUser] = useState(null);
  // console.log(user);

  return (
    <div className="app-container">
      <Router>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login/*" element={<LoginSignupPage setUser={setUser} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/allexcercisepage" element={<Allexcercisepage />} />
          <Route path="/exercise/aerobic" element={<Aerobic user={user} />} />
          <Route path="/exercise/cardio" element={<Cardio user={user} />} />
          <Route path="/exercise/resistance" element={<Resistance user={user} />} />
          <Route path="/history/:userId" element={<History user={user} />}/>
          <Route path="/history/:type/:id" element={<SingleExercise user={user} />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<Navigate to="/error" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
