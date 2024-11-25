import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDataFetching } from '../../utils';
import { RefreshButton } from '../../utils';
import './dados.css';

export default function Dados() {
  const { data, isLoading, error, fetchData } = useDataFetching();
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const navigate = useNavigate();

  // Calculate pagination values
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Handle page changes
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const PaginationButton = ({ pageNumber, isActive, onClick }) => (
    <button
      onClick={() => onClick(pageNumber)}
      className={`pagination-button ${isActive ? 'active' : ''}`}
    >
      {pageNumber}
    </button>
  );

  const PaginationControls = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="pagination">
        <button
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
        >
          Previous
        </button>

        {startPage > 1 && (
          <>
            <PaginationButton pageNumber={1} isActive={currentPage === 1} onClick={handlePageChange} />
            {startPage > 2 && <span className="ellipsis">...</span>}
          </>
        )}

        {pageNumbers.map(number => (
          <PaginationButton
            key={number}
            pageNumber={number}
            isActive={currentPage === number}
            onClick={handlePageChange}
          />
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="ellipsis">...</span>}
            <PaginationButton
              pageNumber={totalPages}
              isActive={currentPage === totalPages}
              onClick={handlePageChange}
            />
          </>
        )}

        <button
          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`}
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="container">
      {isLoading && (
        <div className="loading">Loading...</div>
      )}
      
      {error && (
        <div className="error">{error}</div>
      )}
      
      {!isLoading && !error && (
        <div className="card">
          <div className="header">
            <div className='header-group'>
              <button className="back-button" aria-label="Go back" onClick={() => navigate('/')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
              </button>
              <h2 className="title">Dados</h2>
            </div>
            <RefreshButton onClick={fetchData} />
          </div>
          
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Temperature (°C)</th>
                  <th>Humidity (%)</th>
                  <th>Luminosity</th>
                  <th>RSSI</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map((row, index) => (
                  <tr key={index}>
                    <td>{row.timestamp}</td>
                    <td>{row.temperature}</td>
                    <td>{row.humidity}</td>
                    <td>{row.luminosity}</td>
                    <td>{row.rssi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <PaginationControls />
        </div>
      )}
    </div>
  );
}