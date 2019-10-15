import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Avatar } from 'antd';

import { Logo, Profile, SignOutLink } from './styles';

import logo from '../../assets/logo1-white.png';

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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#002F5C'
      }}
    >
      <Logo to="/">
        <img src={logo} alt="logo" />
      </Logo>
      <Profile>
        <Avatar size="large" src={user.photoURL} />
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
