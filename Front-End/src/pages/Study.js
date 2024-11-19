import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/Study.css";

const Study = () => {
  const [classes, setClasses] = useState([
    {
      id: 1,
      name: "Math 101",
      teacher: "Mr. Smith",
      description: "Learn Algebra and Geometry basics.",
      code: "MATH101",
    },
    {
      id: 2,
      name: "Physics",
      teacher: "Ms. Johnson",
      description: "Introduction to Newtonian Physics.",
      code: "PHYSICS",
    },
  ]);

  const [popup, setPopup] = useState(null); // "add" | "join" | null
  const [newClass, setNewClass] = useState({
    name: "",
    teacher: "",
    description: "",
  });
  const [joinCode, setJoinCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePopupOpen = (type) => {
    setPopup(type); // Hiển thị popup: "add" hoặc "join"
  };

  const handlePopupClose = () => {
    setPopup(null); // Đóng popup
    setErrorMessage("");
    setNewClass({ name: "", teacher: "", description: "" });
    setJoinCode("");
  };

  // Thêm lớp học
  const handleAddClass = () => {
    if (!newClass.name || !newClass.teacher || !newClass.description) {
      alert("Please fill in all fields to add a class.");
      return;
    }
    const newClassEntry = {
      ...newClass,
      id: classes.length + 1,
      code: newClass.name.replace(/\s+/g, "").toUpperCase(), // Tạo mã lớp từ tên lớp
    };
    setClasses([...classes, newClassEntry]);
    handlePopupClose();
    alert(`Class "${newClassEntry.name}" added successfully!`);
  };

  // Tham gia lớp học
  const handleJoinClass = () => {
    const foundClass = classes.find((classItem) => classItem.code === joinCode);
    if (foundClass) {
      alert(`Successfully joined class: ${foundClass.name}`);
      handlePopupClose();
    } else {
      setErrorMessage("Invalid class code. Please try again.");
    }
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/login");
  };

  return (
    <div>
      <header className="study-header">
        <div className="container">
          <Link to="/" className="logo">LearnLinguaAI</Link>
          <nav>
            <ul>
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/classes">Classes</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/payment">Payment</Link></li>
              <li className="dropdown">
                <a href="#" className="dropbtn">More</a>
                <div className="dropdown-content">
                  <Link to="/profile">Profile</Link>
                  <Link to="/settings">Settings</Link>
                  <a href="#" onClick={handleLogout}>Logout</a>
                </div>
              </li>
            </ul>
          </nav>
          <div className="shikono">
            <button onClick={() => handlePopupOpen("add")}>Add Class</button>
            <button onClick={() => handlePopupOpen("join")}>Join Class</button>
          </div>
        </div>
      </header>

      <main className="study-main">
        {popup && (
          <div className="popup-section">
            <div className="popup-container">
              <h2>{popup === "add" ? "Add a New Class" : "Join a Class"}</h2>
              {popup === "add" ? (
                <>
                  <input
                    type="text"
                    placeholder="Class Name"
                    value={newClass.name}
                    onChange={(e) =>
                      setNewClass({ ...newClass, name: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Teacher Name"
                    value={newClass.teacher}
                    onChange={(e) =>
                      setNewClass({ ...newClass, teacher: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Class Description"
                    value={newClass.description}
                    onChange={(e) =>
                      setNewClass({
                        ...newClass,
                        description: e.target.value,
                      })
                    }
                  />
                  <button onClick={handleAddClass}>Add Class</button>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Enter class code"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value)}
                  />
                  <button onClick={handleJoinClass}>Join Class</button>
                  {errorMessage && <p className="error-message">{errorMessage}</p>}
                </>
              )}
              <button onClick={handlePopupClose}>Cancel</button>
            </div>
          </div>
        )}

        <section className="class-grid">
          {classes.map((classItem) => (
            <div className="class-card" key={classItem.id}>
              <h2>{classItem.name}</h2>
              <p><strong>Teacher:</strong> {classItem.teacher}</p>
              <p>{classItem.description}</p>
              <button className="view-class-btn">View Class</button>
            </div>
          ))}
        </section>
      </main>

      <footer className="study-footer">
        <p>&copy; 2024 LearnLinguaAI. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Study;
