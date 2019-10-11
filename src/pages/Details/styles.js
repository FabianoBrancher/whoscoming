import styled from 'styled-components';
import { Button } from 'antd';
import { lighten } from 'polished';

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
  type: 'primary',
  size: 'medium'
})`
  margin-right: 20px;
  /* background-color: #001529;
  border-color: #001529; */

  a {
    color: #fff;
    margin-left: 10px;
  }

  /* &:hover {
    background: ${lighten(0.1, '#001529')};
    border-color: ${lighten(0.1, '#001529')};
  } */
`;

export const ButtonDeleteGuest = styled(Button).attrs({
  type: 'danger',
  size: 'medium',
  icon: 'delete',
  ghost: 'true'
})`
  width: 100%;
  max-width: 100px;
`;

export const ButtonConfirmGuests = styled(Button).attrs({
  type: 'default',
  size: 'medium'
})`
  color: '#78d05c';

  &:hover {
    border-color: #78d05c;
  }
`;
