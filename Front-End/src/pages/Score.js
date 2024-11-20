import React, { useState } from 'react';
import './css/Score.css';
const Score = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', homework: 'Math Homework 1', score: null, comments: '', feedback: '', submitted: true },
    { id: 2, name: 'Jane Smith', homework: 'Science Project', score: null, comments: '', feedback: '', submitted: true },
    { id: 3, name: 'Mark Johnson', homework: 'History Essay', score: null, comments: '', feedback: '', submitted: false },
    { id: 4, name: 'Emily Davis', homework: 'Art Assignment', score: null, comments: '', feedback: '', submitted: true },
  ]);

  const [filter, setFilter] = useState('All');
  const [scoreRange, setScoreRange] = useState('All');
  const [modalData, setModalData] = useState(null);

  const calculateGrade = (score) => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  };

  const handleScoreChange = (id, newScore) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, score: newScore } : student
      )
    );
  };

  const handleCommentsChange = (id, newComments) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, comments: newComments } : student
      )
    );
  };

  const handleFeedbackSubmit = (id, feedback) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, feedback } : student
      )
    );
    setModalData(null);
  };

  const handleResetStudent = (id) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, score: null, comments: '' } : student
      )
    );
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleScoreRangeChange = (e) => {
    setScoreRange(e.target.value);
  };

  const handleExportToCSV = () => {
    const headers = ['Name', 'Homework', 'Score', 'Grade', 'Comments', 'Submitted'];
    const csvRows = [headers.join(',')];
    students.forEach((student) => {
      const grade = student.score !== null ? calculateGrade(student.score) : 'N/A';
      const submitted = student.submitted ? 'Yes' : 'No';
      const row = [student.name, student.homework, student.score || '', grade, student.comments, submitted];
      csvRows.push(row.join(','));
    });

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'student_scores.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredStudents = students.filter((student) => {
    let matchesFilter = filter === 'All' || (filter === 'Submitted' ? student.submitted : !student.submitted);
    let matchesRange =
      scoreRange === 'All' ||
      (scoreRange === '0-50' && student.score <= 50) ||
      (scoreRange === '51-75' && student.score > 50 && student.score <= 75) ||
      (scoreRange === '76-100' && student.score > 75);
    return matchesFilter && matchesRange;
  });

  const gradedStudents = students.filter((student) => student.score !== null);
  const totalGraded = gradedStudents.length;
  const averageScore =
    totalGraded > 0
      ? (
          gradedStudents.reduce((total, student) => total + parseInt(student.score), 0) /
          totalGraded
        ).toFixed(2)
      : 0;

  const gradeDistribution = gradedStudents.reduce((acc, student) => {
    const grade = calculateGrade(student.score);
    acc[grade] = (acc[grade] || 0) + 1;
    return acc;
  }, {});

  const leaderboard = [...gradedStudents].sort((a, b) => b.score - a.score);

  return (
    <div className="score-container">
      <h1>📚 Homework Scoring</h1>

      {/* Progress Summary */}
      <div className="progress-summary">
        <div>Total Students: {students.length}</div>
        <div>Total Graded: {totalGraded}</div>
        <div>Average Score: {averageScore}</div>
        <div>
          Grade Distribution:
          {Object.entries(gradeDistribution).map(([grade, count]) => (
            <span key={grade}>
              {' '}
              {grade}: {count}
            </span>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="filter-container">
        <label htmlFor="filter">Filter by Submission:</label>
        <select id="filter" onChange={handleFilterChange}>
          <option value="All">All</option>
          <option value="Submitted">Submitted</option>
          <option value="Not Submitted">Not Submitted</option>
        </select>

        <label htmlFor="score-range">Filter by Score Range:</label>
        <select id="score-range" onChange={handleScoreRangeChange}>
          <option value="All">All</option>
          <option value="0-50">0-50</option>
          <option value="51-75">51-75</option>
          <option value="76-100">76-100</option>
        </select>

        <button className="btn-export-csv" onClick={handleExportToCSV}>
          Export to CSV
        </button>
      </div>

      {/* Leaderboard */}
      <div className="leaderboard">
        <h2>🏆 Leaderboard</h2>
        <ol>
          {leaderboard.map((student) => (
            <li key={student.id}>
              {student.name} - {student.score}
            </li>
          ))}
        </ol>
      </div>

      {/* Score Table */}
      <table className="score-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Homework</th>
            <th>Status</th>
            <th>Score</th>
            <th>Grade</th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.homework}</td>
              <td>{student.submitted ? 'Submitted' : 'Pending'}</td>
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
              <td>{student.score !== null ? calculateGrade(student.score) : 'N/A'}</td>
              <td>
                <textarea
                  value={student.comments}
                  onChange={(e) => handleCommentsChange(student.id, e.target.value)}
                  placeholder="Leave a comment"
                  className="comments-input"
                />
              </td>
              <td>
                <button
                  className="btn-feedback"
                  onClick={() => setModalData({ ...student })}
                >
                  Feedback
                </button>
                <button
                  className="btn-reset"
                  onClick={() => handleResetStudent(student.id)}
                >
                  Reset
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Feedback Modal */}
      {modalData && (
        <div className="feedback-modal">
          <h3>Provide Feedback for {modalData.name}</h3>
          <textarea
            value={modalData.feedback}
            onChange={(e) => setModalData({ ...modalData, feedback: e.target.value })}
            placeholder="Enter feedback"
          ></textarea>
          <button onClick={() => handleFeedbackSubmit(modalData.id, modalData.feedback)}>
            Submit Feedback
          </button>
          <button onClick={() => setModalData(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Score;