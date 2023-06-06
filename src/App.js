import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/login/login';
import Register from './components/register/register';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import Home from './components/home/home';
import Employees from './components/list/employees';
import Notifications from './components/notifications/notifications';
import Requests from './components/requests/requests';

const AuthWrapper = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    // Verificar si el token está presente en localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  return (
    <Router>
      {/* Navbar */}
      <Route
        render={({ location }) => {
          if (location.pathname === '/login' || location.pathname === '/register') {
            return null; // No mostrar el Navbar en las rutas de login y register
          }
          return <Navbar />;
        }}
      />

      {/* Contenido */}
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/login">
          {isLoggedIn ? <Redirect to="/home" /> : <Login setIsLoggedIn={setIsLoggedIn} />}
        </Route>
        <Route exact path="/register">
          {isLoggedIn ? <Redirect to="/home" /> : <Register setIsLoggedIn={setIsLoggedIn} />}
        </Route>
        <Route exact path="/home">
          {isLoggedIn ? <Home /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/employees">
          {isLoggedIn ? <Employees /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/notifications">
          {isLoggedIn ? <Notifications /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/requests">
          {isLoggedIn ? <Requests /> : <Redirect to="/login" />}
        </Route>
        <Route>
            <Redirect to="/" /> {/* Redirigir a la página de inicio si la ruta no existe */}
          </Route>
        {/* Otras rutas */}
      </Switch>

      {/* Footer */}
      <Route
        render={({ location }) => {
          if (location.pathname === '/login' || location.pathname === '/register') {
            return null; // No mostrar el Footer en las rutas de login y register
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
