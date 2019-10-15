import styled from 'styled-components';
import { Button } from 'antd';

import { lighten } from 'polished';

export const ButtonCreateEvent = styled(Button).attrs({
  type: 'primary',
  size: 'large'
})`
  margin-right: 20px;
  background-color: #002f5c;
  border-color: #002f5c;

  a {
    color: #fff;
    margin-left: 10px;
  }

  &:hover {
    background: ${lighten(0.1, '#002F5C')};
    border-color: ${lighten(0.1, '#002F5C')};
  }
`;
