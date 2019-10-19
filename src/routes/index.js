import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import Events from '../pages/Events';
import EventDetails from '../pages/EventDetails';
import Guests from '../pages/Guests';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/events" exact component={Events} isPrivate />
      <Route path="/events/:id/details" component={EventDetails} isPrivate />
      <Route path="/events/:id/edit" component={Events} isPrivate />
      <Route path="/events/new" component={Events} isPrivate />
      <Route path="/guests/:id/edit" component={Guests} isPrivate />
      <Route path="/guests/new" component={Guests} isPrivate />
    </Switch>
  );
}
