import React, { useState } from 'react';
import { Input, Divider, notification } from 'antd';

import {
  Container,
  StyledForm,
  Logo,
  ButtonLogin,
  ButtonFacebook,
  ButtonGoogle
} from './styles';

import logo from '../../assets/logo.png';

import firebase from '../../config/firebase';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await firebase.login(email, password);
      notification.success({
        message: 'Login successful',
        description: `Usuário, ${result.user.email}`,
        duration: 1.5
      });
      setLoading(false);
    } catch (error) {
      notification.error({
        message: 'Login failed',
        description: error.message,
        duration: 1.5
      });
      setLoading(false);
    }
  }

  return (
    <Container>
      <StyledForm layout="vertical" onSubmit={handleSubmit}>
        <Logo src={logo} alt="logo" />

        <Input
          size="large"
          type="email"
          placeholder="Digite seu e-mail"
          onChange={e => setEmail(e.target.value)}
        />

        <Input
          size="large"
          type="password"
          placeholder="Digite sua senha"
          onChange={e => setPassword(e.target.value)}
        />

        <ButtonLogin loading={loading}>Log in</ButtonLogin>

        <Divider />

        <ButtonFacebook size="large">Login com o Facebook</ButtonFacebook>
        <ButtonGoogle size="large">Login com o Google</ButtonGoogle>
      </StyledForm>
    </Container>
  );
}
