import { lighten } from 'polished';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Logo = styled(Link)`
  img {
    width: auto;
    height: 38px;
  }
`;

export const Profile = styled.div`
  flex-direction: 'row';
  height: 100%;
  display: flex;
  padding: 0 5px;
  align-items: center;
  justify-content: center;

  div {
    height: 100%;
    display: flex;
    padding: 0 15px;
    flex-direction: row;

    strong {
      color: #fff;
    }
  }
`;

export const SignOutLink = styled(Link)`
  color: #f2b230;
  margin-left: 10px;

  &:hover {
    color: ${lighten(0.1, '#f2b230')};
  }
`;
