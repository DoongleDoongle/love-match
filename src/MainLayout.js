import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { calculateMainLayoutHeight } from "styles/functions";

const MainLayoutContainer = styled.div`
  width: 100%;
  height: ${({ theme }) => calculateMainLayoutHeight(theme)};
  overflow-y: auto;
  overflow-x: hidden; // 좌우 스크롤 없애기

  /* 스크롤바 스타일링 (웹킷 브라우저 전용) */
  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 10px;
    border: 3px solid white; // 스크롤바 주변에 여백을 줌
  }

  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.colors.background};
    border: 1px solid rgb(0, 0, 0, 0.2);
    border-radius: 10px;
  }
`;

const MainLayout = ({ children }) => {
  const layoutRef = useRef(null);
  const startY = useRef(0);
  const endY = useRef(0);

  useEffect(() => {
    const handleTouchStart = (e) => {
      startY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      endY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      if (layoutRef.current.scrollTop === 0 && startY.current < endY.current) {
        window.location.reload();
      }
    };

    const layout = layoutRef.current;
    layout.addEventListener("touchstart", handleTouchStart);
    layout.addEventListener("touchmove", handleTouchMove);
    layout.addEventListener("touchend", handleTouchEnd);

    return () => {
      layout.removeEventListener("touchstart", handleTouchStart);
      layout.removeEventListener("touchmove", handleTouchMove);
      layout.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return <MainLayoutContainer ref={layoutRef}>{children}</MainLayoutContainer>;
};

export default MainLayout;
