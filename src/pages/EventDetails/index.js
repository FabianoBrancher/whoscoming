/* eslint-disable react-hooks/exhaustive-deps */
import Fuse from 'fuse.js';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  Row,
  Col,
  Tag,
  Icon,
  Card,
  Menu,
  Table,
  Modal,
  Input,
  Layout,
  Button,
  Dropdown
} from 'antd';

import GuestsModal from './GuestsModal';
import Header from '../../components/Header';
import CSVtoJSONModal from './CSVtoJSONModal';
import JSONtoCSVModal from './JSONtoCSVModal';

import { database } from '../../config/firebase';

import {
  EventDate,
  EventTitle,
  EventLocation,
  ButtonAddGuests,
  ButtonCSVtoJSON,
  ButtonJSONtoCSV,
  EventDescription
} from './styles';

import {
  newGuestRequest,
  removeGuestRequest,
  getGuestDetailsRequest
} from '../../store/modules/guest/actions';

import {
  checkInRequest,
  checkOutRequest
} from '../../store/modules/check/actions';

import { getTitle } from '../../services/utils';

const { confirm } = Modal;
const { Content } = Layout;

export default function EventDetails() {
  const dispatch = useDispatch();
  const { event } = useSelector(state => state.event);

  const [guests, setGuests] = useState([]);
  const [search, setSearch] = useState('');
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredGuests, setFilteredGuests] = useState([]);
  const [visibleGuestModal, setVisibleGuestModal] = useState(false);
  const [visibleCSVtoJSONModal, setVisibleCSVtoJSONModal] = useState(false);
  const [visibleJSONtoCSVModal, setVisibleJSONtoCSVModal] = useState(false);

  // FUSE FILTER OPTIONS (SEARCH)
  const filterOptions = {
    location: 0,
    distance: 100,
    threshold: 0.1,
    shouldSort: true,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: event.options.split(',')
  };

  const fuse = new Fuse(guests, filterOptions);

  // SHOW CSVtoJSON MODAL
  function showCSVtoJSONModal() {
    setVisibleCSVtoJSONModal(true);
  }

  // HIDE CSVtoJSON MODAL
  function hideCSVtoJSONModal() {
    setVisibleCSVtoJSONModal(false);
  }

  // SHOW JSONtoCSV MODAL
  function showJSONtoCSVModal() {
    setVisibleJSONtoCSVModal(true);
  }

  // HIDE JSONtoCSV MODAL
  function hideJSONtoCSVModal() {
    setVisibleJSONtoCSVModal(false);
  }

  // SHOW GUESTS MODAL
  function showGuestsModal() {
    setVisibleGuestModal(true);
  }

  // HIDE GUESTS MODAL
  function hideGuestsModal() {
    setVisibleGuestModal(false);
  }

  // GUEST CHECK IN
  function handleCheckIn(guestId) {
    const eventId = event.key;
    const arrived = moment().format();
    dispatch(checkInRequest(eventId, guestId, arrived));
  }

  // GUEST CHECK OUT
  function handleCheckOut(guestId) {
    const eventId = event.key;
    const arrived = null;
    dispatch(checkOutRequest(eventId, guestId, arrived));
  }

  // GUESTS ACTIONS: CREATE
  function handleCreateGuest() {
    dispatch(newGuestRequest());
    showGuestsModal();
  }

  // GUESTS ACTIONS: UPDATE
  function handleUpdateGuest(guest) {
    dispatch(getGuestDetailsRequest(guest));
    showGuestsModal();
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

  // COLUNAS DA TABELA GUESTS
  const name = {
    key: 'name',
    fixed: 'left',
    dataIndex: 'name',
    title: 'Nome do Convidado',
    sorter: (a, b) => a.name.localeCompare(b.name),
    sortDirections: ['descend', 'ascend'],
    width: 200,
    render: text => <strong>{text}</strong>
  };

  const fixedColumns = [
    {
      key: 'arrived',
      fixed: 'right',
      title: 'Chegada',
      dataIndex: 'arrived',
      width: 120,
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
      key: 'action',
      title: 'Ação',
      fixed: 'right',
      align: 'center',
      width: 100,
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
        setFilteredGuests(arr);
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
            key: option,
            dataIndex: option,
            title: getTitle(option),
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
  }, []);

  function filterGuestsString() {
    const result = fuse.search(search);
    setFilteredGuests(result);
  }

  function filterGuests(e) {
    setSearch(e.target.value);
    filterGuestsString(e.target.value);
  }

  useEffect(() => {
    filterGuestsString();
  }, [guests]);

  // DROPDOWN MENU ADD GUESTS / IMPORT FROM CSV FILE
  const menu = (
    <Menu>
      <Menu.Item>
        <ButtonJSONtoCSV onClick={showJSONtoCSVModal}>
          Exportar lista para um arquivo CSV
        </ButtonJSONtoCSV>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <ButtonCSVtoJSON onClick={showCSVtoJSONModal}>
          Importar lista de um arquivo CSV
        </ButtonCSVtoJSON>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Header />
      <Content>
        <Row type="flex" justify="center">
          <Col xs={24} sm={22} style={{ background: '#fff', padding: '30px' }}>
            <Row type="flex" justify="center">
              <Col xs={24} sm={12}>
                <EventTitle>{event.name}</EventTitle>
                <Button
                  size="large"
                  type="primary"
                  href={`/events/${event.key}/edit`}
                >
                  <Icon type="edit" /> Editar Evento
                </Button>

                <EventDescription>{event.description}</EventDescription>
                <EventDate>
                  Início do evento:
                  {moment(event.startDate).format('DD/MM/YYYY')}
                  &nbsp;às {moment(event.startDate).format('HH:mm')}.
                </EventDate>
                <EventDate>
                  Término do evento:
                  {moment(event.endDate).format('DD/MM/YYYY')}
                  &nbsp;às {moment(event.endDate).format('HH:mm')}.
                </EventDate>
                <EventLocation>Localização: {event.location}</EventLocation>
              </Col>

              <Col xs={24} sm={12}>
                <Row
                  type="flex"
                  align="middle"
                  justify="center"
                  className="guests-counter-cards"
                  gutter={16}
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
              </Col>
            </Row>
            <Row type="flex">
              <Col xs={24} sm={12}>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '40px 0 10px 0'
                  }}
                >
                  <h2>Lista de Convidados</h2>

                  <div
                    style={{
                      padding: '0',
                      display: 'flex',
                      flexDirection: 'row'
                    }}
                  >
                    <ButtonAddGuests onClick={handleCreateGuest}>
                      Adicionar convidado
                    </ButtonAddGuests>

                    <Input
                      size="large"
                      placeholder="Pesquisar por nome do convidado"
                      value={search}
                      style={{ flex: 1 }}
                      onChange={filterGuests}
                    />

                    <Dropdown
                      placement="bottomCenter"
                      overlay={menu}
                      trigger={['click']}
                    >
                      <Button size="large" style={{ marginLeft: 20 }}>
                        Outras ações
                        <Icon type="down" />
                      </Button>
                    </Dropdown>
                  </div>
                </div>

                {/* ADD GUESTS MODAL */}
                {visibleGuestModal && (
                  <GuestsModal
                    visible={visibleGuestModal}
                    handleCancel={hideGuestsModal}
                  />
                )}
              </Col>
            </Row>

            {/* CSV to JSON Instructions Modal */}
            {visibleCSVtoJSONModal && (
              <CSVtoJSONModal
                options={(event.options || 'name').split(',')}
                visible={visibleCSVtoJSONModal}
                handleCancel={hideCSVtoJSONModal}
              />
            )}

            {/* JSON to CSV Modal */}
            {visibleJSONtoCSVModal && (
              <JSONtoCSVModal
                guests={guests}
                options={(event.options || 'name').split(',')}
                visible={visibleJSONtoCSVModal}
                handleCancel={hideJSONtoCSVModal}
              />
            )}

            <Table
              size="small"
              columns={columns}
              loading={loading}
              scroll={{ x: 1000 }}
              dataSource={search === '' ? guests : filteredGuests}
              pagination={{ showSizeChanger: true, showQuickJumper: true }}
            />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
