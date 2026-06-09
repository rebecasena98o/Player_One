// AdminRoutes.jsx
import { Route } from 'react-router-dom';
import AdminDashboard from './Dashboard'; 
import ManageGames from './ManageGames';       
import AdminProfile from './AdminProfile';     
import ManageUsers from './ManageUsers';       
import ManageParties from './ManageParties';   

export default function AdminRoutes() {
  return [
    // Rota 1: Dashboard Central
    <Route key="admin-dash" path="/admin/dashboard" element={<AdminDashboard />} />,

    // Rota 2: Gerenciar Jogos
    <Route key="admin-games" path="/admin/games" element={<ManageGames />} />,

    // Rota 3: Perfil do Administrador
    <Route key="admin-profile" path="/admin/profile" element={<AdminProfile />} />,

    // Rota 4: Gerenciar Usuários
    <Route key="admin-users" path="/admin/users" element={<ManageUsers />} />,

    // Rota 5: Gerenciar Party's
    <Route key="admin-parties" path="/admin/parties" element={<ManageParties />} />
  ];
}