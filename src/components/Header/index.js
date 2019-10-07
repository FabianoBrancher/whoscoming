import React from 'react';
import { Layout, Avatar } from 'antd';

import { Logo } from './styles';

import logo from '../../assets/logo-1.svg';

const { Header } = Layout;

export default function HeaderComponent() {
  return (
    <Header>
      <Logo src={logo} alt="logo" />

      <Avatar
        size="large"
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
      />
    </Header>
  );
}
