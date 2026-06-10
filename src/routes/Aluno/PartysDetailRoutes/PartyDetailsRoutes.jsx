import React from 'react';
import { Route } from 'react-router-dom';
import PartyDetails from '../../../pages/Aluno/PartyDetails';

const PartyDetailsRoutes = () => [
  <Route key="party-details" path="/parties/:id" element={<PartyDetails />} />
];

export default PartyDetailsRoutes;