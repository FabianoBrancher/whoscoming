import styled from 'styled-components';
import { Button } from 'antd';

import { lighten } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const EventsList = styled.div`
  display: flex;
  /* flex-direction: column; */
  /* align-items: flex-start; */
  justify-content: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
  padding: 30px;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 20px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  height: 64px;
  padding: 5px;
  background: #002f5c;
`;

export const Logo = styled.img`
    width: 100px;
    height: 50px;
    color: #fff;

`;

export const Profile = styled.span`
  display: flex;
  flex: 1;
  border: 1px solid red;

  div {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;

    strong {
      color: #fff;
      padding: 0;
      margin: 0;
    }
  }
`;

export const ButtonCreateEvent = styled(Button).attrs({
  type: 'primary',
  size: 'large'
})`
  margin-right: 20px;
  background-color: #002f5c;
  border-color: #002f5c;
  &:hover {
    background: ${lighten(0.1, '#002f5c')};
    border-color: ${lighten(0.1, '#002f5c')};
  }
`;
