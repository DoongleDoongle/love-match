export const useShareUrl = () => {
  const createInviteUrl = ({
    type = "kakao-feed",
    title,
    description,
    imageUrl,
    buttonTitle,
  } = {}) => {
    const url = new URL(window.location.href);
    const basePath = url.pathname.replace("/results", "");
    url.searchParams.delete("participantId");
    const targetUrl = `${url.origin}${basePath}${url.search}`;

    shareUrl({
      type,
      title,
      description: "우리 사이, 이대로 괜찮을까?",
      imageUrl,
      buttonTitle: "테스트 바로가기",
      targetUrl,
    });
  };

  const createShareUrl = ({
    type = "kakao-feed",
    title,
    description,
    imageUrl,
    buttonTitle,
  } = {}) => {
    const url = new URL(window.location.href);
    const targetUrl = url.href;

    shareUrl({
      type,
      title,
      description: "결과를 확인해보세요!",
      imageUrl,
      buttonTitle: "결과 보러 가기",
      targetUrl,
    });
  };

  return { createInviteUrl, createShareUrl };
};

const shareUrl = ({
  type,
  title,
  description,
  imageUrl,
  buttonTitle,
  targetUrl,
} = {}) => {
  switch (type) {
    case "kakao-feed":
      sendKakaoFeed({ title, description, targetUrl, imageUrl, buttonTitle });
      // copyClipboard(targetUrl);
      break;
    case "clipboard":
      copyClipboard(targetUrl);
      break;
    default:
      throw new Error("존재하지 않는 공유 타입입니다.");
  }
};

const sendKakaoFeed = ({
  title = "러브 매치",
  description = "우리 사이, 이대로 괜찮을까?",
  targetUrl = "/",
  imageUrl = "https://love-match.co.kr/banners/카카오_공유_배너_001.png",
  buttonTitle = "궁합 테스트 바로가기",
} = {}) => {
  window.Kakao.Link.sendDefault({
    objectType: "feed",
    content: {
      title: title,
      description: description,
      imageUrl: imageUrl,
      link: {
        mobileWebUrl: targetUrl,
        webUrl: targetUrl,
      },
    },
    buttons: [
      {
        title: buttonTitle,
        link: {
          mobileWebUrl: targetUrl,
          webUrl: targetUrl,
        },
      },
    ],
  });
};

const copyClipboard = (targetUrl = "/") => {
  navigator.clipboard
    .writeText(targetUrl)
    .then(() => {
      alert("URL이 클립보드에 복사되었습니다.");
    })
    .catch((err) => {
      console.error("클립보드 복사에 실패했습니다:", err);
      alert("클립보드 복사에 실패했습니다.");
    });
};
