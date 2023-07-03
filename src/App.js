import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/login/login';
import Register from './components/register/register';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import Home from './components/home/home';
import Information from './components/information/information';

const AuthWrapper = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Verificar si el token está presente en localStorage al cargar el componente
    const token = localStorage.getItem('token');

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <Route
        render={({ location }) => {
          if (location.pathname === '/login' || location.pathname === '/register') {
            return null;
          }
          return <Navbar />;
        }}
      />

      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/login">
          {isLoggedIn ? (
            <Redirect to="/home" />
          ) : (
            <Login setIsLoggedIn={setIsLoggedIn} />
          )}
        </Route>
        <Route exact path="/register">
          {isLoggedIn ? (
            <Redirect to="/home" />
          ) : (
            <Register setIsLoggedIn={setIsLoggedIn} />
          )}
        </Route>
        <Route exact path="/home">
          {isLoggedIn ? <Home /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/information">
          {isLoggedIn ? <Information /> : <Redirect to="/login" />}
        </Route>
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>

      <Route
        render={({ location }) => {
          if (location.pathname === '/login' || location.pathname === '/register') {
            return null;
          }
          return <Footer />;
        }}
      />
    </Router>
  );
};

const App = () => {
  return <AuthWrapper />;
};

export default App;
