import styled from 'styled-components';
import { Form, Button } from 'antd';

import { lighten } from 'polished';

export const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;

  margin: 0 auto;
  min-width: 600px;
  background: #fff;
  padding: 40px;

  border-radius: 4px;

  img {
    display: flex;
    align-items: center;
    width: 200px;
    height: auto;
  }

  input {
    margin-top: 10px;
  }
`;

export const Logo = styled.img`
  width: 200px;
  height: auto;
  align-self: center;
  margin: 10px;
`;

export const ButtonLogin = styled(Button).attrs({
  size: 'large',
  htmlType: 'submit',
  type: 'primary'
})`
  width: 100%;
  margin: 10px 0;
`;

export const ButtonFacebook = styled(ButtonLogin)`
  background-color: #3c5a99;
  border-color: #3c5a99;
  &:hover {
    background: ${lighten(0.1, '#3c5a99')};
    border-color: ${lighten(0.1, '#3c5a99')};
  }
`;

export const ButtonGoogle = styled(ButtonLogin)`
  background-color: #db4437;
  border-color: #db4437;
  &:hover {
    background: ${lighten(0.1, '#db4437')};
    border-color: ${lighten(0.1, '#db4437')};
  }
`;
