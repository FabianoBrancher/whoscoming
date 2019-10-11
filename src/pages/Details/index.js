import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Layout, Row, Col, Table, Input } from 'antd';

import Header from '../../components/Header';

import {
  EventTitle,
  EventDate,
  EventLocation,
  ButtonAddGuests
} from './styles';

const { Content } = Layout;

export default function Details() {
  const { event } = useSelector(state => state.event);
  const loading = false;

  const guests = [];

  const columns = [
    {
      title: 'Nome do Convidado',
      dataIndex: 'name',
      key: 'name',
      render: name => ({ name })
    },
    {
      title: 'Nome do Acompanhante',
      dataIndex: 'location',
      key: 'location'
    },
    {
      title: 'Status do convidado',
      dataIndex: 'status',
      key: 'status'
    },
    {
      title: 'Ação',
      key: 'action',
      render: (text, record) => (
        <span>
          <a>Excluir</a>
        </span>
      )
    }
  ];

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
            style={{ background: '#fff', padding: '30px' }}
          >
            <EventTitle>{event.name}</EventTitle>
            <EventDate>Data do evento: {event.date}</EventDate>
            <EventLocation>Localização: {event.location}</EventLocation>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '40px 0 10px 0'
              }}
            >
              <h2>Lista de Convidados</h2>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  padding: '0'
                }}
              >
                <Link to="/">
                  <ButtonAddGuests icon="plus-circle" loading={loading}>
                    Adicionar convidado
                  </ButtonAddGuests>
                </Link>
                <Input
                  size="medium"
                  placeholder="Pesquisar por nome do convidado"
                />
              </div>
            </div>

            <Table dataSource={guests} columns={columns} loading={loading} />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
