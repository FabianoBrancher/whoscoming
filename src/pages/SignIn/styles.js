import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import { lighten } from 'polished';

export const Logo = styled(Link)`
  display: flex;
  justify-content: center;

  img {
    width: 300px;
    height: auto;
    align-self: center;
  }
`;

export const ButtonLogin = styled(Button).attrs({
  size: 'large',
  htmlType: 'submit',
  type: 'primary'
})`
  width: 100%;
  margin: 10px 0;
`;

export const ButtonFacebookLogin = styled(ButtonLogin)`
  background-color: #3c5a99;
  border-color: #3c5a99;
  &:hover {
    background: ${lighten(0.1, '#3c5a99')};
    border-color: ${lighten(0.1, '#3c5a99')};
  }
`;

export const ButtonGoogleLogin = styled(ButtonLogin)`
  background-color: #db4437;
  border-color: #db4437;
  &:hover {
    background: ${lighten(0.1, '#db4437')};
    border-color: ${lighten(0.1, '#db4437')};
  }
`;

export const ButtonCreateAccount = styled(Link)`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;
