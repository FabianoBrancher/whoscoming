import React, { useState } from 'react';
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
  Card
} from 'antd';

import Header from '../../components/Header';
import Guests from '../Guests';

import {
  EventTitle,
  EventDate,
  EventLocation,
  ButtonAddGuests,
  ButtonDeleteGuest,
  InfoCard
} from './styles';

const { Content } = Layout;

export default function Details() {
  const { event } = useSelector(state => state.event);
  const [visible, setVisible] = useState(false);
  const loading = false;

  const guests = [
    {
      key: '1',
      name: 'Fabiano Brancher',
      status: true,
      children: [
        {
          key: '2',
          name: 'Popey',
          status: true
        },
        {
          key: '3',
          name: 'Olivia',
          status: true
        }
      ]
    },
    {
      key: '4',
      name: 'Peter Parker',
      status: false,
      children: [
        {
          key: '5',
          name: 'Mary Jane',
          status: true
        },
        {
          key: '6',
          name: 'Dr. Octopus',
          status: true
        },
        {
          key: '7',
          name: 'Harry Osborn',
          status: false
        },
        {
          key: '8',
          name: 'Gwen Stacy',
          status: true
        }
      ]
    }
  ];

  const columns = [
    {
      title: 'Nome do Convidado',
      dataIndex: 'name',
      key: 'name',
      render: name => <strong>{name}</strong>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Chegou', value: 'chegou' },
        { text: 'Não chegou', value: 'não chegou' }
      ],
      render: status => (
        <span>
          <Tag color={status ? 'green' : 'volcano'}>
            {status ? 'chegou' : 'não chegou'}
          </Tag>
        </span>
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

  // rowSelection objects indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows
      );
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    }
  };

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
                flexDirection: 'row',
                justifyContent: 'flex-start',
                marginTop: '10px'
              }}
            >
              <Card style={{ width: 250, marginRight: 10 }}>
                <p>Total de convidados</p>
                <div>
                  <Icon type="user" style={{ fontSize: 34 }} />
                  <span>275</span>
                </div>
              </Card>

              <Card style={{ width: 250, marginRight: 10 }}>
                <p>Chegaram</p>
                <div>
                  <Icon
                    type="check-circle"
                    theme="twoTone"
                    twoToneColor="#52c41a"
                    style={{ fontSize: 34 }}
                  />
                  <span>275</span>
                </div>
              </Card>

              <Card style={{ width: 250, marginRight: 10 }}>
                <p>Não Chegaram</p>
                <div>
                  <Icon
                    type="stop"
                    theme="twoTone"
                    twoToneColor="#eb2f96"
                    style={{ fontSize: 34 }}
                  />
                  <span>275</span>
                </div>
              </Card>
            </div>

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
                <ButtonAddGuests
                  icon="plus-circle"
                  loading={loading}
                  onClick={() => setVisible(true)}
                >
                  Adicionar convidado
                </ButtonAddGuests>

                <Input
                  size="medium"
                  placeholder="Pesquisar por nome do convidado"
                />
              </div>
            </div>

            <Guests visible={visible} />

            <Table
              dataSource={guests}
              columns={columns}
              rowSelection={rowSelection}
              loading={loading}
            />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
