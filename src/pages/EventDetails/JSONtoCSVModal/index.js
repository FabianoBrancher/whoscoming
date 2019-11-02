/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { parse } from 'json2csv';
import React, { useEffect, useState } from 'react';
import { Row, Col, Icon, Modal, Button, Checkbox, notification } from 'antd';
import { WarningMessage } from './styles';

const CheckboxGroup = Checkbox.Group;

const defaultCheckedList = ['name'];

export default function JSONtoCSVModal({
  guests,
  visible,
  options,
  handleCancel
}) {
  const [values, setValues] = useState({
    plainOptions: ['name'],
    checkAll: false,
    indeterminate: true,
    checkedList: defaultCheckedList
  });

  useEffect(() => {
    setValues({ ...values, plainOptions: options });
  }, []);

  function onChange(checkedList) {
    setValues({
      ...values,
      checkedList,
      indeterminate:
        !!checkedList.length && checkedList.length < values.plainOptions.length,
      checkAll: checkedList.length === values.plainOptions.length
    });
  }

  function onCheckAllChange(e) {
    setValues({
      ...values,
      checkedList: e.target.checked ? values.plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked
    });
  }

  // FUNCTION TO DOWNLOAD THE FILE
  function download(filename, text) {
    const element = document.createElement('a');
    element.setAttribute(
      'href',
      `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`
    );
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  function handleJSONtoCSVDownload() {
    const fields = values.checkedList;

    try {
      const csv = parse(guests, { fields });
      download('guests.csv', csv);
      handleCancel();
    } catch (error) {
      notification.error({
        duration: 1.5,
        message: 'Erro ao exportar arquivo CSV',
        description: error.message
      });
    }
  }

  return (
    <Modal
      destroyOnClose
      okText="Download"
      cancelText="Cancelar"
      width={640}
      footer={null}
      visible={visible}
      onCancel={handleCancel}
      title={<strong>Exportar convidados para um arquivo .CSV</strong>}
    >
      <Row type="flex" justify="center">
        <Col
          xs={24}
          sm={22}
          style={{
            paddingBottom: 10
          }}
        >
          <div>
            <p style={{ marginBottom: 20 }}>
              Selectione os campos da tabela que deseja exportar:
            </p>
            <div style={{ borderBottom: '1px solid #E9E9E9' }}>
              <Checkbox
                checked={values.checkAll}
                onChange={onCheckAllChange}
                indeterminate={values.indeterminate}
              >
                Selecionar todos
              </Checkbox>
            </div>
            <br />
            <CheckboxGroup
              onChange={onChange}
              value={values.checkedList}
              options={values.plainOptions}
            />
          </div>

          {!values.checkedList.includes('name') && (
            <WarningMessage>
              Você não pode exportar a lista de convidados sem o campo
              <span>&nbsp;name</span>.
            </WarningMessage>
          )}

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
            onClick={handleJSONtoCSVDownload}
            style={{ margin: '30px 0 20px 0' }}
            disabled={!values.checkedList.includes('name')}
          >
            <Icon type="download" /> Clique para exportar
          </Button>
        </Col>
      </Row>
    </Modal>
  );
}
