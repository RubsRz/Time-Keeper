import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/login/login';
import Register from './components/register/register';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import Home from './components/home/home';

const AuthWrapper = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const handleLogin = (token) => {
  //   localStorage.setItem('token', token); // Guardar el token en el localStorage
  //   setIsLoggedIn(true); // Establecer el estado isLoggedIn en true
  // };

  useEffect(() => {
    // Verificar si el token está presente en localStorage
    const token = localStorage.getItem('token');

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

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
