// src/components/ProgressDashboard.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './styles/ProgressDashboard.css';

const ProgressDashboard = () => {
 
  
  // Sample data for completed assignments
  const assignments = [
    { id: 1, title: 'Grammar Practice 1', status: 'Completed', feedback: 'Good improvement on grammar' },
    { id: 2, title: 'Vocabulary Test 1', status: 'Completed', feedback: 'Vocabulary is getting better' },
    { id: 3, title: 'Pronunciation Exercise 1', status: 'Pending', feedback: 'Awaiting feedback' },
  ];

  return (
    <div className="progress-dashboard">
     

      {/* Completed Assignments List */}
      <div className="assignments-list">
        <h3>Completed Assignments</h3>
        <ul>
          {assignments.map((assignment) => (
            <li key={assignment.id}>
              <strong>{assignment.title}</strong> - {assignment.status}
              <p>Feedback: {assignment.feedback}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProgressDashboard;
