import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Input, Form, Row, Col, Layout } from 'antd';

import { Logo, ButtonSignIn, ButtonCreateAccount } from './styles';

import logo from '../../assets/logo1-black.png';

import { signUpRequest } from '../../store/modules/auth/actions';

const { Content } = Layout;

export default function SignUp() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [fullname, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const { loading } = useSelector(state => state.auth);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(signUpRequest(fullname, email, password));
  }

  return (
    <Layout>
      <Content>
        <Row type="flex" justify="center">
          <Col xs={22} sm={20} lg={14} xl={10}>
            <Logo to="/">
              <img src={logo} alt="logo" />
            </Logo>

            <Form layout="vertical" onSubmit={handleSubmit}>
              <Form.Item style={{ marginBottom: 5 }}>
                <Input
                  size="large"
                  type="fullname"
                  placeholder="Digite seu nome completo"
                  onChange={e => setFullName(e.target.value)}
                />
              </Form.Item>

              <Form.Item style={{ marginBottom: 5 }}>
                <Input
                  size="large"
                  type="email"
                  placeholder="Digite seu e-mail"
                  onChange={e => setEmail(e.target.value)}
                />
              </Form.Item>

              <Form.Item style={{ marginBottom: 5 }}>
                <Input
                  size="large"
                  type="password"
                  placeholder="Digite sua senha"
                  onChange={e => setPassword(e.target.value)}
                />
              </Form.Item>

              <ButtonCreateAccount loading={loading}>
                Criar conta
              </ButtonCreateAccount>

              <ButtonSignIn to="/">Já tenho uma conta.</ButtonSignIn>
            </Form>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
