import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  Layout,
  Row,
  Col,
  Table,
  Input,
  Tag,
  Icon,
  Card,
  Dropdown,
  Menu,
  Button,
  Modal,
  Checkbox
} from 'antd';

import { database } from '../../config/firebase';

import Header from '../../components/Header';
import Guests from '../Guests';

import {
  EventTitle,
  EventDate,
  EventLocation,
  ButtonAddGuests,
  ButtonCheckIn
} from './styles';

const { confirm } = Modal;
const { Content } = Layout;

export default function EventDetails() {
  const dispatch = useDispatch();
  const { event } = useSelector(state => state.event);

  const [visible, setVisible] = useState(false);
  const [guests, setGuests] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkedGuests, setCheckedGuests] = useState('');

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

  function onChange(checkedValues) {
    console.log('checked = ', checkedValues);
    setCheckedGuests(checkedValues);
  }

  function showConfirm(guest) {
    let options = [];
    const firstOption = [{ label: guest.name, value: guest.key }];
    const arr =
      guest.children &&
      guest.children.map(g => ({ label: g.name, value: g.key }));
    if (arr) {
      options = [...firstOption, ...arr];
    }
    confirm({
      centered: true,
      title: `${
        guest.children && guest.children.length > 0
          ? `Deseja excluir o convidado ${guest.name} e seus acompanhantes?`
          : `Deseja excluir o acompanhante ${guest.name}?`
      }`,
      content:
        guest.children && guest.children.length > 0 ? (
          <Checkbox.Group
            style={{ display: 'flex', flexDirection: 'column' }}
            options={options}
            onChange={onChange}
          />
        ) : (
          ``
        ),
      onOk() {
        console.log(checkedGuests);
      },
      onCancel() {}
    });
  }

  const name = {
    title: 'Nome do Convidado',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend', 'ascend'],
    render: text => <strong>{text}</strong>
  };

  const fixedColumns = [
    {
      title: 'Status',
      dataIndex: 'arrived',
      key: 'arrived',
      filters: [
        { text: 'Chegou', value: 'chegou' },
        { text: 'Não chegou', value: '' }
      ],
      onFilter: (value, record) => record.arrived.indexOf(value) === 0,
      render: arrived => (
        <span>
          <Tag color={arrived ? 'green' : 'volcano'}>
            {arrived ? 'chegou' : 'não chegou'}
          </Tag>
        </span>
      )
    },
    {
      title: 'Ação',
      key: 'action',
      align: 'center',
      render: guest => {
        const menu = (
          <Menu>
            <Menu.Item onClick={() => {}}>
              <Icon type="edit" />
              Editar
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item onClick={() => showConfirm(guest)}>
              <Icon type="delete" />
              Excluir
            </Menu.Item>
          </Menu>
        );

        return (
          <Dropdown overlay={menu} trigger={['click']} placement="bottomCenter">
            <Button type="link" icon="more" />
          </Dropdown>
        );
      }
    }
  ];

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
                  arrived: guestObjects[childrenKey].arrived
                }))
            }));
          setGuests(arr);
          setLoading(false);
        }
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
      fixedColumns.forEach(column => arr.push(column));
      setColumns(arr);
    }

    loadGuests();
    createColumns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
