import React from 'react';
import { Route } from 'react-router-dom';
import PartiesList from '../../../pages/Aluno/PartysList';

const PartiesRoutes = () => [
  <Route key="parties-list" path="/parties" element={<PartiesList />} />
];

export default PartiesRoutes;