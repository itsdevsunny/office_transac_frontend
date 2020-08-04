import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import OfficeTransactions from './Components/OfficeTransactions';
import OfficeTransactionCreate from './Components/OfficeTransactionCreate';


class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/office-transactions">
          <OfficeTransactions />
        </Route>
        <Route exact path="/office-transaction/create">
          <OfficeTransactionCreate />
        </Route>
      </Switch>
    );
  }
}

export default App;