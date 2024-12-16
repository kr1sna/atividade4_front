import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

export default function SelectCenario() {
  const navigate = useNavigate();

  const pages = [
    { name: 'SF 7', path: '/outdoor01' },
    { name: 'SF 10', path: '/outdoor02' },
    { name: 'SF 12', path: '/outdoor03' }
  ];

  return (
    <div className="page-container">
      <div className="header px-4 pt-4">
        <div className='header-group'>
          <button className="back-button" aria-label="Go back" onClick={() => navigate('/scenarios')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <h2 className="title">Select Outdoor Scenario</h2>
        </div>
      </div>

      <div className="content-wrapper">
        <div className="header-section">
          <p className="subtitle">Choose your scenario of interest</p>
        
          <div className="button-grid-2">
            {pages.map((page) => (
              <button
                key={page.path}
                onClick={() => navigate(page.path)}
                className="nav-button"
              >
                <div className="button-gradient"></div>
                <span className="button-text">{page.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}