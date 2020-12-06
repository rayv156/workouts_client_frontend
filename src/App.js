import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import Display from './components/Display'
import Login from './components/Login'
import Signup from './components/Signup'
import Navigation from './components/Navigation'

export const GlobalCtx = React.createContext(null)

function App() {

  const [gState, setgState] = React.useState({url: "http://localhost:3000", token: false, user: null})

  React.useEffect(()=>{
     const token = window.localStorage.getItem("token")
     const user = JSON.parse(window.localStorage.getItem("user"))
    //console.log(user)
    if (token){
      setgState({...gState, token: true, user: user})
    } else {
      setgState({...gState, token: false, user: null})
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
