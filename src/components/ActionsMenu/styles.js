import styled from 'styled-components';
import { Button } from 'antd';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const ButtonEdit = styled(Button).attrs({
  type: 'link',
  size: 'small',
  icon: 'edit'
})`
  width: 100%;
  margin: 5px 0;
`;

export const ButtonDelete = styled(Button).attrs({
  type: 'danger',
  size: 'small',
  icon: 'delete'
})`
  width: 100%;
  margin: 5px 0;
`;
