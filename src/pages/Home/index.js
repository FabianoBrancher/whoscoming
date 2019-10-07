import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Layout, Input, Table, Divider, Row, Col, Tag } from 'antd';

import { Link } from 'react-router-dom';

import { ButtonCreateEvent } from './styles';

import Header from '../../components/Header';

import firebase from '../../config/firebase';

const { Content } = Layout;

const { Column } = Table;

export default function Home() {
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: 'Event Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Event Location',
      dataIndex: 'location',
      key: 'location'
    },
    {
      title: 'Event Date',
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a>Edit</a>
          <Divider type="vertical" />
          <a>Delete</a>
        </span>
      )
    }
  ];

  useEffect(() => {
    async function loadEvents() {
      // dispatch(loadEventsRequest());
      let eventsRef = firebase.database().ref('events/');
      eventsRef.on('value', snapshot => {
        setLoading(true);

        if (snapshot.val()) {
          const arr = Object.values(snapshot.val()).map(v => v)
          setEvents(arr);
        }

        setLoading(false);
      });
    }

    loadEvents();
  }, []);

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
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                padding: '40px 0'
              }}
            >
              <Link to="/events">
                <ButtonCreateEvent icon="plus-circle" loading={loading}>
                  Create new event
                </ButtonCreateEvent>
              </Link>
              <Input size="large" placeholder="Pesquisar por nome do evento" />
            </div>
            <h2>Lista de Eventos</h2>
            <Table dataSource={events} columns={columns} loading={loading} />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
