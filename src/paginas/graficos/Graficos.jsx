import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { RefreshButton } from '../../utils';
import './graficos.css'

export default function Graficos() {
  const navigate = useNavigate();

  const rssiData01 = [
    { packet: '1', rssi01: -117 },
    { packet: '2', rssi01: -117 },
    { packet: '3', rssi01: -116 },
    { packet: '4', rssi01: -116 },
    { packet: '5', rssi01: -118 },
    { packet: '6', rssi01: -116 },
    { packet: '8', rssi01: -117 },
    { packet: '9', rssi01: -116 },
    { packet: '10', rssi01: -116 },
    { packet: '11', rssi01: -117 }
  ];

  const rssiData02 = [
    { packet: '2', rssi02: -116 },
    { packet: '4', rssi02: -118 },
    { packet: '5', rssi02: -117 },
    { packet: '6', rssi02: -117 },
    { packet: '7', rssi02: -117 },
    { packet: '9', rssi02: -117 },
    { packet: '10', rssi02: -118 }
  ];

  const rssiData03 = [
    { packet: '1', rssi03: -117 },
    { packet: '2', rssi03: -116 },
    { packet: '3', rssi03: -116 },
    { packet: '7', rssi03: -116 },
    { packet: '8', rssi03: -116 },
    { packet: '9', rssi03: -114 },
    { packet: '10', rssi03: -117 },
    { packet: '11', rssi03: -117 }
  ];

  const rssiData04 = [
    { packet: '1', rssi04: -115 },
    { packet: '2', rssi04: -114 },
    { packet: '5', rssi04: -115 },
    { packet: '6', rssi04: -116 },
    { packet: '7', rssi04: -116 },
    { packet: '8', rssi04: -116 },
    { packet: '9', rssi04: -115 },
    { packet: '10', rssi04: -115 },
    { packet: '11', rssi04: -116 }
  ];

  const renderRSSIChart = (data, dataKey, name, stroke) => (
    <div className="w-full h-full p-2 flex flex-col">
      <h3 className="text-center text-lg font-semibold mb-2">{name} Indoor</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="packet" type="category" label={{value: 'Packet ID', dy: 13}}/>
          <YAxis 
            type="number" 
            domain={[-130, -110]} 
            label={{ value: 'RSSI (dBm)', angle: -90, position: 'insideLeft' }} 
          />
          <Tooltip />
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
          <button className="back-button" aria-label="Go back" onClick={() => navigate('/')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <h2 className="title">RSSI Graphs</h2>
        </div>
        <RefreshButton onClick={() => {}} />
      </div>

      <div className="grid grid-cols-2 gap-4 h-[600px]">
        {renderRSSIChart(rssiData01, 'rssi01', 'Cenário 01', '#b082ca')}
        {renderRSSIChart(rssiData02, 'rssi02', 'Cenário 02', '#82b0ca')}
        {renderRSSIChart(rssiData03, 'rssi03', 'Cenário 03', '#82ca9d')}
        {renderRSSIChart(rssiData04, 'rssi04', 'Cenário 04', '#ca8282')}
      </div>
    </div>
  );
}