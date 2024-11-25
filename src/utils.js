import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useState, useEffect } from 'react'
import axios from 'axios'

export function useDataFetching() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await axios.get('https://server-06z2.onrender.com/data')
      
      const dataWithTimestamps = response.data.map((point) => ({
        ...point,
        timestamp: new Date(point.timestamp).toLocaleString('en-US', { 
            dateStyle: 'medium',
            timeStyle: 'medium'
          })
      }))
      
      setData(dataWithTimestamps)
    } catch (err) {
      console.error('Error details:', err)
      setError(`An error occurred while fetching data: ${err.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { data, isLoading, error, fetchData }
}

export function DataChart({ title, dataKey, color, data }) {
  return (
    <div style={{ width: '100%', marginBottom: '2rem', padding: '1rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>{title}</h2>
      <div style={{ height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey={dataKey} stroke={color} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export function RefreshButton({ onClick }) {
  return (
    <button 
      onClick={onClick}
      style={{
        padding: '0.5rem 1rem',
        backgroundColor: '#3B82F6',
        color: 'white',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer'
      }}
    >
      Refresh Data
    </button>
  )
}