import React, { useEffect, useState } from 'react';

import { Modal, Table } from 'antd';

import { getTitle } from '../../../utils/util';

export default function PreviewTableModal({ visible, previewData }) {
  const [columns, setColumns] = useState([]);
  useEffect(() => {
    function createColumns() {
      const cols = Object.keys(previewData[0]);
      const arr = [];
      cols.forEach(col => {
        arr.push({
          title: getTitle(col),
          dataIndex: col,
          key: col,
          sorter: (a, b) => a[col].localeCompare(b[col]),
          sortDirections: ['descend', 'ascend']
        });
      });
      setColumns(arr);
    }
    createColumns();

    // createColumns();
  }, [previewData]);

  return (
    <Modal
      visible={visible}
      onOk={() => console.log('OK')}
      onCancel={() => {}}
      okText="Salvar"
      footer={null}
      cancelText="Cancelar"
      destroyOnClose
      width={960}
    >
      <Table dataSource={previewData} columns={columns} />
    </Modal>
  );
}
