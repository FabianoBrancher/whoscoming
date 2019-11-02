/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Icon, Modal, Table, Button } from 'antd';

import { WarningMessage } from './styles';

import { createGuestListRequest } from '../../../store/modules/guest/actions';

export default function PreviewTableModal({
  columns,
  visible,
  previewData,
  handleCancel
}) {
  const dispatch = useDispatch();
  const event = useSelector(state => state.event.event);

  function handleSubmit(e) {
    e.preventDefault();
    Modal.destroyAll();
    dispatch(createGuestListRequest({ eventId: event.id, previewData }));
  }

  return (
    <Modal
      destroyOnClose
      okText="Salvar"
      cancelText="Cancelar"
      width={960}
      footer={null}
      visible={visible}
      okButtonProps={{}}
      onOk={handleSubmit}
      onCancel={handleCancel}
      title={<strong>Pré-Visualização dos convidados</strong>}
    >
      {!Object.keys(previewData[0]).includes('name') && (
        <WarningMessage>
          Você não pode importar a lista de convidados sem o campo
          <span>&nbsp;name</span>.
        </WarningMessage>
      )}

      <Table
        size="small"
        columns={columns}
        dataSource={previewData}
        scroll={{ x: 'max-content' }}
      />

      <Button
        size="large"
        type="default"
        onClick={handleCancel}
        style={{ marginRight: 10 }}
      >
        Cancelar
      </Button>

      <Button
        size="large"
        type="primary"
        onClick={handleSubmit}
        style={{ margin: '30px 0 20px 0' }}
        disabled={!Object.keys(previewData[0]).includes('name')}
      >
        <Icon type="upload" /> Importar dados
      </Button>
    </Modal>
  );
}
