import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Params } from 'react-router-dom';
import { useEffect ,useState} from "react";
import { useParams } from "react-router-dom";



const DynamicChart = () => {
  const params = useParams();
  const [userData, setUserData] = useState({});
  const [chartData, setChartData] = useState([]);

  const fetchUserData = async (name) =>  {
    try {
      const token = localStorage.getItem('tokenKey');
      const response = await fetch(`/users/${name}`, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        },
      });
  
      if (response.ok) {
        const userData = await response.json();
  
         const captchaResponses = userData.captchaResponse || [];
         const transformedData = captchaResponses.map(response => ({
           date: response.createdDateTime, 
           seconds: response.responseTimeSeconds,
         }));
  
        setChartData(transformedData);
        setUserData(userData);
      } else {
        console.error('Error fetching user data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
    useEffect(() => {
      fetchUserData(params.name);
    }, []); 
  
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Display user information */}
      <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
      
        <p><strong>Name:</strong> {userData.name}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        {/* Add more user information fields as needed */}
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis
            dataKey="date"
            type="category"
            allowDuplicatedCategory={false}
            tick={{ angle: -45, textAnchor: 'end', interval: 0 }}
            tickFormatter={time => new Date(time).toLocaleTimeString()}
          />
          <YAxis dataKey="seconds" />
          <CartesianGrid strokeDasharray="1 3" />
          <Tooltip labelFormatter={time => new Date(time).toLocaleTimeString()} />
          <Legend />
          <Line type="monotone" dataKey="seconds" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
      </div>
    );
  };

export default DynamicChart;