import React from "react";
import { Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import styled from "styled-components";
import { TASTE_MATCH_ROOT_PATH } from "configs/route/routeConfig";

const SidebarOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5); // 반투명 배경
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transition: visibility 0.3s ease, opacity 0.3s ease;
  z-index: 1999; // SidebarContainer 아래에 위치
`;

const SidebarContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 250px;
  height: 100vh;
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
    <>
      <SidebarOverlay isOpen={isOpen} onClick={onClose} />
      <SidebarContainer isOpen={isOpen}>
        <StyledSidebar>
          <Menu>
            <SubMenu label="❣️ 밸런스 궁합 테스트" defaultOpen>
              <MenuItem
                component={
                  <Link to={TASTE_MATCH_ROOT_PATH} onClick={onClose} />
                }
              >
                입맛 궁합
              </MenuItem>
              <MenuItem
                component={<Link to={"/place-match"} onClick={onClose} />}
              >
                데이트 장소 궁합
              </MenuItem>
              <MenuItem
                component={<Link to={"/hobby-match"} onClick={onClose} />}
              >
                취미 궁합
              </MenuItem>
              <MenuItem
                component={<Link to={"/propensity-match"} onClick={onClose} />}
              >
                성향 궁합
              </MenuItem>
              <MenuItem
                component={<Link to={"/some-match"} onClick={onClose} />}
              >
                썸 궁합
              </MenuItem>
            </SubMenu>

            <SubMenu label="❄️ 아이스 브레이킹 게임" defaultOpen>
              <MenuItem
                component={<Link to="random-topic/1" onClick={onClose} />}
              >
                썸, 랜덤 이야기 주제
              </MenuItem>
              <MenuItem
                component={<Link to="random-topic/2" onClick={onClose} />}
              >
                술자리, 랜덤 이야기 주제
              </MenuItem>
            </SubMenu>

            <MenuItem
              component={<Link to={"contacts/developer"} onClick={onClose} />}
            >
              💌 개발자에게 피드백 주기
            </MenuItem>
          </Menu>
        </StyledSidebar>
      </SidebarContainer>
    </>
  );
};

export default CustomSidebar;
