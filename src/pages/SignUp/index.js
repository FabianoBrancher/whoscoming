import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Input } from 'antd';

import {
  Container,
  StyledForm,
  Logo,
  ButtonSignIn,
  ButtonCreateAccount
} from './styles';

import logo from '../../assets/logo.png';

import { signUpRequest } from '../../store/modules/auth/actions';

export default function SignUp() {
  const dispatch = useDispatch();
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(signUpRequest(fullname, email, password));
  }

  return (
    <Container>
      <StyledForm layout="vertical" onSubmit={handleSubmit}>
        <Logo src={logo} alt="logo" />

        <Input
          size="large"
          type="fullname"
          placeholder="Digite seu nome completo"
          onChange={e => setFullName(e.target.value)}
        />

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

        <ButtonCreateAccount loading={loading}>
          Create Account
        </ButtonCreateAccount>

        <ButtonSignIn to="/">Already have an Account</ButtonSignIn>
      </StyledForm>
    </Container>
  );
}
