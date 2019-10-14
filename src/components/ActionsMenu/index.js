import React from 'react';
import { useDispatch } from 'react-redux';

import { Divider, Modal } from 'antd';

import { Container, ButtonEdit, ButtonDelete } from './styles';

import {
  getEventRequest,
  removeEventRequest
} from '../../store/modules/event/actions';

const { confirm } = Modal;

export default function ActionsMenu({ event }) {
  const dispatch = useDispatch();
  function handleEdit() {
    dispatch(getEventRequest(event));
  }

  function handleDelete() {
    dispatch(removeEventRequest(event.key));
  }

  function showConfirm() {
    confirm({
      title: `Deseja excluir o evento ${event.name}?`,
      onOk() {
        handleDelete();
      },
      onCancel() { }
    });
  }

  return (
    <Container>
      <ButtonEdit href={`/events/${event.key}/edit`} onClick={handleEdit} >
        Editar
      </ButtonEdit>
      <Divider style={{ margin: 0 }} />
      <ButtonDelete onClick={showConfirm}>Excluir</ButtonDelete>
    </Container>
  );
}
