import React from "react";
import styled from "styled-components";
import { Nav } from "rsuite";

const CustomNav = styled(Nav)`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background};

  & .rs-nav-item {
    color: ${({ theme }) => theme.colors.lightBlueGrey};
    padding: 10px 20px;
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
      background-color: ${({ theme }) => theme.colors.hoverBackground};
    }

    &.rs-nav-item-active {
      color: ${({ theme }) => theme.colors.primary};
      background-color: ${({ theme }) => theme.colors.light};
    }
  }
`;

const CustomNavItem = styled(Nav.Item)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Navbar = ({ active, onSelect, participants }) => {
  return (
    <CustomNav
      activeKey={active}
      onSelect={onSelect}
      appearance="tabs"
      justified
    >
      {participants.map((participant, idx) => (
        <CustomNavItem
          key={idx}
          eventKey={participant.nickname}
          active={active === participant.nickname}
        >
          {participant.nickname}
        </CustomNavItem>
      ))}
    </CustomNav>
  );
};

export default Navbar;
