import React from "react";
import "./css/Payment.css";
import { Link, useNavigate } from 'react-router-dom';



export default function Payment() {
  return (
    
    <div className="container-fluid payment-bg">
      <div className="card payment-card">
        <div className="card-body">
          <div className="row">
            {/* Payment Details */}
            <div className="col-md-7">
              <div className="payment-header">
                <h5>
                  <i className="far fa-check-square"></i>
                  <b> ELIGIBLE </b> | Pay
                </h5>
              </div>
              <h4 className="text-success">$85.00</h4>
              <h5>Diabetes Pump & Supplies</h5>

              <div className="payment-info">
                <p>
                  <b>
                    Insurance Responsibility:{" "}
                    <span className="text-success">$71.76</span>
                  </b>
                  <a href="#!" className="text-primary ms-2">
                    Add insurance card
                  </a>
                </p>
                <p className="small text-muted">
                  Insurance claims and all necessary dependencies will be
                  submitted to your insurer for the covered portion of this
                  order.
                </p>
                <div className="insurance-box d-flex">
                  <span>Aetna-Open Access</span>
                  <span className="ms-auto">OAP</span>
                </div>
              </div>

              <hr />

              <div className="payment-info">
                <p>
                  <b>
                    Patient Balance:{" "}
                    <span className="text-success">$13.24</span>
                  </b>
                  <a href="#!" className="text-primary ms-2">
                    Add payment card
                  </a>
                </p>
                <p className="small text-muted">
                  This is an estimate for the portion of your order (not covered
                  by insurance) due today. Once insurance finalizes their
                  review, refunds and/or balances will reconcile automatically.
                </p>

                <div className="payment-method">
                  <label className="payment-option">
                    <input type="radio" name="payment" defaultChecked />
                    <div className="option-content">
                      <i className="fab fa-cc-visa text-primary"></i>
                      Visa Debit Card
                      <span className="ms-auto">************3456</span>
                    </div>
                  </label>

                  <label className="payment-option">
                    <input type="radio" name="payment" />
                    <div className="option-content">
                      <i className="fab fa-cc-mastercard text-dark"></i>
                      Mastercard Office
                      <span className="ms-auto">************1038</span>
                    </div>
                  </label>
                </div>
              </div>

              <button className="btn btn-primary btn-block mt-3">
                PROCEED TO PAYMENT
              </button>
            </div>

            {/* Order Recap */}
            <div className="col-md-5">
              <div className="order-recap">
                <a href="#!" className="text-end d-block text-primary mb-2">
                  Cancel and return to website
                </a>
                <div className="recap-card">
                  <h5>Order Recap</h5>
                  <div className="recap-item">
                    <span>Contracted Price</span>
                    <span className="ms-auto">$186.76</span>
                  </div>
                  <div className="recap-item">
                    <span>Amount toward deductible</span>
                    <span className="ms-auto">$0.00</span>
                  </div>
                  <div className="recap-item">
                    <span>Coinsurance (0%)</span>
                    <span className="ms-auto">+ $0.00</span>
                  </div>
                  <div className="recap-item">
                    <span>Copayment</span>
                    <span className="ms-auto">+ $40.00</span>
                  </div>
                  <hr />
                  <div className="recap-item">
                    <span>
                      <b>Total Deductible, Coinsurance, and Copay</b>
                    </span>
                    <span className="ms-auto">$40.00</span>
                  </div>
                  <div className="recap-item">
                    <span>
                      Maximum out-of-pocket on Insurance Policy (not reached)
                    </span>
                    <span className="ms-auto">$6500.00</span>
                  </div>
                  <hr />
                  <div className="recap-item">
                    <span>Insurance Responsibility</span>
                    <span className="ms-auto text-success">$71.76</span>
                  </div>
                  <div className="recap-item">
                    <span>Patient Balance</span>
                    <span className="ms-auto text-success">$13.24</span>
                  </div>
                  <hr />
                  <div className="recap-item total">
                    <span>
                      <b>Total</b>
                    </span>
                    <span className="ms-auto text-success">$85.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
