import React from 'react';

import logoLarge from '../../assets/logoLarge.svg';

import { Container, Content, Location } from './styles';

const Background: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src={logoLarge} alt="Happy" />

        <Location>
          <strong>Balneário Camboriú</strong>
          <span>Santa Catarina</span>
        </Location>
      </Content>
    </Container>
  );
};

export default Background;
