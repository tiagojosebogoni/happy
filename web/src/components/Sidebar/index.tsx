import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import mapMarketImg from '../../assets/map-marker.svg';

import { Container } from './styles';

export default function Sidebar() {
  const { goBack } = useHistory();

  return (
    <Container>
      <img src={mapMarketImg} alt="Happy" />

      <footer>
        <button type="button" onClick={goBack}>
          <FiArrowLeft size={24} color="#fff" />
        </button>
      </footer>
    </Container>
  );
}
