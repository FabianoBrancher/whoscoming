import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

export const Logo = styled(Link)`
  display: flex;
  justify-content: center;

  img {
    margin: 80px 0;
    width: 240px;
    height: auto;
    align-self: center;
  }
`;

export const ButtonCreateAccount = styled(Button).attrs({
  size: 'large',
  htmlType: 'submit',
  type: 'primary'
})`
  width: 100%;
  margin: 10px 0;
`;

export const ButtonSignIn = styled(Link)`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  align-self: center;
`;
