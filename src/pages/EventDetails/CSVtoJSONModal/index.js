/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

import { Button, Modal, Upload, Icon, message, Table, Row, Col } from 'antd';

import * as csv from 'csvtojson';

import { getTitle } from '../../../services/utils';

import PreviewTableModal from '../PreviewTableModal';

export default function CSVtoJSONModal({ visible, handleCancel, options }) {
  const [columns, setColumns] = useState([]);
  const [previewData, setPreviewData] = useState({});
  const [visiblePreviewTabletModal, setVisiblePreviewTableModal] = useState(
    false
  );

  const exampleGuests = [
    {
      key: '1',
      table: '1',
      city: 'Cidade 1',
      rg: '1.111.111-1',
      name: 'João Miguel',
      company: 'Empresa 1',
      cpf: '111.111.111-11',
      phone: '(11) 1111-1111',
      email: 'joaomiguel@email1.com'
    },
    {
      key: '2',
      table: '2',
      city: 'Cidade 2',
      rg: '2.222.222-2',
      company: 'Empresa 2',
      name: 'Ricardo Dias',
      cpf: '222.222.222-22',
      phone: '(22) 2222-2222',
      email: 'ricardodias@email2.com'
    }
  ];

  useEffect(() => {
    function createColumns() {
      const arr = [];
      options.forEach(option => {
        arr.push({
          key: option,
          dataIndex: option,
          title: () => (
            <>
              <span style={{ color: 'red' }}>{option}</span>&nbsp;(
              {getTitle(option)})
            </>
          ),
          sorter: (a, b) => a[option].localeCompare(b[option]),
          sortDirections: ['descend', 'ascend']
        });
      });
      setColumns(arr);
    }

    createColumns();
  }, []);

  // SHOW PreviewTable MODAL
  function showPreviewTableModal() {
    setVisiblePreviewTableModal(true);
  }

  // HIDE PreviewTable MODAL
  function hidePreviewTableModal() {
    setVisiblePreviewTableModal(false);
  }

  function beforeUpload(file) {
    const isCSV = file.type === 'text/csv';
    if (!isCSV) {
      message.error('Você só pode importar arquivos com a extensão .csv');
      return false;
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('Arquivo deve ser menor que 5MB!');
      return false;
    }

    const csvColumnsStr = `(^${options.join('|')}$)`;
    const csvColumnsRegExp = new RegExp(csvColumnsStr);

    const reader = new FileReader();
    reader.onload = e => {
      csv({ includeColumns: csvColumnsRegExp })
        .fromString(e.target.result)
        .then(res => {
          setPreviewData(res);
          showPreviewTableModal();
        });
    };
    reader.readAsText(file);

    return false;
  }

  return (
    <Modal
      destroyOnClose
      okText="Visualizar"
      cancelText="Cancelar"
      width={960}
      footer={false}
      visible={visible}
      onCancel={handleCancel}
      title={<strong>Importar convidados via arquivo .CSV</strong>}
    >
      <Row type="flex" justify="center">
        <Col
          xs={24}
          sm={22}
          style={{
            paddingBottom: 10
          }}
        >
          <h3>
            <strong>INSTRUÇÕES:</strong> Para que a importação ocorra sem
            problemas, o seu arquivo CSV deve estar configurado com as seguintes
            colunas em vermelho. Veja abaixo a tabela de exemplo:
          </h3>
          <Table
            size="small"
            columns={columns}
            pagination={false}
            dataSource={exampleGuests}
            style={{ margin: '20px 0' }}
            scroll={{ x: 'max-content' }}
          />

          <h3>
            Após configurado, clique no botão abaixo para escolher o arquivo
            contendo a lista de convidados. Será gerada uma pré-visualização com
            os dados importados. Se estiver tudo certo, você pode salvá-los no
            banco de dados clicando em Salvar.
          </h3>

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center'
            }}
          >
            <Upload
              name="csv"
              showUploadList={false}
              beforeUpload={beforeUpload}
              style={{ margin: '30px 0' }}
            >
              <Button
                size="large"
                type="primary"
                style={{ margin: '30px 0 20px 0' }}
              >
                <Icon type="upload" /> Clique para fazer upload
              </Button>
            </Upload>
          </div>

          {visiblePreviewTabletModal && (
            <PreviewTableModal
              columns={columns}
              previewData={previewData}
              visible={visiblePreviewTabletModal}
              handleCancel={hidePreviewTableModal}
            />
          )}
        </Col>
      </Row>
    </Modal>
  );
}
