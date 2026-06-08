import React from 'react';
import { Route } from 'react-router-dom';
import Analytics from '../pages/Admin/Analytics';
import Delegacao from '../pages/Admin/Delegacao';
import ManagementBibliotecarios from '../pages/Admin/ManagementBibliotecarios';

const AdminRoutes = ({ user } = {}) => [
  <Route key="analytics" path="/admin/analytics" element={<Analytics user={user} />} />,
  <Route key="delegacao" path="/admin/delegacao" element={<Delegacao user={user} />} />,
  <Route key="bibliotecarios" path="/admin/bibliotecarios" element={<ManagementBibliotecarios user={user} />} />
];

export default AdminRoutes;