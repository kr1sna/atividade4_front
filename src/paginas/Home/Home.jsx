import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

export default function Home() {
  const navigate = useNavigate();
  
  const pages = [
    { name: 'Gráficos', path: '/graphs' },
    { name: 'Dados', path: '/data' }
  ];

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="header-section">
          <h1 className="main-title">Welcome to Dashboard</h1>
          <p className="subtitle">Select a page to view</p>
        
          <div className="button-grid">
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
};