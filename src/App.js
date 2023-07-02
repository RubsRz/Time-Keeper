import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/login/login';
import Register from './components/register/register';
import Information from './components/information/information';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/information" component={Information} />
        {/* Otras rutas */}
      </Switch>
    </Router>
  );
};

export default App;
