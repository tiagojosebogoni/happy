import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';

import {
  Container,
  Content,
  Main,
  Location,
  EnterApp,
  EnterAppRestricted,
} from './styles';

const Lading: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="Happy" />

        <Location>
          <strong>Balneário Camboriú</strong>
          <span>Santa Catarina</span>
        </Location>

        <Main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </Main>

        <EnterAppRestricted to="/login">
          <strong>Acesso restrito</strong>
        </EnterAppRestricted>

        <EnterApp to="/app">
          <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6 )" />
        </EnterApp>
      </Content>
    </Container>
  );
};
export default Lading;
