import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Events from '../pages/Events';
import EventForm from '../pages/EventForm';
import EventDetails from '../pages/EventDetails';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/events" exact component={Events} isPrivate />
      <Route path="/events/:id/details" component={EventDetails} isPrivate />
      <Route path="/events/:id/edit" component={EventForm} isPrivate />
      <Route path="/events/new" component={EventForm} isPrivate />
    </Switch>
  );
}
