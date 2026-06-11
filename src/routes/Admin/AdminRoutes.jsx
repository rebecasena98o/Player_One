import React from 'react';
import { Route } from 'react-router-dom';

// 🟢 CORRIGIDO: Apontando diretamente para o arquivo correspondente na pasta pages
import AdminDashboard from '../../pages/Admin/Dashboard.jsx';
import ManageGames from '../../pages/Admin/ManageGames.jsx';
import ManageUsers from '../../pages/Admin/ManageUsers.jsx';
import ManageParties from '../../pages/Admin/ManageParties.jsx';
import AdminProfile from '../../pages/Admin/AdminProfile.jsx';

export default function AdminRoutes() {
  return [
    <Route key="admin-dashboard" path="/admin/dashboard" element={<AdminDashboard />} />,
    <Route key="admin-games" path="/admin/games" element={<ManageGames />} />,
    <Route key="admin-users" path="/admin/users" element={<ManageUsers />} />,
    <Route key="admin-parties" path="/admin/parties" element={<ManageParties />} />,
    <Route key="admin-profile" path="/admin/profile" element={<AdminProfile />} />
  ];
}