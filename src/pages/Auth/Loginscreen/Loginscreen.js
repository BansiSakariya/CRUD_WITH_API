import React, {useEffect, useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useNavigate} from 'react-router-dom';
import constants, {saveUserLocally} from '../../../utils/constants';
import {fetchDataFromAPI} from '../../../utils/api';

import CommonButton from '../../../components/CommonButton/CommonButton';
import {toast} from 'react-toastify';

const Loginscreen = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const USER = localStorage.getItem(constants.USER);
    if (USER) {
      navigate('/dashboard');
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email')
        .required('Please enter your email'),
      password: Yup.string()
        .matches(/^\S*$/, 'Space not valid in password.')
        .required('Please enter your password'),
    }),

    onSubmit: (values) => {
      const {email, password} = values;

      const body = {
        email: email,
        password: password,
      };
      console.log('body', body);

      setLoading(true);
      fetchDataFromAPI('admin/login', 'post', body, '')
        .then((res) => {
          console.log('res', res);
          setLoading(false);

          toast.success(res?.message, {
            position: toast.POSITION.TOP_RIGHT,
            className: 'bg-success text-white',
          });
          saveUserLocally(JSON.stringify(res?.data));
          navigate('/dashboard');
        })
        .catch((error) => {
          setLoading(false);
          toast.error(error?.message, {
            position: toast.POSITION.TOP_RIGHT,
            className: 'bg-danger text-white',
          });
          console.log('error', error);
        });
      // functionlogin(values);
    },
  });

  // const functionlogin = (values) => {
  //   dataContext?.setLoading(true);
  //   const body = {
  //     email: values?.email,
  //     password: values?.password,
  //   };

  //   console.log('body', body);

  //   fetchDataFromAPI('login', 'post', body, '')
  //     .then((response) => {
  //       dataContext?.setLoading(false);
  //       console.log('admin login responce', response);
  //       saveUserLocally(JSON.stringify(response?.data));
  //       navigate('/');
  //     })
  //     .catch((error) => {
  //       console.log('catch error:', error?.message);

  //       dataContext?.setLoading(false);
  //     });
  // };

  return (
    <main>
      <div className="container">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div className="d-flex justify-content-center py-4">
                  <a
                    style={{textDecorationLine: 'none'}}
                    href="index.html"
                    className="logo d-flex align-items-center w-auto">
                    {/* <img src="assets/img/logo.png" alt="" /> */}
                    <span className="d-none d-lg-block">Admin</span>
                  </a>
                </div>
                {/* End Logo */}
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="pt-4 pb-2">
                      <h5 className="card-title text-center pb-0 fs-4">
                        Login to Your Account
                      </h5>
                      <p className="text-center small">
                        Enter your email &amp; password to login
                      </p>
                    </div>
                    <form
                      className="row g-3 needs-validation"
                      onSubmit={formik.handleSubmit}>
                      <div className="col-12">
                        <label htmlFor="yourPassword" className="form-label">
                          Email
                        </label>
                        <input
                          placeholder="Please enter your email"
                          type="text"
                          name="email"
                          className={`form-control ${
                            formik.touched.email && formik.errors.email
                              ? 'is-invalid'
                              : ''
                          }`}
                          id="email"
                          value={formik.values.email}
                          onChange={(e) => {
                            formik.setFieldValue(
                              'email',
                              e.target.value?.trimStart(),
                            );
                          }}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email && (
                          <div className="invalid-feedback">
                            {formik.errors.email}
                          </div>
                        )}
                      </div>
                      <div className="col-12 ">
                        <label htmlFor="yourPassword" className="form-label">
                          Password
                        </label>

                        {/* <div className="d-flex"> */}
                        <input
                          placeholder="Password"
                          type={showPass ? 'text' : 'password'}
                          name="password"
                          className={`form-control ${
                            formik.touched.password && formik.errors.password
                              ? 'is-invalid'
                              : ''
                          }`}
                          id="yourPassword"
                          value={formik.values.password}
                          onChange={(e) => {
                            formik.setFieldValue(
                              'password',
                              e.target.value?.trimStart(),
                            );
                          }}
                          onBlur={formik.handleBlur}
                          // style={{
                          //   borderTopRightRadius: '0',
                          //   borderBottomRightRadius: '0',
                          // }}
                        />
                        {/* <button
                          type="button"
                          className="btn btn-outline-secondary"
                          style={{
                            borderTopLeftRadius: '0', // Adjust the radius value
                            borderBottomLeftRadius: '0', // Adjust the radius value
                          }}
                          onClick={() => setShowPass(!showPass)}>
                          {showPass ? (
                            <i className="bi bi-eye-fill"></i>
                          ) : (
                            <i className="bi bi-eye-slash-fill"></i>
                          )}
                        </button> */}
                        {formik.touched.password && formik.errors.password && (
                          <div className="invalid-feedback">
                            {formik.errors.password}
                          </div>
                        )}
                        {/* </div> */}

                        {/* <button
                            type="button"
                            className="btn btn-outline-secondary"
                            style={{
                              borderTopLeftRadius: '0', // Adjust the radius value
                              borderBottomLeftRadius: '0', // Adjust the radius value
                            }}
                            onClick={() => setShowPass(!showPass)}>
                            {showPass ? (
                              <i className="bi bi-eye-fill"></i>
                            ) : (
                              <i className="bi bi-eye-slash-fill"></i>
                            )}
                          </button> */}
                      </div>
                      <div className="text-center mt-3">
                        <CommonButton
                          loading={loading}
                          // onClick={formik.handleSubmit}
                          label="Login"
                          loadingLabel="Please wait..."
                        />
                      </div>
                      {/* <div className="col-12">
                      <p className="small mb-0">
                        Don't have account?{" "}
                        <a href="pages-register.html">Create an account</a>
                      </p>
                    </div> */}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Loginscreen;
