import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Logo = styled(Link)`
  img {
    width: auto;
    height: 38px;
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: 'row';
  justify-content: center;
  align-items: center;
  padding: 0 5px;
  height: 100%;

  div {
    display: flex;
    flex-direction: row;
    padding: 0 15px;
    height: 100%;

    strong {
      color: #fff;
    }
  }
`;

export const SignOutLink = styled(Link)`
  margin-left: 10px;
`;
