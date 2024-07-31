import { Badge, Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "./styles.module.css";
import { HeaderBasket, HeaderWishlist } from "../../eCommerce";
import { NavLink } from "react-router-dom";

const { headerLogo, headerContainer, headerRightBar } = styles;
function Header() {
  return (
    <header>
      <div className={headerContainer}>
        <h1 className={headerLogo}>
          <span>Atlas</span>
          <Badge bg="info">art</Badge>
        </h1>
        <div className={headerRightBar}>
          <HeaderWishlist />
          <HeaderBasket />
        </div>
      </div>
      <Navbar
        bg="dark"
        data-bs-theme="dark"
        expand="lg"
        className="bg-body-tertiary"
      >
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            ARTISANAT
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="categories">
                Categories
              </Nav.Link>
              <Nav.Link as={NavLink} to="about">
                about
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link as={NavLink} to="register">
                Registers
              </Nav.Link>
              <Nav.Link as={NavLink} to="login">
                Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
