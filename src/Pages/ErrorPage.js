import React from 'react';
import errorImage from '../images/error.jpg';

const ErrorPage = () => {
  return (
    <div className="error-container">
      <div className="error-text">
        <h1 className="black-text">Oops!</h1>
        <p className="black-text">Something went wrong.</p>
        <a href="/" className="black-text">Go back to the homepage</a>
      </div>
      <div className="error-image">
        <img src={errorImage} alt="Illustration of an error" />
      </div>
    </div>
  );
};

export default ErrorPage;
