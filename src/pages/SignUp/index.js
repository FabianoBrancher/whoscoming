import React, { useState } from 'react';
import { Input, Divider } from 'antd';

import { toast } from 'react-toastify';

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

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(error => {
        toast.error(error.message);
      })
      .then(result => {
        toast.success('Usuário criado com sucesso.');
      });
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

        <ButtonLogin>Log in</ButtonLogin>

        <Divider />

        <ButtonFacebook size="large">Login com o Facebook</ButtonFacebook>
        <ButtonGoogle size="large">Login com o Google</ButtonGoogle>
      </StyledForm>
    </Container>
  );
}
