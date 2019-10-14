import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  Layout,
  Row,
  Col,
  Table,
  Input,
  Popconfirm,
  Tag,
  Icon,
  Modal
} from 'antd';

import Header from '../../components/Header';

import {
  EventTitle,
  EventDate,
  EventLocation,
  ButtonAddGuests,
  ButtonDeleteGuest,
  ButtonConfirmGuests
} from './styles';

const { Content } = Layout;

export default function Details() {
  const { event } = useSelector(state => state.event);
  const [visible, setVisible] = useState(false);
  const loading = false;

  const guests = [
    {
      id: '1',
      name: 'Fabiano Brancher',
      companionName: 'Marcela Kato',
      status: 'chegou'
    },
    {
      id: '2',
      name: 'Peter Parker',
      companionName: 'Mary Jane',
      status: 'chegou'
    }
  ];

  const columns = [
    {
      title: 'Nome do Convidado',
      dataIndex: 'name',
      key: 'name',
      render: name => (
        <strong>
          {name} <Tag color="green">Chegou</Tag>
        </strong>
      )
    },
    {
      title: 'Nome do Acompanhante',
      dataIndex: 'companionName',
      key: 'companionName',
      render: companionName => (
        <span>
          {companionName} <Tag color="volcano"> Não chegou</Tag>
        </span>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: () => (
        <ButtonConfirmGuests
          style={{ color: 'green' }}
          onClick={() => {
            setVisible(!visible);
          }}
        >
          Confirmar
        </ButtonConfirmGuests>
      )
    },
    {
      title: 'Ação',
      key: 'action',
      align: 'center',
      render: () => (
        <Popconfirm
          title="Tem certeza?"
          okText="Sim"
          cancelText="Não"
          icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
        >
          <ButtonDeleteGuest>Excluir</ButtonDeleteGuest>
        </Popconfirm>
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

            <Modal
              title="Vertically centered modal dialog"
              centered
              visible={visible}
              onOk={() => setVisible(false)}
              onCancel={() => setVisible(false)}
            >
              <h1>test</h1>
            </Modal>

            <Table dataSource={guests} columns={columns} loading={loading} />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
