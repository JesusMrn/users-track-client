import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { Navbar } from './app/Navbar';
import { UsersList } from './features/users/UsersList';
import { AddUserForm } from './features/users/AddUserForm';
import { ConnectionsList } from './features/connections/ConnectionsList';
import { AddConnectionsForm } from './features/connections/AddConnectionsForm';
import { FriendsList} from './features/friends/FriendsList';


function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => (
            <React.Fragment>
              <AddUserForm></AddUserForm>
              <UsersList></UsersList>
            </React.Fragment>
          )} />
          <Route exact path="/connections" render={() => (
            <React.Fragment>
              <AddConnectionsForm></AddConnectionsForm>
              <ConnectionsList></ConnectionsList>
            </React.Fragment>
          )} />
          <Route exact path="/friends" component={FriendsList}></Route>
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
