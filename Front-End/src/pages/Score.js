import React, { useState } from 'react';
import './css/Score.css';


const Score = () => {
    const [students, setStudents] = useState([
      { id: 1, name: 'John Doe', homework: 'Math Homework 1', score: null, comments: '' },
      { id: 2, name: 'Jane Smith', homework: 'Science Project', score: null, comments: '' },
      { id: 3, name: 'Mark Johnson', homework: 'History Essay', score: null, comments: '' },
    ]);
  
    const [filter, setFilter] = useState('All');
  
    const handleScoreChange = (id, newScore) => {
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === id ? { ...student, score: newScore } : student
        )
      );
    };
  
    const handleCommentsChange = (id, newComments) => {
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === id ? { ...student, comments: newComments } : student
        )
      );
    };
  
    const handleSubmitScore = (id) => {
      const student = students.find((student) => student.id === id);
      if (student.score === null || student.score === '') {
        alert('Please enter a valid score.');
      } else {
        alert(`Score for ${student.name} has been submitted.`);
      }
    };
  
    const handleResetScore = (id) => {
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === id ? { ...student, score: null, comments: '' } : student
        )
      );
    };
  
    const handleFilterChange = (e) => {
      setFilter(e.target.value);
    };
  
    const exportToCSV = () => {
      const csvContent = [
        ['Student Name', 'Homework', 'Score', 'Comments'],
        ...students.map((student) => [student.name, student.homework, student.score || 'N/A', student.comments]),
      ]
        .map((row) => row.join(','))
        .join('\n');
  
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'StudentScores.csv';
      link.click();
    };
  
    const filteredStudents = students.filter((student) => {
      if (filter === 'All') return true;
      if (filter === '0-50') return student.score >= 0 && student.score <= 50;
      if (filter === '51-75') return student.score > 50 && student.score <= 75;
      if (filter === '76-100') return student.score > 75 && student.score <= 100;
      return false;
    });
  
    return (
      <div className="score-container">
        <h1>📚 Homework Scoring</h1>
        <div className="filter-container">
          <label htmlFor="filter">Filter by Score Range:</label>
          <select id="filter" onChange={handleFilterChange}>
            <option value="All">All</option>
            <option value="0-50">0-50</option>
            <option value="51-75">51-75</option>
            <option value="76-100">76-100</option>
          </select>
          <button className="btn-export" onClick={exportToCSV}>
            Export to CSV
          </button>
        </div>
        <table className="score-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Homework</th>
              <th>Score</th>
              <th>Comments</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>
                  <a href="#" className="view-link">
                    View Submission
                  </a>
                </td>
                <td>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={student.score || ''}
                    onChange={(e) => handleScoreChange(student.id, e.target.value)}
                    placeholder="Score"
                    className="score-input"
                  />
                </td>
                <td>
                  <textarea
                    value={student.comments}
                    onChange={(e) => handleCommentsChange(student.id, e.target.value)}
                    placeholder="Leave a comment"
                    className="comments-input"
                  />
                </td>
                <td>
                  <button className="btn-submit-score" onClick={() => handleSubmitScore(student.id)}>
                    Submit
                  </button>
                  <button className="btn-reset-score" onClick={() => handleResetScore(student.id)}>
                    Reset
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default Score;