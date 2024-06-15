import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faArrowUpFromBracket,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import theme from "styles/theme";
import { useShareUrl } from "hooks/common/useShareUrl";
import { translatePlatformNameToKorean } from "utils/functions/common";

import {
  incrementLikeCount,
  incrementShareCount,
  incrementInviteCount,
  fetchPlatform,
} from "apis/queries";

const IconButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  margin: 0 0 20px 0;
  color: ${({ theme }) => theme.colors.primary};
`;

const IconButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: transparent;
  padding: 10px;
  transition: transform 0.1s ease-in-out;

  &:active {
    transform: scale(0.9);
  }

  &:focus {
    outline: none;
  }
`;

const IconLabel = styled.span`
  margin-top: 2px;
  font-size: ${({ theme }) => theme.fontSizes.semiSmall};
`;

const Count = styled.div``;

const ResultIconGroup = ({
  platformName = "",
  inviteCount,
  setInviteCount,
}) => {
  const { createInviteUrl, createShareUrl } = useShareUrl();
  const [likeCount, setLikeCount] = useState(0);
  const [shareCount, setShareCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { platform, error } = await fetchPlatform(platformName);
      if (!error && platform !== null) {
        setLikeCount(platform.like_count);
        setShareCount(platform.share_count);
        setInviteCount(platform.invite_count);
      }
    };

    if (platformName.length > 0) {
      fetchData();
    }
  }, [platformName, setInviteCount]);

  const IconSize = "lg"; // 2xs, xs, sm, lg, xl, 2xl, 1x, 2x, 3x, 4x, 5x, 6x, 7x, 8x, 9x, 10x
  const IconColor = theme.colors.primary;
  const kakaoOptions = {
    title: `${translatePlatformNameToKorean(platformName)} - 러브매치`,
    imageUrl: `/games/balance-match/${platformName}/index.png
    `,
  };

  const likeHandler = async () => {
    const { platform, error } = await incrementLikeCount(platformName);
    if (!error && platform !== null) {
      setLikeCount(platform.like_count);
    }
  };

  const shareHandler = async () => {
    const { platform, error } = await incrementShareCount(platformName);
    if (!error && platform !== null) {
      setShareCount(platform.share_count);
      createShareUrl(kakaoOptions);
    }
  };

  const inviteHandler = async () => {
    const { platform, error } = await incrementInviteCount(platformName);
    if (!error && platform !== null) {
      setInviteCount(platform.invite_count);
      createInviteUrl(kakaoOptions);
    }
  };

  return (
    <IconButtonWrapper>
      <IconButton onClick={likeHandler}>
        <FontAwesomeIcon icon={faThumbsUp} size={IconSize} color={IconColor} />
        <IconLabel>좋아요</IconLabel>
        <Count>{likeCount}</Count>
      </IconButton>

      <IconButton onClick={shareHandler}>
        <FontAwesomeIcon
          icon={faArrowUpFromBracket}
          size={IconSize}
          color={IconColor}
        />
        <IconLabel>내결과공유</IconLabel>
        <Count>{shareCount}</Count>
      </IconButton>

      <IconButton onClick={inviteHandler}>
        <FontAwesomeIcon icon={faUsers} size={IconSize} color={IconColor} />
        <IconLabel>친구초대</IconLabel>
        <Count>{inviteCount}</Count>
      </IconButton>
    </IconButtonWrapper>
  );
};

export default ResultIconGroup;
