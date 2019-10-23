import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Fuse from 'fuse.js';

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
  Modal
} from 'antd';

import Header from '../../components/Header';
import Guests from './GuestForm';

import { database } from '../../config/firebase';

import {
  EventTitle,
  EventDate,
  EventLocation,
  ButtonAddGuests
} from './styles';

import {
  newGuestRequest,
  getGuestDetailsRequest,
  removeGuestRequest
} from '../../store/modules/guest/actions';

const { confirm } = Modal;
const { Content } = Layout;

export default function EventDetails() {
  const dispatch = useDispatch();
  const { event } = useSelector(state => state.event);
  const [guests, setGuests] = useState([]);
  const [filteredGuests, setFilteredGuests] = useState([]);
  const [columns, setColumns] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const filterOptions = {
    keys: [
      'name',
      'rg',
      'cpf',
      'table',
      'email',
      'phone',
      'city',
      'company',
      'location'
    ]
  };

  const fuse = new Fuse(guests, filterOptions);

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

  function handleCreateGuest() {
    dispatch(newGuestRequest());
    setVisible(true);
  }

  function handleUpdateGuest(guest) {
    dispatch(getGuestDetailsRequest(guest));
    setVisible(true);
  }

  function handleCancel() {
    setVisible(false);
  }

  // EXCLUSÃO DO CONVIDADO
  function showConfirm(guest) {
    confirm({
      centered: true,
      title: `Deseja excluir o convidado ${guest.name}?`,
      onOk() {
        dispatch(removeGuestRequest(guest.key, event.key));
      },
      onCancel() {}
    });
  }

  const name = {
    title: 'Nome do Convidado',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
    sortDirections: ['descend', 'ascend'],
    width: 200,
    fixed: 'left',
    render: text => <strong>{text}</strong>
  };

  const fixedColumns = [
    {
      title: 'Status',
      dataIndex: 'arrived',
      key: 'arrived',
      width: 100,
      fixed: 'right',
      filters: [
        { text: 'Chegou', value: 'chegou' },
        { text: 'Não chegou', value: '' }
      ],
      onFilter: (value, record) => record.arrived !== '',
      render: arrived => (
        <span>
          <Tag key={arrived} color={arrived ? 'green' : 'volcano'}>
            {arrived ? 'chegou' : 'não chegou'}
          </Tag>
        </span>
      )
    },
    {
      title: 'Ação',
      key: 'action',
      align: 'center',
      width: 100,
      fixed: 'right',
      render: guest => {
        const menu = (
          <Menu>
            <Menu.Item onClick={() => handleUpdateGuest(guest)}>
              <Icon type="edit" />
              Editar
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
              onClick={() => showConfirm(guest)}
              style={{ color: 'red' }}
            >
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
    function loadGuests() {
      const guestsRef = database.ref(`guests/${event.key}`);
      guestsRef.on('value', snapshot => {
        const guestObjects = snapshot.val() || {};
        const arr = Object.keys(guestObjects)
          .filter(key => !guestObjects[key].parent)
          .map(key => ({
            key,
            ...guestObjects[key],
            children: Object.keys(guestObjects)
              .filter(childrenKey => guestObjects[childrenKey].parent === key)
              .map(childrenKey => ({
                key: childrenKey,
                ...guestObjects[childrenKey]
              }))
          }));
        setGuests(arr);
        setFilteredGuests(arr);
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
            key: option,
            sorter: (a, b) => a[option].localeCompare(b[option]),
            sortDirections: ['descend', 'ascend']
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

  function filterGuests(e) {
    const result = fuse.search(e.target.value);
    if (result.length > 0) {
      setFilteredGuests(result);
    } else {
      setFilteredGuests(guests);
    }
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
                  onClick={handleCreateGuest}
                >
                  Adicionar convidado
                </ButtonAddGuests>

                <Input
                  size="large"
                  placeholder="Pesquisar por nome do convidado"
                  onChange={filterGuests}
                />
              </div>
            </div>

            {visible && (
              <Guests visible={visible} handleCancel={handleCancel} />
            )}

            <Table
              size="small"
              dataSource={filteredGuests}
              columns={columns}
              rowSelection={rowSelection}
              loading={loading}
              scroll={{ x: 1000 }}
            />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
