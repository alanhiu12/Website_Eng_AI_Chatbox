import React, { useState } from "react";
import "./css/Payment.css";
import { Link, useNavigate } from 'react-router-dom';
import img1 from "../assets/pictures/momo.png";
import img2 from "../assets/pictures/zalopay.png";
import img3 from "../assets/pictures/visa.png";
import img4 from "../assets/pictures/master.png";
export default function Payment() {
  const navigate = useNavigate();

  // Logout functionality
  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("loggedIn");
    navigate("/login"); // Redirect to login pages after logout
  };
  const [selectedBenefits, setSelectedBenefits] = useState([]);

  const handleBenefitChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedBenefits([...selectedBenefits, value]);
    } else {
      setSelectedBenefits(selectedBenefits.filter((benefit) => benefit !== value));
    }
  };

  const handleProceed = () => {
    console.log("Selected Benefits:", selectedBenefits);
    alert(`You have selected: ${selectedBenefits.join(", ")}`);
  };

  return (
    <>
      {/* Header Section */}
      <header>
        <div className="container">
          <Link to="/" className="logo">LearnLinguaAI</Link>
          <nav>
            <ul>
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/classes">Classes</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/payment" className="active">Payment</Link></li>
              <li className="dropdown">
                <a href="#" className="dropbtn">See More</a>
                <div className="dropdown-content">
                  <Link to="/admin">Admin</Link>
                  <Link to="/user-profile">Profile</Link>
                  <Link to="/contact">Contact</Link>
                  <Link to="/setting">Setting</Link>
                  <Link to="/teacher">Teacher</Link>
                  <Link to="/chatbot">Chat</Link>
                  <a href="#">Logout</a>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Payment Content Section */}
      <div className="payment-container">
        <div className="container">
          {/* Payment Section */}
          <div className="payment-section">
            <h1>Payment</h1>
            <h3>Diabetes Pump & Supplies</h3>
            <div className="amount">$85.00</div>
            <p>Insurance Responsibility: <span className="text-success">$71.76</span></p>
            <p className="note">
              Insurance claims and all necessary dependencies will be submitted to your insurer for the covered portion of this order.
            </p>
            <div className="insurance-box">
              <span>Aetna-Open Access</span>
              <span className="float-right">OAP</span>
            </div>

            <h3>Patient Balance</h3>
            <p className="note">This is an estimate for the portion of your order not covered by insurance. Once finalized, refunds and/or balances will reconcile automatically.</p>

            {/* Payment Method */}
            <div className="payment-method">
              <label>
                <input type="radio" name="payment" defaultChecked />
                <img src={img1}/>
              </label>
              <label>
                <input type="radio" name="payment" />
                <img src={img2}/>
              </label>
              <label>
                <input type="radio" name="payment" />
                <img src={img3}/>
              </label>
              <label>
                <input type="radio" name="payment" />
                <img src={img4}/>
              </label>
            </div>

            <button className="payment-button">Proceed to Payment</button>
          </div>

          {/* Member Benefit Section */}
          <div className="order-recap">
            <h1>Member Benefit</h1>
            <p>Select your preferred benefits:</p>
            <div className="benefit-options">
              <label>
                <input
                  type="checkbox"
                  value="Free Gym Membership"
                  onChange={handleBenefitChange}
                />
                Free Gym Membership
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Wellness Programs"
                  onChange={handleBenefitChange}
                />
                Wellness Programs
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Telehealth Services"
                  onChange={handleBenefitChange}
                />
                Telehealth Services
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Mental Health Support"
                  onChange={handleBenefitChange}
                />
                Mental Health Support
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Discounted Prescriptions"
                  onChange={handleBenefitChange}
                />
                Discounted Prescriptions
              </label>
            </div>

            <button className="payment-button" onClick={handleProceed}>
              Confirm Benefits
            </button>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer>
        <div className="container">
          <p>&copy; 2024 LearnLinguaAI. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
}  