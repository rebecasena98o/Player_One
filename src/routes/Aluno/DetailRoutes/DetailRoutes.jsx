import React from 'react';
import { Route } from 'react-router-dom';
import Detail from '../../../pages/Aluno/Detail'; // Importa a página configurada acima

const DetailGameRoutes = () => [
  // Mapeamento correto do parâmetro :id correspondente ao useParams() configurado no Detail.jsx
  <Route key="game-detail" path="/jogo/:id" element={<Detail />} />
];

export default DetailGameRoutes;