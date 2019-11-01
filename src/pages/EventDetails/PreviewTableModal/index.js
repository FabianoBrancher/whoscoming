/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
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

  useEffect(() => {});

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
