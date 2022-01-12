import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { login } from './actions';
import './App.css';
import { Route, Switch, Link } from 'react-router-dom';
import Login from './pages/Login';
import Main from './pages/Main';
import Search from './pages/Search';
import Setting from './pages/Setting';
import Footer from './pages/Footer';
import NaverLogin from './components/Login/NaverLogin';

function App() {
  const dispatch = useDispatch();

  const isAuthenticated = useCallback(async () => {
    await axios
      .get(`${process.env.REACT_APP_SERVER_API}/users/auth`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          dispatch(login(res.data));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  useEffect(() => {
    isAuthenticated();
  }, [isAuthenticated]);

  return (
    <div className='App'>
      <div>
        <Link to='/login'>로그인</Link>
        <Link to='/setting'>설정</Link>
        <Link to='/search'>검색</Link>
        <Link to='/'>메인</Link>
        <Link to='/footer'>푸터</Link>
      </div>
      <div className='App-content'>
        <Switch>
          <Route exact path='/' component={Main} />
          <Route path='/login' component={Login} />
          <Route path='/setting' component={Setting} />
          <Route path='/search' component={Search} />
          <Route path='/footer' component={Footer} />
          <Route path='/naver' component={NaverLogin} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
