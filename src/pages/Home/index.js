import React, { useState } from 'react';
import { Layout, Input, Table, Divider, Row, Col } from 'antd';

import { Link } from 'react-router-dom';

import { ButtonCreateEvent } from './styles';

import Header from '../../components/Header';

const { Content } = Layout;

const { Column } = Table;

const data = [
  {
    key: '1',
    eventName: 'John',
    date: '14/11/2019',
    guestsCount: 100
  },
  {
    key: '2',
    eventName: 'Jim',
    date: '14/12/2019',
    guestsCount: 220
  },
  {
    key: '3',
    eventName: 'Joe',
    date: '07/01/20',
    guestsCount: 74
  },
  {
    key: '4',
    eventName: 'John',
    date: '14/11/2019',
    guestsCount: 100
  },
  {
    key: '5',
    eventName: 'Jim',
    date: '14/12/2019',
    guestsCount: 220
  },
  {
    key: '6',
    eventName: 'Joe',
    date: '07/01/20',
    guestsCount: 74
  },
  {
    key: '7',
    eventName: 'John',
    date: '14/11/2019',
    guestsCount: 100
  },
  {
    key: '8',
    eventName: 'Jim',
    date: '14/12/2019',
    guestsCount: 220
  },
  {
    key: '9',
    eventName: 'Joe',
    date: '07/01/20',
    guestsCount: 74
  },
  {
    key: '10',
    eventName: 'John',
    date: '14/11/2019',
    guestsCount: 100
  },
  {
    key: '11',
    eventName: 'Jim',
    date: '14/12/2019',
    guestsCount: 220
  },
  {
    key: '12',
    eventName: 'Joe',
    date: '07/01/20',
    guestsCount: 74
  }
];

export default function Home() {
  const [loading, setLoading] = useState(false);
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
            <Table dataSource={data}>
              <Column
                title="Event name"
                dataIndex="eventName"
                key="eventName"
              />

              <Column title="Date" dataIndex="date" key="date" />
              <Column
                title="Number of guests"
                dataIndex="guestsCount"
                key="guestsCount"
              />
              <Column
                title="Action"
                key="action"
                render={(text, record) => (
                  <span>
                    <a>Edit {record.lastName}</a>
                    <Divider type="vertical" />
                    <a>Delete</a>
                  </span>
                )}
              />
            </Table>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
