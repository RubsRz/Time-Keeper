import React from 'react';
import { BrowserRouter as Router, Switch, Route ,Redirect} from 'react-router-dom';
import Login from './components/login/login';
import Register from './components/register/register';
import Layout from './components/layout/layout';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';


const App = () => {
  return (
    <Router>
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/layout" component={Layout} />
      {/* Otras rutas */}
    </Switch>
  </Router>
    //<Login/>
  );
};

export default App;
