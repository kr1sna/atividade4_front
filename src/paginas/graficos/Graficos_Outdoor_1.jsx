import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { useFlexibleDataFetching } from '../../utils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { RefreshButton } from '../../utils';
import './graficos.css';
import imagem from '../../images/cenarioSF7.png'

export default function GraficosOutdoorUm() {
  const navigate = useNavigate();

  const url1 = 'https://api-kf.onrender.com/data/ROTATORIA01_SF7';
  const url2 = 'https://api-kf.onrender.com/data/LAB_RMN';
  const url3 = 'https://api-kf.onrender.com/data/ARVORES_SF7';
  const url4 = 'https://api-kf.onrender.com/data/PROTOCOLOGERAL_SF7';

  const transformData = useCallback(
    (rawData) =>
      rawData.map((point) => ({
        rssi: point.rssi,
        timestamp: new Date(point.createdAt).toLocaleString('en-US', {
          dateStyle: 'medium',
          timeStyle: 'medium',
        }),
      })),
    []
  );

  const { data: data1, isLoading: isLoading1, error: error1, fetchData: fetchData1 } = useFlexibleDataFetching(url1, transformData);
  const { data: data2, isLoading: isLoading2, error: error2, fetchData: fetchData2 } = useFlexibleDataFetching(url2, transformData);
  const { data: data3, isLoading: isLoading3, error: error3, fetchData: fetchData3 } = useFlexibleDataFetching(url3, transformData);
  const { data: data4, isLoading: isLoading4, error: error4, fetchData: fetchData4 } = useFlexibleDataFetching(url4, transformData);

  const refreshAll = () => {
    fetchData1();
    fetchData2();
    fetchData3();
    fetchData4();
  };

  const isLoading = isLoading1 || isLoading2 || isLoading3 || isLoading4;
  const hasError = error1 || error2 || error3 || error4;

  const renderRSSIChart = (data, dataKey, name, stroke) => (
      <div className="w-full h-full p-2 flex flex-col">
        <h3 className="text-center text-lg font-semibold mb-2">{name} Outdoor</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp"/>
            <YAxis 
              type="number" 
              domain={[-130, -100]} 
              label={{ value: 'RSSI (dBm)', angle: -90, position: 'insideLeft' }} 
            />
            <Tooltip
              formatter={(value, name) => [value + ' dBm', 'RSSI']}
            />
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              name={name} 
              stroke={stroke}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  
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
              <button className="back-button" aria-label="Go back" onClick={() => navigate('/outdoor')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              </button>
              <h2 className="title">RSSI Graphs</h2>
            </div>
            <RefreshButton onClick={refreshAll} />
          </div>
        
          <div className="grid grid-cols-2 gap-4 h-[600px]">
            {renderRSSIChart(data1, 'rssi', 'Cenário A -', '#005cf7')}
            {renderRSSIChart(data2, 'rssi', 'Cenário B -', '#be5cf6')}
            {renderRSSIChart(data3, 'rssi', 'Cenário C -', '#f5e638')}
            {renderRSSIChart(data4, 'rssi', 'Cenário D -', '#e46d41')}
          </div>
        </>
      )}

      <div className="flex justify-center mt-4">
        <img 
          src={imagem} 
          alt="Descriptive alt text" 
          className="max-w-full h-auto" 
        />
      </div>
    </div>
  );
}