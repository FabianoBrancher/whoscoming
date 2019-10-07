import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Row, Col, Form, Input, Button, DatePicker } from 'antd';

import Header from '../../components/Header';

import { createEventRequest } from '../../store/modules/event/actions';

const { Content } = Layout;

export default function Events() {
  const dispatch = useDispatch();

  const user = useSelector(state => state.auth.user);

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [eventDate, setEventDate] = useState('');
  const { loading, error } = useSelector(state => state.event);

  const dateFormat = ['DD/MM/YYYY'];

  function handleSubmit(event) {
    event.preventDefault();

    const { uid } = user;

    dispatch(createEventRequest(name, location, eventDate, uid));
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
            <Form layout="vertical" onSubmit={handleSubmit}>
              <Form.Item label="Event Name">
                <Input
                  placeholder="Event name"
                  onChange={event => setName(event.target.value)}
                />
              </Form.Item>
              <Form.Item label="Event Location">
                <Input
                  placeholder="Event location"
                  onChange={event => setLocation(event.target.value)}
                />
              </Form.Item>
              <Form.Item label="Event Date">
                <DatePicker
                  placeholder="Select Date"
                  format={dateFormat}
                  onChange={(date, dateString) => setEventDate(dateString)}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
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
