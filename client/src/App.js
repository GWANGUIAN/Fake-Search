import './App.css';
import { Route, Switch, Link } from 'react-router-dom';
import Login from './pages/Login';
import Main from './pages/Main';
import Search from './pages/Search';
import Setting from './pages/Setting';
import Footer from './pages/Footer';

function App() {
  return (
    <div className="App">
      {/* <div>
        <Link to='/login'>로그인</Link>
        <Link to='/setting'>설정</Link>
        <Link to='/search'>검색</Link>
        <Link to='/main'>메인</Link>
        <Link to='/footer'>푸터</Link>
      </div> */}
      <div className='App-content'>
      <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/setting' component={Setting}/>
        <Route path='/search' component={Search}/>
        <Route path='/main' component={Main}/>
        <Route path='/footer' component={Footer}/>
      </Switch>
      </div>
    </div>
  );
}

export default App;
