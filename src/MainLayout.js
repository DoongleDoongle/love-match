import React, { useRef, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { calculateMainLayoutHeight } from "styles/functions";

const pullDownAnimation = keyframes`
  0% { padding-top: 0; }
  100% { padding-top: 50px; }
`;

const bounceBackAnimation = keyframes`
  0% { padding-top: 50px; }
  100% { padding-top: 0; }
`;

const MainLayoutContainer = styled.div`
  width: 100%;
  height: ${({ theme }) => calculateMainLayoutHeight(theme)};
  overflow-y: ${({ isPulling }) => (isPulling ? "hidden" : "auto")};
  overflow-x: hidden;
  padding-top: 0;
  transition: padding-top 0.2s;

  /* 스크롤바 스타일링 (웹킷 브라우저 전용) */
  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 10px;
    border: 3px solid white;
  }

  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.colors.background};
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;
  }

  &.pulling {
    animation: ${pullDownAnimation} 0.2s forwards;
  }

  &.bouncing {
    animation: ${bounceBackAnimation} 0.2s forwards;
  }
`;

const PullIndicator = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  transition: transform 0.2s;

  &.visible {
    transform: translateY(50px);
  }
`;

const MainLayout = ({ children }) => {
  const layoutRef = useRef(null);
  const startY = useRef(0);
  const [isPulling, setIsPulling] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const [indicatorVisible, setIndicatorVisible] = useState(false);

  useEffect(() => {
    const handleTouchStart = (e) => {
      startY.current = e.touches[0].clientY;
      setIsBouncing(false);
    };

    const handleTouchMove = (e) => {
      const currentY = e.touches[0].clientY;
      const distance = currentY - startY.current;

      if (layoutRef.current.scrollTop === 0 && distance > 50) {
        // 사용자가 실제로 스크롤을 하려고 하는지 감지
        setIsPulling(true);
        setIndicatorVisible(true);
      }
    };

    const handleTouchEnd = () => {
      if (isPulling) {
        setIsPulling(false);
        setIsBouncing(true);
        setIndicatorVisible(false);
        setTimeout(() => window.location.reload(), 200); // delay reload to allow bounce animation to finish
      } else {
        setIsBouncing(false); // 터치 종료 시 의도적이지 않은 움직임 방지
        setIndicatorVisible(false);
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
  }, [isPulling]);

  return (
    <MainLayoutContainer
      ref={layoutRef}
      className={isPulling ? "pulling" : isBouncing ? "bouncing" : ""}
      isPulling={isPulling}
    >
      <PullIndicator className={indicatorVisible ? "visible" : ""}>
        새로고침
      </PullIndicator>
      {children}
    </MainLayoutContainer>
  );
};

export default MainLayout;
