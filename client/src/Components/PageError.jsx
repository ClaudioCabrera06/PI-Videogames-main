import React from 'react';
import { useHistory } from 'react-router-dom';
import "./style/PageError.css"

 export default function PageError() {
    const history = useHistory();
    return (
      <div className="error-page">
        <h1 className="error-code">404</h1>
        <div className="error-content">
          <h2>We can't find that page</h2>
          <p className="error-text">
            We're fairly sure that page used to be here, but seems to have gone
            missing. We do apologise on its behalf.
          </p>
          <button className="home-button" onClick={() => history.push('./')}>
            Home
          </button>
        </div>
      </div>
    );
  }