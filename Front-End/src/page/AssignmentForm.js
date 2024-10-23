import React, { useState, useEffect } from 'react';

const AssignmentForm = ({ currentAssignment, onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (currentAssignment) {
      setTitle(currentAssignment.title);
      setDescription(currentAssignment.description);
    }
  }, [currentAssignment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default AssignmentForm;
