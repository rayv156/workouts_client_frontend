import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import Display from './components/Display'
import Login from './components/Login'
import Signup from './components/Signup'

function App() {
  return (
    <div className="App">
      <h1>Hello World</h1>
      <Switch>
        <Route path="/" exact component={Display} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/login" exact component={Login} />
      </Switch>
        <Link to="/">Display  </Link>
        <Link to="/signup">Signup  </Link>
        <Link to="/login">Login  </Link>
    </div>
  );
}

export default App;
