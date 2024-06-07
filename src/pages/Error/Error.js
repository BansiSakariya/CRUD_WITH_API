import React from 'react';
import {Link, useNavigate} from 'react-router-dom';

const Error = () => {
  const navigate = useNavigate();
  return (
    <main>
      <div className="container">
        <section className="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
          <h1>404</h1>
          <h2>The page you are looking for doesn't exist.</h2>
          {/* <Link  className="btn-custom" to="/dashboard">
            Back to home
          </Link> */}

          <div className="text-center">
            <button
              type="submit"
              className="btn-custom"
              onClick={() => navigate('/dashboard')}>
              Back to home
            </button>
          </div>
          {/* <img
            src="assets/img/not-found.svg"
            className="img-fluid py-5"
            alt="Page Not Found"
          /> */}
        </section>
      </div>
    </main>
  );
};

export default Error;
