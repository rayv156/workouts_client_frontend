import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import Display from './components/Display'
import Login from './components/Login'
import Signup from './components/Signup'
import Create from './components/Create'
import Update from './components/Update'
import Navigation from './components/Navigation'
import NavSignedIn from './components/NavSignedIn'

export const GlobalCtx = React.createContext(null)

function App() {

  const [gState, setgState] = React.useState({url: "http://localhost:3000", token: false, user: null, selectedLog: null})

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

  const checkLogin = () => {
    if (gState.token){
      return <NavSignedIn/>
    } else {
      return <Navigation/>
    }
  }

  return (
    <GlobalCtx.Provider value={{ gState, setgState }}>
    <div className="App">
      {checkLogin()}
      <Switch>
        <Route path="/" exact component={Display} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/login" exact component={Login} />
        <Route path="/create" exact component={Create} />
        <Route path="/update" exact component={Update}  />
        
      </Switch>
    </div>
    </GlobalCtx.Provider>
  );
}

export default App;
