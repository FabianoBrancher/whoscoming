import React, { useState, useEffect } from 'react';
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
  Card,
  InputNumber,
  Form
} from 'antd';

import { database } from '../../config/firebase';

import Header from '../../components/Header';
import Guests from '../Guests';

import {
  EventTitle,
  EventDate,
  EventLocation,
  ButtonAddGuests,
  ButtonDeleteGuest,
  ButtonCheckIn
} from './styles';

const { Content } = Layout;

const name = {
  title: 'Nome do Convidado',
  dataIndex: 'name',
  key: 'name',
  render: text => <strong>{text}</strong>
};

const stats = {
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
};

const actions = {
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
};

export default function Details() {
  const { event } = useSelector(state => state.event);
  const [visible, setVisible] = useState(false);
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [columns, setColumns] = useState([name]);

  function getTitle(opt) {
    switch (opt) {
      case 'rg': {
        return 'R.G.';
      }
      case 'phone': {
        return 'Telefone';
      }
      case 'table': {
        return 'Mesa';
      }
      case 'email': {
        return 'Email';
      }
      case 'cpf': {
        return 'CPF';
      }
      case 'city': {
        return 'Cidade';
      }
      case 'company': {
        return 'Empresa';
      }
      default:
        return '';
    }
  }

  useEffect(() => {
    async function loadGuests() {
      // dispatch(loadGuestsRequest());
      const guestsRef = database.ref(`guests/${event.key}`);
      guestsRef.on('value', snapshot => {
        if (snapshot.val()) {
          const guestObjects = snapshot.val();
          // console.log(guestObjects);
          const arr = Object.keys(guestObjects)
            .filter(key => !guestObjects[key].parent)
            .map(key => ({
              key,
              ...guestObjects[key],
              children: Object.keys(guestObjects)
                .filter(childrenKey => guestObjects[childrenKey].parent === key)
                .map(childrenKey => ({
                  key: childrenKey,
                  name: guestObjects[childrenKey].name,
                  status: guestObjects[childrenKey].arrived
                }))
            }));
          setGuests(arr);
        }
        setLoading(false);
      });
    }

    function createColumns() {
      const opts = (event.options || 'name').split(',');
      const arr = [];
      opts.forEach(option => {
        if (option !== 'name') {
          arr.push({
            title: getTitle(option),
            dataIndex: option,
            key: option
          });
        }
      });
      arr.unshift(name);
      arr.push(stats);
      arr.push(actions);
      setColumns(arr);
    }

    loadGuests();
    createColumns();
  }, []);

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

                <Input placeholder="Pesquisar por nome do convidado" />
                <ButtonCheckIn>Check in</ButtonCheckIn>
              </div>
            </div>

            <Guests visible={visible} event={event} />

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
