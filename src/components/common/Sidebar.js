import React from "react";
import { Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import styled from "styled-components";

import { TASTE_MATCH_ROOT_PATH } from "configs/route/routeConfig";

const SidebarContainer = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.header.height};
  left: 0;
  width: 250px;
  height: ${({ theme }) => `calc(100vh - ${theme.header.height})`};
  z-index: 2000;
  transform: ${({ isOpen }) =>
    isOpen ? "translateX(0)" : "translateX(-100%)"};
  transition: transform 0.3s ease;
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
`;

const StyledSidebar = styled(Sidebar)`
  height: 100%;
  background-color: ${(props) => props.theme.colors.background};
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const CustomSidebar = ({ isOpen, onClose }) => {
  return (
    <SidebarContainer isOpen={isOpen}>
      <StyledSidebar>
        <Menu>
          <SubMenu label="궁합 보기" defaultOpen>
            <MenuItem
              component={<Link to={TASTE_MATCH_ROOT_PATH} onClick={onClose} />}
            >
              입맛 궁합
            </MenuItem>
          </SubMenu>
        </Menu>
      </StyledSidebar>
    </SidebarContainer>
  );
};

export default CustomSidebar;
