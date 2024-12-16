import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  outdoorData01,
  outdoorData02
 } from '../../manualData';
import './graficos.css';
import imagem from '../../images/outdoor02.png'

export default function GraficosOutdoorDois() {
  const navigate = useNavigate();

  const renderRSSIChart = (data, dataKey, name, stroke) => (
    <div className="w-full h-[300px] p-2 flex flex-col">
      <h3 className="text-center text-lg font-semibold mb-2">{name} Outdoor</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="packet" type="category" label={{value: 'Packet ID', dy: 13}}/>
          <YAxis 
            type="number" 
            domain={[-130, -110]} 
            label={{ value: 'RSSI (dBm)', angle: -90, position: 'insideLeft' }} 
          />
          <Tooltip 
            labelFormatter={() => ''}
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
      </div>

      <div className="grid grid-cols-2 gap-4">
        {renderRSSIChart(outdoorData01, 'rssi', 'Cenário E -', '#005cf7')}
        {renderRSSIChart(outdoorData02, 'rssi', 'Cenário F -', '#79af46')}
      </div>

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