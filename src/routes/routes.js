import Dashboardpage from '../pages/Home/Dashboardpage/Dashboardpage';
import AddShapePage from '../pages/Home/Shapepage/AddShapePage';
import EditShapePage from '../pages/Home/Shapepage/EditShapePage';
import Shapepage from '../pages/Home/Shapepage/Shapepage';
import PrivateRoute from './RouteProtection';

const routes = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <Dashboardpage />
      </PrivateRoute>
    ),
  },

  {
    title: 'Shape',
    path: '/shape',
    element: (
      <PrivateRoute>
        <Shapepage />
      </PrivateRoute>
    ),
  },

  {
    title: 'Edit Shape',
    path: '/edit-shape/:id',
    element: (
      <PrivateRoute>
        <EditShapePage />
      </PrivateRoute>
    ),
  },

  {
    title: 'Add Shape',
    path: '/add-shape',
    element: (
      <PrivateRoute>
        <AddShapePage />
      </PrivateRoute>
    ),
  },
];

export default routes;
