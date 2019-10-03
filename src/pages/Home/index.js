import React, { useState } from 'react';
import { Layout, Avatar, Input, Table, Divider, Row, Col } from 'antd';

import { Link } from 'react-router-dom';

import {
  // Container,
  // Content,
  Profile,
  // Header,
  Logo,
  ButtonCreateEvent
} from './styles';

import logo from '../../assets/logo-2.svg';

const { Header, Content } = Layout;

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
  }
];

export default function Home() {
  const [loading, setLoading] = useState(false);
  return (
    <Layout>
      <Header>
        <Logo src={logo} alt="logo" />

        <Avatar
          size="large"
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        />

      </Header>
      <Content>
        <Row type="flex" justify="center">
          <Col xs={24} sm={22} lg={18} xl={16} style={{ background: '#fff', padding: '12px 24px' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                padding: '40px 0'
              }}
            >
              <ButtonCreateEvent icon="plus-circle" loading={loading}>
                Create new event
              </ButtonCreateEvent>
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
