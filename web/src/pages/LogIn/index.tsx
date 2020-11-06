import React, { FormEvent, useCallback, useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Background from '../../components/Background';

import {
  Container,
  Content,
  Form,
  RememberContainer,
  Remember,
} from './styles';

const LogIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemenber] = useState(false);

  const { goBack } = useHistory();

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      console.log(email, password, remember);
    },
    [email, password, remember],
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
          <h1>Fazer login</h1>

          <Input
            id="email"
            label="E-mail"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
          <Input
            id="password"
            label="Senha"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />

          <RememberContainer>
            <Remember>
              <input
                type="checkbox"
                id="remember"
                onChange={event => setRemenber(event.target.checked)}
              />
              <label htmlFor="remember">Lembrar-me</label>
            </Remember>
            <Link to="/forgotPassword">Esqueci minha senha</Link>
          </RememberContainer>

          <Button type="submit">Entrar</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default LogIn;
