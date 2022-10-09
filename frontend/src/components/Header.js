import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { MdLightMode, MdOutlineLightMode } from 'react-icons/md'

import { useNavigate } from 'react-router-dom'
import { useDataContext } from  '../context/DataContext'

const Header = () => {
  const history = useNavigate()
  const goToLink = (link) => {
    history(link)
  }
  const { DarkMode, onChangeDarkMode, teacher } = useDataContext()
  return (
    <Navbar collapseOnSelect expand="lg" bg={DarkMode} variant={DarkMode}>
      <Container>
        <Navbar.Brand onClick={() => goToLink('/')}>Tester</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link eventKey={2} onClick={() => goToLink('/student')}>Žák</Nav.Link>
            <Nav.Link eventKey={2} onClick={() => goToLink('/teacher')}>Učitel</Nav.Link>
            {teacher?.admin == 1 && <Nav.Link eventKey={2} onClick={() => goToLink('/adminsection')}>Administrace</Nav.Link>}
          </Nav>
          <Nav>
            {!teacher && <Nav.Link onClick={() => goToLink('/login')}>Přihlásit se</Nav.Link>}
            {teacher && <Nav.Link onClick={() => goToLink('/profile')}>Profil</Nav.Link>}
            <Nav.Link onClick={onChangeDarkMode}> {DarkMode == 'dark' ? <MdOutlineLightMode /> : <MdLightMode />}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header