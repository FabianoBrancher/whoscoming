import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Layout, Input, Table, Divider, Row, Col } from 'antd';

import { ButtonCreateEvent } from './styles';

import Header from '../../components/Header';

import { database } from '../../config/firebase';

const { Content } = Layout;

export default function Home() {
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: 'Nome do Event',
      dataIndex: 'name',
      key: 'name',
      render: (name, event) => <Link to={`/events/${event.key}/details`}>{name}</Link>
    },
    {
      title: 'Local do Evento',
      dataIndex: 'location',
      key: 'location'
    },
    {
      title: 'Data do Evento',
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a>Excluir</a>
        </span>
      )
    }
  ];

  useEffect(() => {
    async function loadEvents() {
      // dispatch(loadEventsRequest());
      const eventsRef = database.ref('events/');
      eventsRef.on('value', snapshot => {
        setLoading(true);

        if (snapshot.val()) {
          // const arr = Object.values(snapshot.val()).map(v => v)
          const arr = Object.entries(snapshot.val()).map(item => ({
            key: item[0],
            ...item[1]
          }));
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
