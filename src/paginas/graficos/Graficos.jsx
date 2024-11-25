import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDataFetching } from '../../utils';
import { DataChart } from '../../utils';
import { RefreshButton } from '../../utils';
import './graficos.css'

export default function Graficos() {
  const navigate = useNavigate();
  const { data: data1, isLoading: isLoading1, error: error1, fetchData: fetchData1 } = useDataFetching();
  const { data: data2, isLoading: isLoading2, error: error2, fetchData: fetchData2 } = useDataFetching();
  const { data: data3, isLoading: isLoading3, error: error3, fetchData: fetchData3 } = useDataFetching();
  const { data: data4, isLoading: isLoading4, error: error4, fetchData: fetchData4 } = useDataFetching();

  const refreshAll = () => {
    fetchData1();
    fetchData2();
    fetchData3();
    fetchData4();
  };

  const isLoading = isLoading1 || isLoading2 || isLoading3 || isLoading4;
  const hasError = error1 || error2 || error3 || error4;

  return (
    <div className='container'>
      {isLoading && (
        <div className='loading'>Loading...</div>
      )}
      {hasError && (
        <div className='error'>
          {error1 || error2 || error3 || error4}
        </div>
      )}
      {!isLoading && !hasError && (
        <>
          <div className="header">
            <div className='header-group'>
              <button className="back-button" aria-label="Go back" onClick={() => navigate('/')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
              </button>
              <h2 className="title">Gráficos</h2>
            </div>
            <RefreshButton onClick={refreshAll} />
          </div>
          <div className='graphs'>
            <DataChart 
              title="RSSI (dBm)" 
              dataKey="rssi" 
              color="#b082ca" 
              data={data1}
            />
            <DataChart 
              title="Temperatura (°C)" 
              dataKey="temperature" 
              color="#82b0ca" 
              data={data2}
            />
            <DataChart 
              title="Umidade (%)" 
              dataKey="humidity" 
              color="#82ca9d" 
              data={data3}
            />
            <DataChart 
              title="Luminosidade" 
              dataKey="luminosity" 
              color="#ca8282" 
              data={data4}
            />
          </div>
        </>
      )}
    </div>
  );
}