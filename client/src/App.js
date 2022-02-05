import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { login } from './actions';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Main from './pages/Main';
import Search from './pages/Search';
import Setting from './pages/Setting';
import Footer from './pages/Footer';
import NaverLogin from './components/Login/NaverLogin';
import Personal from './pages/Personal';
import Use from './pages/Use';

function App() {
  const dispatch = useDispatch();

  const isAuthenticated = useCallback(async () => {
    await axios
      .get(`${process.env.REACT_APP_SERVER_API}/users/auth`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data) {
          dispatch(login(res.data));
        }
      })
      .catch((err) => {
        dispatch(login({isLogin: false, siteName: 'FAKESEARCH'}))
      });
  }, [dispatch]);

  useEffect(() => {
    isAuthenticated();
  }, [isAuthenticated]);

  const updateTitle = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_API}/users/auth`, {
        withCredentials: true,
      })
      .then((res) => {
          const htmlTitle = document.querySelector('title');
          htmlTitle.innerHTML = res.data.siteName;
      })
  };

  useEffect(() => {
    updateTitle();
  }, []);

  return (
    <div className='App'>
      <div className='App-content'>
        <Switch>
          <Route exact path='/' component={Main} />
          <Route path='/login' component={Login} />
          <Route path='/setting' component={Setting} />
          <Route path='/search/query=:word' component={Search} />
          <Route path='/search/query=' component={Search} />
          <Route path='/footer' component={Footer} />
          <Route path='/naver' component={NaverLogin} />
          <Route path='/law/personal' component={Personal} />
          <Route path='/law/use' component={Use} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
