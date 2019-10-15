import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Divider, Layout, Row, Col, Form, Icon } from 'antd';

import {
  signInRequest,
  signInWithGoogle,
  signInWithFacebook
} from '../../store/modules/auth/actions';

import {
  Logo,
  ButtonLogin,
  ButtonCreateAccount,
  ButtonFacebookLogin,
  ButtonGoogleLogin
} from './styles';

import logo from '../../assets/logo1-black.png';

const { Content } = Layout;

export default function SignIn() {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.auth);
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

  return (
    <Layout>
      <Content>
        <Row type="flex" justify="center">
          <Col xs={22} sm={20} lg={14} xl={10}>
            <Logo to="/">
              <img src={logo} alt="logo" />
            </Logo>

            <Form layout="vertical">
              <Form.Item style={{ marginBottom: 5 }}>
                <Input
                  prefix={
                    <Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  size="large"
                  type="email"
                  placeholder="Digite seu e-mail"
                  onChange={e => setEmail(e.target.value)}
                />
              </Form.Item>

              <Form.Item style={{ marginBottom: 5 }}>
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25' }} />
                  }
                  size="large"
                  type="password"
                  placeholder="Digite sua senha"
                  onChange={e => setPassword(e.target.value)}
                />
              </Form.Item>

              <ButtonLogin loading={loading} onClick={handleSignIn}>
                Log in
              </ButtonLogin>

              <ButtonCreateAccount to="/signup">
                Criar Nova Conta
              </ButtonCreateAccount>

              <Divider style={{ margin: '10px' }} />

              <ButtonFacebookLogin
                size="large"
                icon="facebook"
                loading={loading}
                onClick={handleFacebookLogin}
              >
                Login com o Facebook
              </ButtonFacebookLogin>
              <ButtonGoogleLogin
                size="large"
                icon="google"
                loading={loading}
                onClick={handleGoogleLogin}
              >
                Login com o Google
              </ButtonGoogleLogin>
            </Form>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
