import { Button } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Logo = styled(Link)`
  display: flex;
  justify-content: center;

  img {
    width: 240px;
    height: auto;
    margin: 80px 0;
    align-self: center;
  }
`;

export const ButtonCreateAccount = styled(Button).attrs({
  size: 'large',
  type: 'primary',
  htmlType: 'submit'
})`
  width: 100%;
  margin: 10px 0;
`;

export const ButtonSignIn = styled(Link)`
  display: flex;
  margin-top: 10px;
  align-self: center;
  justify-content: center;
`;
