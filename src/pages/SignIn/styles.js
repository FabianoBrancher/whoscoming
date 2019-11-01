import { Button } from 'antd';
import { lighten } from 'polished';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Logo = styled(Link)`
  display: flex;
  justify-content: center;

  img {
    height: auto;
    width: 240px;
    margin: 80px 0;
    align-self: center;
  }
`;

export const ButtonLogin = styled(Button).attrs({
  size: 'large',
  type: 'primary',
  htmlType: 'submit'
})`
  width: 100%;
  margin: 10px 0;
`;

export const ButtonFacebookLogin = styled(ButtonLogin)`
  border-color: #3c5a99;
  background-color: #3c5a99;
  &:hover {
    background: ${lighten(0.1, '#3c5a99')};
    border-color: ${lighten(0.1, '#3c5a99')};
  }
`;

export const ButtonGoogleLogin = styled(ButtonLogin)`
  border-color: #db4437;
  background-color: #db4437;
  &:hover {
    background: ${lighten(0.1, '#db4437')};
    border-color: ${lighten(0.1, '#db4437')};
  }
`;

export const ButtonCreateAccount = styled(Link)`
  display: flex;
  margin-top: 10px;
  justify-content: center;
`;
