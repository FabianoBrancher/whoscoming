import { Button } from 'antd';
import { darken } from 'polished';
import styled from 'styled-components';

export const EventTitle = styled.h1`
  color: #333;
  font-size: 30px;
  font-weight: bold;
`;

export const EventDate = styled.p`
  margin: 0;
  padding: 0;
  color: #333;
  font-weight: 700;
`;

export const EventLocation = styled.p`
  margin: 0;
  color: #999;
  font-weight: normal;
`;

export const ButtonAddGuests = styled(Button).attrs({
  size: 'large',
  type: 'button',
  icon: 'plus-circle'
})`
  width: 100%;
  max-width: 300px;
  margin-right: 20px;
`;

export const ButtonCSVtoJSON = styled(Button).attrs({
  size: 'large',
  icon: 'upload',
  type: 'primary'
})`
  width: 100%;
  margin: 0;
`;

export const ButtonDeleteGuest = styled(Button).attrs({
  size: 'large',
  ghost: 'true',
  type: 'danger',
  icon: 'delete'
})`
  width: 100%;
  max-width: 100px;
`;

export const ButtonConfirmGuests = styled(Button).attrs({
  icon: 'check',
  size: 'large',
  type: 'default'
})`
  color: '#78d05c';

  &:hover {
    border-color: #78d05c;
  }
`;

export const ButtonCheckIn = styled(Button).attrs({
  size: 'large',
  icon: 'check',
  type: 'default'
})`
  width: 100%;
  color: #fff;
  padding: 0 5px;
  max-width: 100px;
  margin-left: 20px;
  border-color: #78d05c;
  background-color: #78d05c;

  &:hover {
    color: #fff;
    background: ${darken(0.1, '#78d05c')};
    border-color: ${darken(0.1, '#78d05c')};
  }
`;
