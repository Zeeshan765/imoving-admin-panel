import { lazy } from 'react';


const UserManagement = lazy(() => import('../pages/UserManagement'));
const AddUser = lazy(() => import('../pages/UserManagement/AddUser'));
const UpdateUser = lazy(() => import('../pages/UserManagement/UpdateUser'));
const coreRoutes = [
  {
    path: '/users',
    title: 'User Management',
    component: UserManagement,
  },
  {
    path: '/users/add-user',
    title: 'Add User',
    component: AddUser,
  },
  {
    path: '/users/edit-user/:id',
    title: 'Update User',
    component: UpdateUser,
  },
];

const routes = [...coreRoutes];
export default routes;
