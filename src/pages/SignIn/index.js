import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Divider } from 'antd';

import {
  signInRequest,
  signInWithGoogle,
  signInWithFacebook
} from '../../store/modules/auth/actions';

import {
  Container,
  StyledForm,
  Logo,
  ButtonLogin,
  ButtonCreateAccount,
  ButtonFacebook,
  ButtonGoogle
} from './styles';

import logo from '../../assets/logo-2.svg';

export default function SignIn() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSignIn(e) {
    e.preventDefault();
    dispatch(signInRequest(email, password));
  }

  function handleFacebookLogin() {
    dispatch(signInWithFacebook());
  }

  function handleGoogleLogin() {
    dispatch(signInWithGoogle());
  }

  function handleCreateAccount(e) {
    e.preventDefault();
    // dispatch(signUpWithEmailandPassword());
  }

  return (
    <Container>
      <StyledForm layout="vertical">
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

        <ButtonLogin loading={loading} onClick={handleSignIn}>
          Log in
        </ButtonLogin>

        <ButtonCreateAccount to="/signup">
          Create New Account
        </ButtonCreateAccount>

        <Divider />

        <ButtonFacebook
          size="large"
          icon="facebook"
          loading={loading}
          onClick={handleFacebookLogin}
        >
          Login com o Facebook
        </ButtonFacebook>
        <ButtonGoogle
          size="large"
          icon="google"
          loading={loading}
          onClick={handleGoogleLogin}
        >
          Login com o Google
        </ButtonGoogle>
      </StyledForm>
    </Container>
  );
}
