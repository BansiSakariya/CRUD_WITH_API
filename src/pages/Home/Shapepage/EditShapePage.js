import React, {useContext, useState, useEffect} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';

import {fetchDataFromAPI} from '../../../utils/api';
import {useFormik} from 'formik';
import {toast} from 'react-toastify';
import CommonButton from '../../../components/CommonButton/CommonButton';
import {FormGroup} from 'react-bootstrap';
import * as Yup from 'yup';
import Processing from '../../../components/Processing/Processing';
import {getUser} from '../../../utils/constants';

const EditShapePage = () => {
  const navigate = useNavigate();
  const [url, setURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const user = JSON.parse(getUser());
  const state = useParams();
  console.log('state', state);

  useEffect(() => {
    getShape();
  }, []);

  // get Shape api call
  const getShape = () => {
    setLoading(true);
    fetchDataFromAPI(
      `shape/getshape?id=${state?.id}`,
      'get',
      '',
      user?.authToken,
    )
      .then((res) => {
        console.log('res -->', res?.data);
        let data = res?.data;
        setData(res?.data);
        formik.setFieldValue('image', data?.image);
        formik.setFieldValue('shapeName', data?.name);
        setLoading(false);
      })
      .catch((error) => {
        console.log('error', error);
        setLoading(false);
      });
  };

  // const getData = () => {
  //   setLoading(true);
  //   formik.setFieldValue('image', data?.image);
  //   formik.setFieldValue('shapeName', data?.name);
  //   setLoading(false);
  // };

  const formik = useFormik({
    initialValues: {
      image: null,
      shapeName: '',
    },
    validationSchema: Yup.object({
      image: Yup.mixed().required('Please select shape image.'),
      shapeName: Yup.string().required('Please enter shape name'),
    }),
    onSubmit: (values) => {
      const {image, shapeName} = values;

      const body = {
        image: url,
        name: shapeName,
      };

      console.log('body', body);

      try {
        setLoading(true);

        fetchDataFromAPI(
          `shape/updateshape?id=${state?.id}`,
          'put',
          body,
          user?.authToken,
        )
          .then((res) => {
            toast.success(res?.message, {
              position: toast.POSITION.TOP_RIGHT,
              className: 'bg-success text-white',
            });
            setLoading(false);
            navigate('/shape');
            console.log('res', res);
          })
          .catch((error) => {
            toast.error(error?.response?.data?.message, {
              position: toast.POSITION.TOP_RIGHT,
              className: 'bg-danger text-white',
            });
            setLoading(false);
            console.log('error', error);
          });
      } catch (error) {
        console.log('catch error: ', error);
        setLoading(false);
      }
    },
  });

  const handleFileChange = (e) => {
    formik.setFieldValue('image', e.target.files[0]);
    // const image = e?.target?.files[0];
    const data = new FormData();
    data.append('image', e?.target?.files[0]);
    // Reset value for the image field
    // Clear any validation error for the image field
    setLoading(true);
    fetchDataFromAPI('upload', 'post', data, '')
      .then((res) => {
        console.log('res: ', res?.data);

        setURL(res?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log('error: ', error);
        setLoading(false);
      });
  };

  return (
    <main id="main" className="main">
      {loading && <Processing />}
      <div className="pagetitle">
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/shape">Shapes</Link>
            </li>
            <li className="breadcrumb-item active">
              <span>Edit Shape</span>
            </li>
          </ol>
        </nav>
      </div>
      {/* End Page Title */}
      <section className="section profile">
        <div className="row">
          <div className="card">
            <div className="card-body pt-3">
              {/* Bordered Tabs */}

              <div className="tab-content">
                <div className="pt-3" id="profile-edit">
                  {/* Profile Edit Form */}
                  <form onSubmit={formik.handleSubmit}>
                    <div className="row mb-3"></div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label htmlFor="reg" className="form-label">
                          Selete Shape Image
                        </label>
                        <FormGroup>
                          <input
                            className={`form-control form-control-file  ${
                              formik.touched.image && formik.errors.image
                                ? 'is-invalid'
                                : ''
                            }`}
                            type="file"
                            name="image"
                            accept="image/*"
                            id="image"
                            onChange={handleFileChange}
                            // onChange={(e) => {
                            //   formik.setFieldValue(
                            //     'image',
                            //     e.target.files[0],
                            //   );
                            // }}
                          />

                          {formik.touched.image &&
                            formik.errors.image &&
                            !url && (
                              <div className="text-danger">
                                {formik.errors.image}
                              </div>
                            )}
                        </FormGroup>
                      </div>

                      <div className="col-md-6  ">
                        <label htmlFor="shapeName" className="form-label">
                          Shape Name
                        </label>

                        <input
                          name="shapeName"
                          type="text"
                          className="form-control"
                          id="shapeName"
                          value={formik.values.shapeName}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (/^[A-Za-z\s]*$/.test(value)) {
                              formik.setFieldValue(
                                'shapeName',
                                value.trimStart(),
                              );
                            }
                          }}
                        />
                        {formik.touched.shapeName &&
                          formik.errors.shapeName && (
                            <div className="text-danger">
                              {formik.errors.shapeName}
                            </div>
                          )}
                      </div>
                    </div>

                    <div className="text-center mt-3">
                      <CommonButton
                        loading={loading}
                        onClick={formik.handleSubmit}
                        label="Edit Shape"
                        loadingLabel="Please wait..."
                      />
                    </div>
                  </form>
                  {/* End Profile Edit Form */}
                </div>
              </div>
              {/* End Bordered Tabs */}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default EditShapePage;
