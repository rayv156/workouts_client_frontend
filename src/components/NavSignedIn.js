import React from 'react'
import { Navbar, Nav} from 'react-bootstrap'
import {GlobalCtx} from "../App"
import "./Navigation.css"

const NavSignedIn = ({history}) => {
  const {gState, setgState} = React.useContext(GlobalCtx)
    return (
<>
<Navbar collapseOnSelect expand="lg" variant="dark">
  <Navbar.Brand href="/">Workout Log</Navbar.Brand>
      
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      
    </Nav>
    <Nav className="justify-content-center">
      <Navbar.Text>Signed in as: {gState.user.username} </Navbar.Text>

    </Nav>
    <Nav>
      <Nav.Link href="/workouts">Workouts</Nav.Link>
      <Nav.Link href="/logs">Logs</Nav.Link>
      <Nav.Link href="/" onClick={() => {
          window.localStorage.removeItem("token")
          window.localStorage.removeItem("user")
          setgState({...gState, token: false, user: null})
          alert("You have successfully Logged Out")
        }}>Logout</Nav.Link>

    </Nav>
  </Navbar.Collapse>
</Navbar>
  
</>

)

}

export default NavSignedIn