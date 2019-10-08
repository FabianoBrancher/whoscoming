import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';
import Events from '../pages/Events';
import TestPage from '../pages/TestPage';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/home" component={Home} isPrivate />
      <Route path="/events" component={Events} isPrivate />
      <Route path="/tests" component={TestPage} isPrivate />
    </Switch>
  );
}
