/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

import { Modal, Upload, Icon, message } from 'antd';

import * as csv from 'csvtojson';

import PreviewTableModal from '../PreviewTableModal';

export default function CSVtoJSONModal({
  visible,
  showCSVtoJSONModal,
  hideCSVtoJSONModal
}) {
  const [previewData, setPreviewData] = useState({});

  useEffect(() => {
    console.log('CSV TO JSON');
  }, []);

  // UPLOAD PROPS
  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text'
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        const reader = new FileReader();
        reader.onload = e => {
          csv()
            .fromString(e.target.result)
            .then(res => {
              setPreviewData(res);
            });
        };
        reader.readAsText(info.file.originFileObj);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  };
  return (
    <Modal
      title="Escolha um arquivo CSV"
      visible={visible}
      onOk={showCSVtoJSONModal}
      onCancel={hideCSVtoJSONModal}
      okText="Salvar"
      cancelText="Cancelar"
      destroyOnClose
      width={960}
    >
      <Upload {...props}>
        <Icon type="upload" /> click to upload
      </Upload>

      {/* {visible && (
        <PreviewTableModal visible={visible} previewData={previewData} />
      )} */}
    </Modal>
  );
}
