/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Modal, Table } from 'antd';

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
    dispatch(createGuestListRequest({ eventId: event.id, previewData }));
    handleCancel();
  }

  return (
    <Modal
      destroyOnClose
      okText="Salvar"
      cancelText="Cancelar"
      width={960}
      visible={visible}
      okButtonProps={{}}
      onOk={handleSubmit}
      onCancel={handleCancel}
      title={<strong>Pré-Visualização dos convidados</strong>}
    >
      <Table
        size="small"
        columns={columns}
        dataSource={previewData}
        scroll={{ x: 'max-content' }}
      />
    </Modal>
  );
}
