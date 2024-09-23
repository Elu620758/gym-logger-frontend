import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useParams, useNavigate } from 'react-router-dom';

function CustomNavbar({ user }) {
  const { userId } = useParams(); // Get userId from the URL
  const navigate = useNavigate(); // Use the useNavigate hook to navigate

  return (
    <Navbar bg="transparent" variant="transparent" className="custom-navbar sticky-top">
      <Navbar.Brand style={{ color: 'white' }}>Fitness Logger</Navbar.Brand>

      <Nav className="ml-auto custom-nav-links">
        <Link to="/allexcercisepage" className="nav-link">Add Exercise</Link>
        <Link to={`/history/${userId}`} className="nav-link">History</Link>
        <Link to="/" className="nav-link" onClick={() => navigate('/login')}>Logout</Link>
      </Nav>
    </Navbar>
  );
}

export default CustomNavbar;
