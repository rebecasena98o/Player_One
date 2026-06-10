import React from 'react';
import { Route } from 'react-router-dom';
import MyPartys from '../../../pages/Aluno/MyPartys';

const MyPartysRoutes = () => [
  <Route key="my-partys" path="/parties/my" element={<MyPartys />} />
];

export default MyPartysRoutes;