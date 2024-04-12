import { Link as UnStyledLink } from 'react-router-dom';
import styled from '@emotion/styled';

// Styling for the links in the navbar
const Link = styled(UnStyledLink)`
  color: white;
  text-decoration: none;
  padding: 10px 15px;
  transition: color 0.3s ease-in-out, text-decoration 0.3s ease-in-out;

  &:hover {
    color: #ffb6c1; // Soft pink on hover for better visibility
    text-decoration: underline;
  }
`;

// Styling for the navbar container
const StyledNav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #430000; // Deep maroon background
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // Subtle shadow for depth
  z-index: 1000; // Ensure navbar is above other content
`;

// Styling for the list in the navbar
const NavList = styled.ul`
  display: flex;
  justify-content: space-around;
  list-style: none;
  margin: 0;
  padding: 0.5rem 0;
`;

// Navbar component with structured and styled elements
const Navbar = () => {
  return (
    <StyledNav>
      <NavList>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/rps">RPS</Link></li>
        <li><Link to="/tic-tac">TicTac</Link></li>
        <li><Link to="/memory-game">Memory</Link></li>
      </NavList>
    </StyledNav>
  );
};

export default Navbar;
