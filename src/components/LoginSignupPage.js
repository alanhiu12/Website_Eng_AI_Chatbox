// src/components/LoginSignupPage.js
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './LoginSignupPage.css';

const LoginSignupPage = () => {
  // State to toggle between login and signup forms
  const [isLogin, setIsLogin] = useState(true);

  // Validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    ...(isLogin ? {} : { confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required') }),
  });

  // Handle form submission
  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    if (isLogin) {
      // Handle login logic
      console.log('Login values:', values);
    } else {
      // Handle signup logic
      console.log('Signup values:', values);
    }
    setTimeout(() => {
      setSubmitting(false);
    }, 2000);
  };

  return (
    <div className="login-signup-page">
      <div className="form-container">
        <h2>{isLogin ? 'Login' : 'Signup'}</h2>

        <Formik
          initialValues={{
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-field">
                <label htmlFor="email">Email</label>
                <Field type="email" name="email" />
                <ErrorMessage name="email" component="div" className="error-message" />
              </div>

              <div className="form-field">
                <label htmlFor="password">Password</label>
                <Field type="password" name="password" />
                <ErrorMessage name="password" component="div" className="error-message" />
              </div>

              {!isLogin && (
                <div className="form-field">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <Field type="password" name="confirmPassword" />
                  <ErrorMessage name="confirmPassword" component="div" className="error-message" />
                </div>
              )}

              <button type="submit" disabled={isSubmitting}>
                {isLogin ? 'Login' : 'Signup'}
              </button>
            </Form>
          )}
        </Formik>

        <p className="toggle-text">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Signup here' : 'Login here'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginSignupPage;
