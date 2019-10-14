import React from 'react';
import { Divider } from 'antd';

import { Container, ButtonEdit, ButtonDelete } from './styles';

export default function ActionsMenu() {
  return (
    <Container>
      <ButtonEdit>Editar</ButtonEdit>
      <Divider style={{ margin: 0 }} />
      <ButtonDelete>Excluir</ButtonDelete>
    </Container>
  );
}
