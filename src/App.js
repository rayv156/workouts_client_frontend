import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import Display from './components/Display'
import Login from './components/Login'
import Signup from './components/Signup'
import Navigation from './components/Navbar'

export const GlobalCtx = React.createContext(null)

function App() {

  const [gState, setgState] = React.useState({url: "http://localhost:3000", token: null, user: null})

  React.useEffect(()=>{
    const token = JSON.parse(window.localStorage.getItem("token"))
    //console.log(user)
    if (token){
      setgState({...gState, token: token.token, user: token.username})
    }
  }, [])

  return (
    <GlobalCtx.Provider value={{ gState, setgState }}>
    <div className="App">
      <Navigation/>
      <Switch>
        <Route path="/" exact component={Display} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/login" exact component={Login} />
      </Switch>
    </div>
    </GlobalCtx.Provider>
  );
}

export default App;
