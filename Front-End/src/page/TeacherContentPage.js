import React, { useState } from 'react';
import { useTable } from 'react-table';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Link, useNavigate } from 'react-router-dom';
import './css/TeacherManagement.css'; // Import CSS

const TeacherManagement = () => {
  const navigate = useNavigate(); // Declare navigate
  const [exercises, setExercises] = useState([]);
  const [newExercise, setNewExercise] = useState({ title: '', description: '' });
  const [studentsProgress, setStudentsProgress] = useState([
    { name: 'Học viên 1', progress: 70 },
    { name: 'Học viên 2', progress: 85 },
    { name: 'Học viên 3', progress: 60 },
  ]);
  const [students, setStudents] = useState([
    { name: 'Học viên 1', score: 90 },
    { name: 'Học viên 2', score: 75 },
    { name: 'Học viên 3', score: 60 },
  ]);

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("loggedIn");
    navigate("/login"); // Redirect to login pages after logout
  };

  const handleAddExercise = () => {
    setExercises([...exercises, newExercise]);
    setNewExercise({ title: '', description: '' });
  };

  const handleDeleteExercise = (index) => {
    const updatedExercises = exercises.filter((_, i) => i !== index);
    setExercises(updatedExercises);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'Tiêu đề',
        accessor: 'title',
      },
      {
        Header: 'Mô tả',
        accessor: 'description',
      },
      {
        Header: 'Hành động',
        accessor: 'action',
        Cell: ({ row }) => (
          <button onClick={() => handleDeleteExercise(row.index)}>Xóa</button>
        ),
      },
    ],
    []
  );

  const studentColumns = React.useMemo(
    () => [
      {
        Header: 'Tên Học Viên',
        accessor: 'name',
      },
      {
        Header: 'Điểm',
        accessor: 'score',
      },
    ],
    []
  );

  const data = React.useMemo(() => exercises, [exercises]);
  const studentData = React.useMemo(() => students, [students]);

  return (
    <div>
      <header>
        <div className="container">
          <Link to="/" className="logo">LearnLinguaAI</Link>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/study">Learn</Link></li>
              <li><Link to="/about">About</Link></li>
              <li className="dropdown">
                <a href="#" className="dropbtn">See More</a>
                <div className="dropdown-content">
                  <Link to="/user-profile">Profile</Link>
                  <Link to="/contact">Contact</Link>
                  <Link to="/setting">Setting</Link>
                  <Link to="/teacher">Teacher</Link>
                  <a href="#" onClick={handleLogout}>Logout</a>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <h1 className="teacher-management-title">Quản lý bài tập</h1>

      {/* Form thêm bài tập */}
      <table style={{ marginBottom: '20px', width: '100%' }}>
        <thead>
          <tr>
            <th>Tiêu đề</th>
            <th>Mô tả</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                placeholder="Tiêu đề"
                value={newExercise.title}
                onChange={(e) => setNewExercise({ ...newExercise, title: e.target.value })}
              />
            </td>
            <td>
              <textarea
                placeholder="Mô tả"
                value={newExercise.description}
                onChange={(e) => setNewExercise({ ...newExercise, description: e.target.value })}
              />
            </td>
            <td>
              <button onClick={handleAddExercise}>Thêm bài tập</button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Danh sách bài tập */}
      <h2 className="teacher-management-subtitle">Danh sách bài tập</h2>
      <Table columns={columns} data={data} />

      {/* Phân tích tiến độ học viên */}
      <h2 className="teacher-management-subtitle">Phân tích tiến độ học viên</h2>
      <div className="chart-container">
        <LineChart width={800} height={400} data={studentsProgress}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          <Line type="monotone" dataKey="progress" stroke="#8884d8" />
        </LineChart>
      </div>

      {/* Danh sách học viên và điểm số */}
      <h2 className="teacher-management-subtitle">Điểm Học Viên</h2>
      <Table columns={studentColumns} data={studentData} />

      <footer>
        <div className="container">
          <p>&copy; 2024 LearnLinguaAI. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const Table = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <table {...getTableProps()} style={{ border: '1px solid black', marginBottom: '20px', width: '100%' }}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TeacherManagement;
