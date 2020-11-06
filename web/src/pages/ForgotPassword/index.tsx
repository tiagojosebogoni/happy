import React, { FormEvent, useCallback, useState } from 'react';

import { useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Background from '../../components/Background';

import { Container, Content, Form } from './styles';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const { goBack } = useHistory();

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      console.log(email);
    },
    [email],
  );

  return (
    <Container>
      <Background />
      <Content>
        <header>
          <button type="button" onClick={goBack}>
            <FiArrowLeft size={24} color="#12afcb" />
          </button>
        </header>
        <Form onSubmit={handleSubmit}>
          <h1>Esqueci minha senha</h1>

          <Input
            id="email"
            label="E-mail"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />

          <Button type="submit">Entrar</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default ForgotPassword;
