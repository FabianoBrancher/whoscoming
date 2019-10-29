import styled from 'styled-components';
import { Button } from 'antd';

import { lighten } from 'polished';

export const ButtonCreateEvent = styled(Button).attrs({
  type: 'primary',
  size: 'large'
})`
  margin-right: 20px;
  background-color: #2c3654;
  border-color: #2c3654;

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
  type: 'link',
  size: 'large',
  icon: 'edit'
})``;

export const ButtonDelete = styled(Button).attrs({
  type: 'link',
  size: 'large',
  icon: 'delete'
})``;

export const DeleteMsg = styled.strong`
  color: red;
`;
