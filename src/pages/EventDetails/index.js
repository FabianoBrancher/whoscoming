import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import moment from 'moment';

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

import {
  checkInRequest,
  checkOutRequest
} from '../../store/modules/check/actions';

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
  const [search, setSearch] = useState('');

  const filterOptions = {
    shouldSort: true,
    // threshold: 0.6,
    threshold: 0.1,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    // keys: [
    //   'name',
    //   'rg',
    //   'cpf',
    //   'table',
    //   'email',
    //   'phone',
    //   'city',
    //   'company',
    //   'location'
    // ]
    keys: ['name', 'cpf']
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
      case 'type': {
        return 'Tipo';
      }
      case 'status': {
        return 'Status';
      }
      default:
        return '';
    }
  }

  function handleCheckIn(guestId) {
    const eventId = event.key;
    const arrived = moment().format();
    dispatch(checkInRequest(eventId, guestId, arrived));
  }

  function handleCheckOut(guestId) {
    const eventId = event.key;
    const arrived = null;
    dispatch(checkOutRequest(eventId, guestId, arrived));
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
      title: 'Chegada',
      dataIndex: 'arrived',
      key: 'arrived',
      width: 120,
      fixed: 'right',
      filters: [
        { text: 'Chegou', value: true },
        { text: 'Não chegou', value: false }
      ],
      sorter: (a, b) => {
        if (!a.arrived) return 1;
        if (!b.arrived) return -1;
        if (a.arrived < b.arrived) return -1;
        if (a.arrived > b.arrived) return 1;
        return 0;
      },
      onFilter: (value, guest) => (value ? !!guest.arrived : !guest.arrived),
      render: (arrived, guest) => (
        <span>
          <Tag
            key={arrived}
            color={arrived ? 'green' : 'volcano'}
            onClick={
              arrived
                ? () => handleCheckOut(guest.key)
                : () => handleCheckIn(guest.key)
            }
          >
            {arrived
              ? `chegou há ${moment(arrived).fromNow('Chegou há')}`
              : 'não chegou'}
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

  function filterGuestsString() {
    const result = fuse.search(search);
    setFilteredGuests(result);
  }

  useEffect(() => {
    function loadGuests() {
      const guestsRef = database.ref(`guests/${event.key}`);
      const unsubscribe = guestsRef.on('value', snapshot => {
        const guestObjects = snapshot.val() || {};
        const arr = Object.keys(guestObjects)
          .filter(key => !guestObjects[key].parent)
          .map(key => ({
            key,
            ...guestObjects[key],
            children: null
            // Object.keys(guestObjects)
            //   .filter(childrenKey => guestObjects[childrenKey].parent === key)
            //   .map(childrenKey => ({
            //     key: childrenKey,
            //     ...guestObjects[childrenKey]
            //   }))
          }));
        setGuests(arr);
        // setFilteredGuests(arr);
        setLoading(false);
      });
      return () => unsubscribe();
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

  useEffect(() => {
    filterGuestsString();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guests]);

  // rowSelection objects indicates the need for row selection
  // const rowSelection = {
  //   onChange: (selectedRowKeys, selectedRows) => {
  //     console.log(
  //       `selectedRowKeys: ${selectedRowKeys}`,
  //       'selectedRows: ',
  //       selectedRows
  //     );
  //   },
  //   onSelect: (record, selected, selectedRows) => {
  //     console.log(record, selected, selectedRows);
  //   },
  //   onSelectAll: (selected, selectedRows, changeRows) => {
  //     console.log(selected, selectedRows, changeRows);
  //   }
  // };

  function filterGuests(e) {
    // const result = fuse.search(e.target.value);
    // console.log(result);
    // if (result.length > 0) {
    //   setFilteredGuests(result);
    // } else {
    //   setFilteredGuests(guests);
    // }
    setSearch(e.target.value);
    filterGuestsString(e.target.value);
  }

  return (
    <Layout>
      <Header />
      <Content>
        <Row type="flex" justify="center">
          <Col xs={24} sm={22} style={{ background: '#fff', padding: '30px' }}>
            <EventTitle>{event.name}</EventTitle>
            <EventDate>
              Início do evento: {moment(event.startDate).format('DD/MM/YYYY')}
              &nbsp;às {moment(event.startDate).format('HH:mm')}.
            </EventDate>
            <EventDate>
              Término do evento: {moment(event.endDate).format('DD/MM/YYYY')}
              &nbsp;às {moment(event.endDate).format('HH:mm')}.
            </EventDate>
            <EventLocation>Localização: {event.location}</EventLocation>

            <Row
              type="flex"
              justify="center"
              align="middle"
              gutter={16}
              className="guests-counter-cards"
              style={{ padding: '20px 0 0 0' }}
            >
              <Col xs={24} sm={8} lg={8} xl={8}>
                <Card
                  title="Total de convidados"
                  style={{ width: '100%', margin: '10px 0' }}
                >
                  <span>{guests.length}</span>
                </Card>
              </Col>
              <Col xs={24} sm={8} lg={8} xl={8}>
                <Card
                  title="Chegaram"
                  style={{ width: '100%', margin: '10px 0' }}
                >
                  <span>{guests.filter(g => !!g.arrived).length}</span>
                </Card>
              </Col>
              <Col xs={24} sm={8} lg={8} xl={8}>
                <Card
                  title="Não chegaram"
                  style={{ width: '100%', margin: '10px 0' }}
                >
                  <span>{guests.filter(g => !g.arrived).length}</span>
                </Card>
              </Col>
            </Row>

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
                  value={search}
                  onChange={filterGuests}
                />
              </div>
            </div>

            {visible && (
              <Guests visible={visible} handleCancel={handleCancel} />
            )}

            <Table
              size="small"
              dataSource={search === '' ? guests : filteredGuests}
              pagination={{ showSizeChanger: true, showQuickJumper: true }}
              columns={columns}
              loading={loading}
              scroll={{ x: 1000 }}
            />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
