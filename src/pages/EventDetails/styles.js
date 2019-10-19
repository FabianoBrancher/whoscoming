import styled from 'styled-components';
import { Button } from 'antd';
import { lighten, darken } from 'polished';

export const EventTitle = styled.h1`
  font-size: 30px;
  font-weight: bold;
  color: #333;
`;

export const EventDate = styled.p`
  color: #333;
  font-weight: 700;
  margin: 0;
  padding: 0;
`;

export const EventLocation = styled.p`
  color: #999;
  font-weight: normal;
  margin: 0;
`;

export const ButtonAddGuests = styled(Button).attrs({
  type: 'button',
  size: 'default'
})`
  margin-right: 20px;
  /* background-color: #001529;
  border-color: #001529; */

  /* a {
    color: #fff;
    margin-left: 10px;
  } */

  /* &:hover {
    background: ${lighten(0.1, '#001529')};
    border-color: ${lighten(0.1, '#001529')};
  } */
`;

export const ButtonDeleteGuest = styled(Button).attrs({
  type: 'danger',
  icon: 'delete',
  ghost: 'true'
})`
  width: 100%;
  max-width: 100px;
`;

export const ButtonConfirmGuests = styled(Button).attrs({
  type: 'default',
  icon: 'check'
})`
  color: '#78d05c';

  &:hover {
    border-color: #78d05c;
  }
`;

export const ButtonCheckIn = styled(Button).attrs({
  type: 'default',
  icon: 'check'
})`
  width: 100%;
  max-width: 100px;

  margin-left: 20px;
  background-color: #78d05c;
  border-color: #78d05c;
  color: #fff;
  padding: 0 5px;

  &:hover {
    background: ${darken(0.1, '#78d05c')};
    border-color: ${darken(0.1, '#78d05c')};
    color: #fff;
  }
`;
