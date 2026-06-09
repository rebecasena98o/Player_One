import React from 'react';
import { Route } from 'react-router-dom';
import CreateParty from '../../../pages/Aluno/CreateParty'; // Certifique-se de ajustar a quantidade de pastas até a sua página

const CreatePartysRoutes = () => [
  <Route key="create-party" path="/parties/create" element={<CreateParty />} />
];

export default CreatePartysRoutes;