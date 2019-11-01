import React from 'react';
import { Layout, Avatar } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { Logo, Profile, SignOutLink } from './styles';

import logo from '../../assets/logo1-white.png';
import avatar from '../../assets/avatar-w3lcome.png';

import { signOut } from '../../store/modules/auth/actions';

const { Header } = Layout;

export default function HeaderComponent() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#2c3654',
        justifyContent: 'space-between'
      }}
    >
      <Logo to="/">
        <img src={logo} alt="logo" />
      </Logo>
      <Profile>
        <Avatar size="large" src={user.photoURL || avatar} icon="user" />
        <div>
          <strong>{user.displayName}</strong>
          <SignOutLink to="/" onClick={handleSignOut}>
            Logout
          </SignOutLink>
        </div>
      </Profile>
    </Header>
  );
}
