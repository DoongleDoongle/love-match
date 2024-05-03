import styled from "styled-components";
import { Nav } from "rsuite";

const NavItem = styled(Nav.Item)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20%;
  text-align: center;
  color: ${({ theme, active }) => (active ? "black" : theme.colors.primary)};
  background-color: ${({ theme }) => theme.colors.background};
`;

const Navbar = ({ active, onSelect, participants }) => {
  return (
    <Nav activeKey={active} onSelect={onSelect} style={{ width: "100%" }}>
      {participants.map((participant) => (
        <NavItem
          key={participant.name}
          eventKey={participant.name}
          style={{ width: `${100 / participants.length}%` }}
          active={active === participant.name}
        >
          {participant.name}
        </NavItem>
      ))}
    </Nav>
  );
};

export default Navbar;
