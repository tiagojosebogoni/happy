import React, { InputHTMLAttributes } from 'react';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

const Input: React.FC<InputProps> = ({ id, label, ...rest }) => {
  return (
    <Container>
      <span>{label}</span>
      <input id={id} {...rest} />
    </Container>
  );
};

export default Input;
