// src/components/ProgressDashboard.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './ProgressDashboard.css';

const ProgressDashboard = () => {
  // Sample data for progress chart
  const data = [
    { week: 'Week 1', grammar: 70, vocabulary: 60, pronunciation: 50 },
    { week: 'Week 2', grammar: 75, vocabulary: 65, pronunciation: 55 },
    { week: 'Week 3', grammar: 80, vocabulary: 70, pronunciation: 60 },
    { week: 'Week 4', grammar: 85, vocabulary: 75, pronunciation: 65 },
  ];

  // Sample data for completed assignments
  const assignments = [
    { id: 1, title: 'Grammar Practice 1', status: 'Completed', feedback: 'Good improvement on grammar' },
    { id: 2, title: 'Vocabulary Test 1', status: 'Completed', feedback: 'Vocabulary is getting better' },
    { id: 3, title: 'Pronunciation Exercise 1', status: 'Pending', feedback: 'Awaiting feedback' },
  ];

  return (
    <div className="progress-dashboard">
      <h2>Progress Dashboard</h2>

      {/* Progress Chart */}
      <div className="progress-chart">
        <h3>Your Progress</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="grammar" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="vocabulary" stroke="#82ca9d" />
            <Line type="monotone" dataKey="pronunciation" stroke="#ff7300" />
          </LineChart>
        </ResponsiveContainer>
      </div>

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
