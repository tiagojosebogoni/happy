import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
`;

export const Background = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;

  background: linear-gradient(329.54deg, #29b6d1 0%, #00c7c7 100%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const Content = styled.div`
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

export const RememberContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;

  a {
    text-decoration: none;

    font-size: 16px;
    line-height: 22px;

    color: #8fa7b3;
  }
`;

export const Remember = styled.div`
  input {
    background: #37c77f;

    box-sizing: border-box;
    border-radius: 28px;
  }

  label {
    font-size: 16px;
    line-height: 22px;

    color: #8fa7b3;
    margin-left: 24px;
  }
`;
