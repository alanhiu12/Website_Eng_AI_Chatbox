import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./css/BulletinBoard.css"; // Import the CSS file

const BulletinBoard = () => {
  const { classId } = useParams();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/study"); // Navigate back to the Study.js page
  };

  // Simulated class data
  const classDetails = [
    { id: 1, name: "Math 101", announcements: ["Homework due Friday", "Exam on Monday"], resources: ["Algebra.pdf", "GeometryNotes.pdf"] },
    { id: 2, name: "Physics", announcements: ["Lab report due next week", "Project submission deadline"], resources: ["NewtonLaws.pdf", "Kinematics.ppt"] },
    { id: 3, name: "Chemistry", announcements: ["Quiz on chemical reactions", "New lab safety rules"], resources: ["PeriodicTable.pdf", "ReactionVideos.mp4"] },
    { id: 4, name: "Biology", announcements: ["Dissection guide available", "Final report submission"], resources: ["BiologyGuide.pdf", "Anatomy.ppt"] },
    { id: 5, name: "History", announcements: ["Essay on World War II", "Museum visit details"], resources: ["HistoryTimeline.pdf", "Civilizations.doc"] },
    { id: 6, name: "Computer Science", announcements: ["Submit coding assignment", "Guest lecture on AI"], resources: ["Algorithms.pdf", "CodingBasics.zip"] },
    { id: 7, name: "English Literature", announcements: ["Read chapters 1-5", "Essay competition details"], resources: ["LiteratureSummary.pdf", "Poems.docx"] },
  ];

  const currentClass = classDetails.find((cls) => cls.id === parseInt(classId));

  if (!currentClass) {
    return <h1>Class not found!</h1>;
  }

  return (
    <div className="bulletin-board-container">
      <h1 className="bulletin-board-title">Bulletin Board: {currentClass.name}</h1>

      <section className="bulletin-board-section">
        <h2>Announcements</h2>
        <ul className="bulletin-board-list">
          {currentClass.announcements.map((announcement, index) => (
            <li key={index}>{announcement}</li>
          ))}
        </ul>
      </section>

      <section className="bulletin-board-section">
        <h2>Resources</h2>
        <ul className="bulletin-board-list">
          {currentClass.resources.map((resource, index) => (
            <li key={index}>
              <a href={`#${resource}`}>{resource}</a>
            </li>
          ))}
        </ul>
      </section>

      {/* Add a Back button */}
      <button className="back-button" onClick={handleBack}>
        Back
      </button>
    </div>
  );
};

export default BulletinBoard;
