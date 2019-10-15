import React from 'react';
import { Modal, Form, Input } from 'antd';

export default function Guests({ visible }) {
  return (
    <Modal
      visible={visible}
      title="Create a new collection"
      okText="Create"
      onCancel={() => {}}
      onOk={() => {}}
    >
      <Form layout="vertical">
        <Form.Item label="Title">
          <Input />
        </Form.Item>
        <Form.Item label="Description">
          <Input type="textarea" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
