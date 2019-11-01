/* eslint-disable react-hooks/exhaustive-deps */
import Fuse from 'fuse.js';
import moment from 'moment';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Col,
  Row,
  Tag,
  Menu,
  Icon,
  Input,
  Table,
  Modal,
  Layout,
  Button,
  Dropdown
} from 'antd';

import Header from '../../components/Header';

import { database } from '../../config/firebase';

import { ButtonCreateEvent, DeleteMsg } from './styles';

import {
  newEventRequest,
  removeEventRequest,
  getEventDetailsRequest
} from '../../store/modules/event/actions';

import history from '../../services/history';

const { confirm } = Modal;
const { Content } = Layout;

export default function Events() {
  const dispatch = useDispatch();

  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [filteredEvents, setFilteredEvents] = useState([]);

  const { user } = useSelector(state => state.auth);

  const filterOptions = { keys: ['name', 'location'] };
  const fuse = new Fuse(events, filterOptions);

  useEffect(() => {
    function loadEvents() {
      const eventsRef = database
        .ref('events')
        .orderByChild('createdBy')
        .equalTo(user.uid);

      const unsubscribe = eventsRef.on('value', snapshot => {
        const eventsObjects = snapshot.val() || {};
        const arr = Object.keys(eventsObjects).map(key => ({
          key,
          ...eventsObjects[key]
        }));

        setEvents(arr);
        setLoading(false);
      });
      return () => unsubscribe();
    }
    loadEvents();
  }, []);

  function filterEventsString() {
    const result = fuse.search(search);
    setFilteredEvents(result);
  }

  function filterEvents(e) {
    setSearch(e.target.value);
    filterEventsString(e.target.value);
  }

  useEffect(() => {
    filterEventsString();
  }, [events]);

  // EVENTS ACTION: CREATE NEW
  function newEvent() {
    dispatch(newEventRequest());
  }

  // EVENTS ACTION: LOAD EVENT DETAILS
  function getEventDetails(event) {
    dispatch(getEventDetailsRequest(event));
  }

  // EVENTS ACTION: UPDATE EVENT
  function handleEdit(event) {
    dispatch(getEventDetailsRequest(event));
    history.push(`/events/${event.key}/edit`);
  }

  // EVENTS ACTION: DELETE EVENT
  function handleDelete(event) {
    dispatch(removeEventRequest(event.key));
  }

  function showConfirm(event) {
    confirm({
      okText: 'Excluir',
      cancelText: 'Cancelar',
      centered: true,
      title: (
        <span>
          Deseja excluir o evento <strong>{event.name}</strong>?
        </span>
      ),
      content: (
        <DeleteMsg>
          CUIDADO: Isto também irá excluir todos os convidados cadastrados neste
          evento.
        </DeleteMsg>
      ),
      onOk() {
        handleDelete(event);
      },
      onCancel() {}
    });
  }

  const columns = [
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Nome do Evento',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (name, event) => (
        <Link
          to={`/events/${event.key}/details`}
          onClick={() => getEventDetails(event)}
        >
          {name}
        </Link>
      )
    },
    {
      key: 'location',
      dataIndex: 'location',
      title: 'Local do Evento',
      sorter: (a, b) => a.location.localeCompare(b.location),
      sortDirections: ['descend', 'ascend']
    },
    {
      key: 'startDate',
      dataIndex: 'startDate',
      title: 'Data do Evento',
      render: startDate => <span>{moment(startDate).format('DD/MM/YYYY')}</span>
    },
    {
      key: 'options',
      title: 'Campos',
      dataIndex: 'options',
      render: options => (
        <div>
          {(options || 'name').split(',').map(o => (
            <Tag key={o} color="green">
              {o}
            </Tag>
          ))}
        </div>
      )
    },
    {
      key: 'action',
      title: 'Ação',
      align: 'center',
      render: event => {
        const menu = (
          <Menu>
            <Menu.Item onClick={() => handleEdit(event)}>
              <Icon type="edit" />
              Editar
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
              onClick={() => showConfirm(event)}
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

  return (
    <Layout>
      <Header />
      <Content>
        <Row type="flex" justify="center">
          <Col
            xs={24}
            sm={22}
            style={{ background: '#fff', padding: '12px 24px' }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                padding: '40px 0'
              }}
            >
              <Link to="/events/new">
                <ButtonCreateEvent
                  icon="plus-circle"
                  loading={loading}
                  onClick={newEvent}
                >
                  Criar novo evento
                </ButtonCreateEvent>
              </Link>
              <Input
                size="large"
                placeholder="Pesquisar por nome do evento"
                value={search}
                onChange={filterEvents}
              />
            </div>
            <h2>Lista de Eventos</h2>
            <Table
              size="small"
              dataSource={search === '' ? events : filteredEvents}
              columns={columns}
              loading={loading}
              pagination={{ showSizeChanger: true, showQuickJumper: true }}
              locale={{
                emptyText: <span>Nenhum evento cadastrado.</span>
              }}
            />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
