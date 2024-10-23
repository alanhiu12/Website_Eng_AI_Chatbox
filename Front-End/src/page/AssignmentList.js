import React from 'react';
import './css/AssignmentList.css'; // Import CSS for AssignmentList

const AssignmentList = ({ assignments, onEdit, onDelete }) => {
  return (
    <div className="assignment-list">
      {assignments.map((assignment, index) => (
        <div className="assignment-item" key={index}>
          <h3>{assignment.title}</h3>
          <p>{assignment.description}</p>
          <button onClick={() => onEdit(index)}>Edit</button>
          <button onClick={() => onDelete(index)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AssignmentList;
