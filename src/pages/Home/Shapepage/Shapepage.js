import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {fetchDataFromAPI} from '../../../utils/api';
import moment from 'moment';

import DeleteModal from '../../../components/DeleteModal/DeleteModal';
import {toast} from 'react-toastify';
import Processing from '../../../components/Processing/Processing';
import {getUser} from '../../../utils/constants';
const Shapepage = () => {
  const navigate = useNavigate();
  const [shape, setShape] = useState([]);
  const [loading, setLoading] = useState(false);

  const [deleteId, setDeleteId] = useState(null);
  const user = JSON.parse(getUser());
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    getShape();
  }, []);

  // this use Dffect for delete id
  useEffect(() => {
    if (deleteId) {
      setShowDeleteModal(true);
    } else {
      setShowDeleteModal(false);
    }
  }, [deleteId]);

  // get Shape api call
  const getShape = () => {
    setLoading(true);
    fetchDataFromAPI('shape/getshape', 'get', '', user?.authToken)
      .then((res) => {
        console.log('res', res);
        setShape(res?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log('error', error);
        setLoading(false);
      });
  };

  // hide delete modal function
  const hideDeleteModal = () => {
    setDeleteId(null);
  };

  // api for delete shape
  const deleteContent = () => {
    setLoading(true);
    fetchDataFromAPI(
      `shape/deleteshape?id=${deleteId}`,
      'delete',
      '',
      user?.authToken,
    )
      .then((res) => {
        toast.success(res?.message, {
          position: toast.POSITION.TOP_RIGHT,
          className: 'bg-success text-white',
        });
        getShape();
        setDeleteId(null);
        setShowDeleteModal(false);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Content error: ', error);
        toast.error(error?.response?.data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          className: 'bg-danger text-white',
        });
        setLoading(false);
      });
  };

  return (
    <main id="main" className="main">
      {loading && <Processing />}
      <div className="pagetitle">
        {/* <h1>Shape</h1> */}
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/dashboard">Dashboard</Link>
            </li>

            <li className="breadcrumb-item active">Shape</li>
          </ol>
        </nav>
      </div>
      {/* End Page Title */}
      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-lg-between btn-View">
                  <div>
                    {/* <h3 className=" font-weight-bold">Users List</h3> */}
                  </div>

                  <div className=" text-center ">
                    <button
                      type="submit"
                      className="btn-custom"
                      onClick={() => navigate('/add-shape')}>
                      Add Shape
                    </button>
                  </div>
                </div>
                <h5 className="card-title">Shape Date</h5>
                {/* Default Table */}
                {shape?.length === 0 ? (
                  <p className="text-center">No data available</p>
                ) : (
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Updated At</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {shape.map((item, index) => {
                        return (
                          <tr className="align-middle">
                            <th scope="row">{index + 1}</th>
                            <td>
                              <img
                                src={
                                  item?.image
                                    ? item?.image
                                    : require('../../../assets/images/account.png')
                                }
                                alt="Profile"
                                style={{height: 50, width: 50}}
                                className="rounded-circle"
                              />
                            </td>
                            <td>{item?.name}</td>
                            <td>
                              {moment(item?.updatedAt).format('MMMM Do YYYY')}
                            </td>
                            <td>
                              {moment(item?.createdAt).format('MMMM Do YYYY')}
                            </td>

                            <td className="">
                              <div className="d-flex">
                                <div
                                  className="edit-icon btn btn-sm btn-primary me-2"
                                  role="button"
                                  onClick={(e) => {
                                    navigate(`/edit-shape/${item?._id}`);
                                  }}>
                                  <i class="bi bi-pencil-square"></i>
                                </div>
                                <div
                                  role="button"
                                  className="delete-icon btn btn-sm btn-danger"
                                  // onClick={() => deleteContent(item?._id)}
                                  onClick={(e) => {
                                    setDeleteId(item?._id);
                                  }}>
                                  <i class="bi bi-trash"></i>
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
                {/* End Default Table Example */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <DeleteModal
        show={showDeleteModal}
        onHide={hideDeleteModal}
        onDelete={deleteContent}
        title="Delete Shape"
        body="Are you sure you want to delete this record?"
      />
    </main>
  );
};

export default Shapepage;
