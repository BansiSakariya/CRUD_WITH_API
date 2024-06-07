import React from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import constants from '../../utils/constants';
const Sidebar = () => {
  const {pathname} = useLocation();

  const navigate = useNavigate();

  const logout = async () => {
    localStorage.removeItem(constants.USER);
    navigate('/login');
    window.location.reload();
  };
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <a
            className={
              pathname === '/dashboard' ? 'nav-link' : 'nav-link collapsed'
            }
            href="/dashboard">
            <i className="bi bi-grid" />
            <span>Dashboard</span>
          </a>
        </li>
        <li className="nav-item">
          <a
            className={
              pathname.includes('/shape') ? 'nav-link' : 'nav-link collapsed'
            }
            href="/shape">
            <i class="bi bi-people" /> <span>Shape</span>
          </a>
        </li>

        <li className="nav-item">
          <Link className="nav-link collapsed" onClick={logout} to={'/login'}>
            <i class="bi bi-box-arrow-left"></i>
            <span>Logout</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
