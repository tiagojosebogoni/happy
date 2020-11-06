import styled from 'styled-components';
import { Link } from 'react-router-dom';

import landing from '../../assets/landing.svg';

export const Container = styled.div`
  background: linear-gradient(329.54deg, #29b6d1, #00c7c7);
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  position: relative;
  width: 100%;
  max-width: 1100px;

  height: 100%;
  max-height: 680px;

  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;

  background: url(${landing}) no-repeat 80% center;
`;

export const Main = styled.div`
  max-width: 350px;

  h1 {
    font-size: 75px;
    font-weight: 900;
    line-height: 70px;
  }

  p {
    margin-top: 40px;
    font-size: 24px;
    line-height: 34px;
  }
`;

export const Location = styled.div`
  position: absolute;
  left: 300px;
  top: 0;

  font-size: 24px;
  line-height: 34px;

  display: flex;
  flex-direction: column;

  strong {
    font-weight: 800;
  }
`;

export const EnterApp = styled(Link)`
  position: absolute;
  right: 0;
  bottom: 0;

  width: 80px;
  height: 80px;
  background: #ffd666;
  border-radius: 30px;

  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  :hover {
    background: #96feff;
  }
`;

export const EnterAppRestricted = styled(Link)`
  position: absolute;
  right: 0;
  top: 0;

  width: 222px;
  height: 56px;
  border-radius: 20px;
  background: #12d4e0;
  border-radius: 30px;
  text-decoration: none;

  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  strong {
    color: #fff;
  }

  :hover {
    background: #96feff;
  }
`;
