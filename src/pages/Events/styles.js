import { Button } from 'antd';
import { lighten } from 'polished';
import styled from 'styled-components';

export const ButtonCreateEvent = styled(Button).attrs({
  size: 'large',
  type: 'primary'
})`
  margin-right: 20px;
  border-color: #2c3654;
  background-color: #2c3654;

  a {
    color: #fff;
    margin-left: 10px;
  }

  &:hover {
    background: ${lighten(0.1, '#2c3654')};
    border-color: ${lighten(0.1, '#2c3654')};
  }
`;

export const ButtonEdit = styled(Button).attrs({
  icon: 'edit',
  type: 'link',
  size: 'large'
})``;

export const ButtonDelete = styled(Button).attrs({
  type: 'link',
  size: 'large',
  icon: 'delete'
})``;

export const DeleteMsg = styled.strong`
  color: red;
`;
