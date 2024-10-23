import React, { useState } from 'react';
import './css/AssignmentManager.css'; // Assuming you have styles for your components
import AssignmentForm from './AssignmentForm';
import AssignmentList from './AssignmentList';

const AssignmentManager = () => {
  const [assignments, setAssignments] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleSubmit = (assignment) => {
    if (editingIndex !== null) {
      const updatedAssignments = assignments.map((a, index) =>
        index === editingIndex ? assignment : a
      );
      setAssignments(updatedAssignments);
      setEditingIndex(null);
    } else {
      setAssignments([...assignments, assignment]);
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    setAssignments(assignments.filter((_, i) => i !== index));
  };

  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logout successful');
  };

  return (
    <div className="assignment-manager">
      <header>
        <div className="container">
          <a href="/" className="logo">LearnLinguaAI</a>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/study">Learn</a></li>
              <li><a href="/about">About</a></li>
              <li className="dropdown">
                <a href="#" className="dropbtn">See More</a>
                <div className="dropdown-content">
                  <a href="/user-profile">Profile</a>
                  <a href="/contact">Contact</a>
                  <a href="/setting">Setting</a>
                  <a href="#" onClick={handleLogout} id="logout-link">Logout</a>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <h1>Assignment Manager</h1>
      <AssignmentForm
        currentAssignment={assignments[editingIndex]}
        onSubmit={handleSubmit}
        onCancel={() => setEditingIndex(null)}
      />
      <AssignmentList
        assignments={assignments}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

        <footer>
                <div className="container">
                    <p>&copy; 2024 LearnLinguaAI. All Rights Reserved.</p>
                </div>
        </footer>
    </div>
  );
};

export default AssignmentManager;
