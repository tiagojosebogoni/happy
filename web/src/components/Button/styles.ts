import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #37c77f;
  height: 64px;
  border-radius: 20px;
  border: 0;
  padding: 0 16px;
  color: #fff;
  width: 100%;
  font-weight: 700;
  margin-top: 42px;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#37C77F')};
  }
`;
