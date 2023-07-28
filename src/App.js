import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import Loader from './components/loader/loader';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import Home from './components/home/home';
import AddSchedule from './components/addSchedule/addSchedule';
import Information from './components/information/information';
import Login from './components/login/login';
import Register from './components/register/register';
import CreateSchedule from './components/createSchedule/createSchedule';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Error al verificar el token:', error);
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, []);

  if (loading) {
    // Mostrar un indicador de carga mientras se verifica el token
    return <Loader/>
  }

  return (
    <Router>
      <div style={{ height: '100vh', overflowY: 'auto' }}>
        <Switch>
          <Route exact path="/login">
            {isLoggedIn ? <Redirect to="/home" /> : <Login setIsLoggedIn={setIsLoggedIn} />}
          </Route>
          <Route exact path="/register">
            {isLoggedIn ? <Redirect to="/home" /> : <Register setIsLoggedIn={setIsLoggedIn} />}
          </Route>
          <PrivateRoute path="/" isLoggedIn={isLoggedIn}>
            <Navbar />
              <Switch>
                <Route exact path="/home">
                  <Home />
                </Route>
                <Route exact path="/information">
                  <Information />
                </Route>
                <Route exact path="/addSchedule">
                  <AddSchedule />
                </Route>
                <Route exact path="/createSchedule">
                  <CreateSchedule/>
                </Route>
                <Route>
                  <Redirect to="/home" />
                </Route>
              </Switch>
            <Footer />
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
};

const PrivateRoute = ({ children, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={({ location }) =>
      isLoggedIn ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      )
    }
  />
);

export default App;
