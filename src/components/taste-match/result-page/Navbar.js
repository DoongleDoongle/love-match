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
      {participants.map((participant, idx) => (
        <NavItem
          key={idx}
          eventKey={participant.nickname}
          style={{ width: `${100 / participants.length}%` }}
          active={active === participant.nickname}
        >
          {participant.nickname}
        </NavItem>
      ))}
    </Nav>
  );
};

export default Navbar;
