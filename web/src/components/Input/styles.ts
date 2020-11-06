import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  & + div {
    padding-top: 16px;
  }

  span {
    color: #8fa7b3;
    font-size: 16px;
    padding-bottom: 8px;
  }

  input {
    width: 100%;
    height: 64px;
    padding-left: 24px;

    font-size: 16px;
    color: #5c8599;

    background: #f5f8fa;
    border: 1px solid #a1e9c5;
    box-sizing: border-box;
    border-radius: 20px;
  }
`;
