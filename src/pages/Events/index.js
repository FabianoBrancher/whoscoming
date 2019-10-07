import React, { useState } from 'react';
import { Layout, Row, Col, Form, Input, Button, DatePicker } from 'antd';

import Header from '../../components/Header';

const { Content } = Layout;

export default function Events() {
  const [name, setName] = useState('');
  const [eventDate, setEventDate] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    console.log(name, eventDate);
  }

  return (
    <Layout>
      <Header />
      <Content>
        <Row type="flex" justify="center">
          <Col
            xs={24}
            sm={22}
            lg={18}
            xl={16}
            style={{ background: '#fff', padding: '12px 24px' }}
          >
            <h1>New Event</h1>
            <Form>
              <Form.Item label="Event Name">
                <Input
                  placeholder="Event name"
                  onChange={event => setName(event.target.value)}
                />
              </Form.Item>
              <Form.Item label="Event Date">
                <DatePicker
                  placeholder="Select Date"
                  onChange={dateString => setEventDate(dateString)}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" onClick={handleSubmit}>
                  Save
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
