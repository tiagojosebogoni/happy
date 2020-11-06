import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
`;

export const Content = styled.div`
  position: relative;
  display: flex;
  width: 520px;
  align-items: center;
  justify-content: center;

  header {
    position: absolute;
    top: 20px;
    right: 20px;

    button {
      width: 48px;
      height: 48px;

      border: 0;

      background: #fff;
      border-radius: 16px;

      cursor: pointer;

      display: flex;
      justify-content: center;
      align-items: center;

      filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    }
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  width: 360px;

  h1 {
    color: #5c8599;
    font-size: 32px;
    line-height: 34px;
    padding-bottom: 40px;
  }
`;
