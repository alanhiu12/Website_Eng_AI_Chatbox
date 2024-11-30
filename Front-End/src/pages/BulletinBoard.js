import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./css/BulletinBoard.css";

const BulletinBoard = () => {
  const { classId } = useParams();
  const navigate = useNavigate();

  const [classDetails, setClassDetails] = useState(null);
  const [streamMessages, setStreamMessages] = useState([]);
  const [teachingMaterials, setTeachingMaterials] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [people, setPeople] = useState([]);
  const [settings, setSettings] = useState({});
  const [activeTab, setActiveTab] = useState("stream");

  const [newMaterial, setNewMaterial] = useState({ title: "", link: "" });
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [studentAnswer, setStudentAnswer] = useState("");
  const [gradingResult, setGradingResult] = useState(null);
  const [error, setError] = useState("");

  const handleBack = () => {
    navigate("/study");
  };

  useEffect(() => {
    // Fake fetching class data
    const classData = [
      {
        id: 1,
        name: "Math 101",
        streamMessages: ["Welcome to Math 101!", "Class starts at 10 AM"],
        teachingMaterials: [{ title: "Algebra Basics", link: "https://example.com/algebra" }],
        assignments: [
          { id: 1, title: "Homework 1", description: "Solve 10 algebra problems", dueDate: "2024-12-01" },
        ],
        people: [
          { name: "Mr. Smith", role: "teacher" },
          { name: "Alice", role: "student" },
          { name: "Bob", role: "student" },
        ],
      },
    ];
    

    const currentClass = classData.find(cls => cls.id === parseInt(classId));
    if (currentClass) {
      setClassDetails(currentClass);
      setStreamMessages(currentClass.streamMessages);
      setTeachingMaterials(currentClass.teachingMaterials);
      setAssignments(currentClass.assignments);
      setPeople(currentClass.people);
      setSettings({ notifications: true, theme: "light" });
    } else {
      setClassDetails(null);
    }
  }, [classId]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Thêm tài liệu
  const handleAddMaterial = () => {
    if (!newMaterial.title || !newMaterial.link) {
      setError("Both title and link are required to add a material!");
      return;
    }
    setTeachingMaterials([...teachingMaterials, newMaterial]);
    setNewMaterial({ title: "", link: "" });
    setError("");
  };

  // Thêm bài tập
  const handleAddAssignment = () => {
    if (!newAssignment.title || !newAssignment.description || !newAssignment.dueDate) {
      setError("All fields are required to add an assignment!");
      return;
    }
    setAssignments([
      ...assignments,
      {
        id: assignments.length + 1,
        title: newAssignment.title,
        description: newAssignment.description,
        dueDate: newAssignment.dueDate,
      },
    ]);
    setNewAssignment({ title: "", description: "", dueDate: "" });
    setError("");
  };

  // Mở bài tập
  const handleOpenAssignment = (assignment) => {
    setSelectedAssignment(assignment);
    setStudentAnswer("");
    setGradingResult(null);
  };

  // Gửi câu trả lời
  const handleSubmitAnswer = () => {
    if (!studentAnswer) {
      setError("Answer cannot be empty!");
      return;
    }
    setError("");

    // Giả lập chấm điểm (thay bằng API OpenAI sau này)
    const mockGrade = Math.floor(Math.random() * 100);
    setGradingResult(`You scored ${mockGrade}%.`);
    setStudentAnswer("");
  };

  if (!classDetails) {
    return <h1>Class not found!</h1>;
  }

  return (
    <div className="bulletin-board-container">
      <h1 className="bulletin-board-title">{classDetails.name} - Bulletin Board</h1>

      {/* Tabs */}
      <div className="tabs">
        <button onClick={() => handleTabChange("stream")}>Stream</button>
        <button onClick={() => handleTabChange("classwork")}>Classwork</button>
        <button onClick={() => handleTabChange("people")}>People</button>
        <button onClick={() => handleTabChange("settings")}>Settings</button>
      </div>

      {/* Stream Tab */}
      {activeTab === "stream" && (
        <section className="stream">
          <h2>Stream</h2>
          <ul>
            {streamMessages.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
          <h3>Teaching Materials</h3>
          <ul>
            {teachingMaterials.map((material, index) => (
              <li key={index}>
                <strong>{material.title}:</strong>{" "}
                <a href={material.link} target="_blank" rel="noopener noreferrer">
                  {material.link}
                </a>
              </li>
            ))}
          </ul>
          <div className="add-material">
            <h3>Add New Material</h3>
            <input
              type="text"
              placeholder="Title"
              value={newMaterial.title}
              onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
            />
            <input
              type="url"
              placeholder="Link"
              value={newMaterial.link}
              onChange={(e) => setNewMaterial({ ...newMaterial, link: e.target.value })}
            />
            <button onClick={handleAddMaterial}>Add Material</button>
            {error && <p className="error">{error}</p>}
          </div>
        </section>
      )}

      {/* Classwork Tab */}
      {activeTab === "classwork" && (
  <section className="classwork">
    <h2>Classwork</h2>
    {selectedAssignment ? (
      <div className="assignment">
        <h3>{selectedAssignment.title}</h3>
        <p>{selectedAssignment.description}</p>
        <p>Due: {selectedAssignment.dueDate}</p>
        <textarea
          placeholder="Enter your answer here"
          value={studentAnswer}
          onChange={(e) => setStudentAnswer(e.target.value)}
        ></textarea>
        <button onClick={handleSubmitAnswer}>Submit Answer</button>
        {gradingResult && (
  <table className="grading-results-table">
    <thead>
      <tr>
        <th>Assignment</th>

        <th>Score</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{selectedAssignment.title}</td>

        <td>{gradingResult}</td>
      </tr>
    </tbody>
  </table>
)}
        <button onClick={() => setSelectedAssignment(null)}>Back to Assignments</button>
      </div>
    ) : (
      <>
        <div className="add-assignment">
          <h3>Add Assignment</h3>
          <input
            type="text"
            placeholder="Title"
            value={newAssignment.title}
            onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
          />
          <textarea
            placeholder="Description"
            value={newAssignment.description}
            onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
          ></textarea>
          <input
            type="date"
            value={newAssignment.dueDate}
            onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
          />
          <input
            type="file"
            accept=".doc,.docx,.pdf,.txt"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setNewAssignment({ ...newAssignment, file });
              }
            }}
          />
          <button onClick={handleAddAssignment}>Add</button>
          {error && <p className="error">{error}</p>}
        </div>
        <ul>
          {assignments.map((assignment) => (
            <li key={assignment.id}>
              <h4>{assignment.title}</h4>
              <p>{assignment.description}</p>
              {assignment.file && (
                <p>
                  <strong>File:</strong>{" "}
                  <a
                    href={URL.createObjectURL(assignment.file)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {assignment.file.name}
                  </a>
                </p>
              )}
              <button onClick={() => handleOpenAssignment(assignment)}>Open</button>
            </li>
          ))}
        </ul>
      </>
    )}
  </section>
)}


      {/* People Tab */}
{/* People Tab */}
{activeTab === "people" && (
  <section className="people">
    <h2>People</h2>

    {/* Danh sách giáo viên */}
    <div className="teacher-list">
      <h3>Teachers</h3>
      <ul>
        {people
          .filter((person) => person.role === "teacher")
          .map((teacher, index) => (
            <li key={index}>{teacher.name}</li>
          ))}
      </ul>
    </div>

    {/* Danh sách sinh viên */}
    <div className="student-list">
      <h3>Students</h3>
      <ul>
        {people
          .filter((person) => person.role === "student")
          .map((student, index) => (
            <li key={index}>{student.name}</li>
          ))}
      </ul>
    </div>
  </section>
)}


      {/* Settings Tab */}
      {activeTab === "settings" && (
  <section className="settings">
    <h2>Settings</h2>
    {/* Notifications Toggle */}
    <div className="setting-item">
      <p>Notifications: {settings.notifications ? "On" : "Off"}</p>
      <button
        onClick={() =>
          setSettings((prevSettings) => ({
            ...prevSettings,
            notifications: !prevSettings.notifications,
          }))
        }
      >
        {settings.notifications ? "Turn Off" : "Turn On"}
      </button>
    </div>

    {/* Theme Toggle */}
    <div className="setting-item">
      <p>Theme: {settings.theme}</p>
      <button
        onClick={() =>
          setSettings((prevSettings) => ({
            ...prevSettings,
            theme: prevSettings.theme === "light" ? "dark" : "light",
          }))
        }
      >
        Switch to {settings.theme === "light" ? "Dark" : "Light"} Theme
      </button>
    </div>
  </section>
)}

<button className="back-button" onClick={handleBack}>
  Back
</button>

    </div>
  );
};

export default BulletinBoard;
