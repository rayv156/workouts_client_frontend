import React from 'react'
import { Navbar, Nav} from 'react-bootstrap'
import {GlobalCtx} from "../App"


const Navigation = ({history}) => {
  const {gState, setgState} = React.useContext(GlobalCtx)
    return (
<>
<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand href="/">Workout Log</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      
    </Nav>
    <Nav>
      <Nav.Link href="/login">Login</Nav.Link>
      <Nav.Link href="/signup">
        Signup
      </Nav.Link>
      <Nav.Link href="/" onClick={() => {
                    window.localStorage.removeItem("token")
                    setgState({...gState, token: false, user: null})

                }}>Logout</Nav.Link>

    </Nav>
  </Navbar.Collapse>
</Navbar>
  
</>

)

}

export default Navigation