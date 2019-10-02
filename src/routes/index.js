import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';
import Events from '../pages/Events';
import EventsList from '../pages/Events/EventsList';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/home" component={Home} />
      <Route path="/events" component={Events} />
      <Route path="/list" component={EventsList} />
    </Switch>
  );
}
