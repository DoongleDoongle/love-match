export const useShareUrl = () => {
  const createInviteUrl = ({
    title,
    description,
    imageUrl,
    buttonTitle,
  } = {}) => {
    const url = new URL(window.location.href);
    const basePath = url.pathname.replace("/results", "");
    url.searchParams.delete("participantId");
    const targetUrl = `${url.origin}${basePath}${url.search}`;

    sendKakaoFeed({ title, description, targetUrl, imageUrl, buttonTitle });
  };

  const createShareUrl = ({
    title,
    description,
    imageUrl,
    buttonTitle,
  } = {}) => {
    const url = new URL(window.location.href);
    const targetUrl = url.href;

    sendKakaoFeed({ title, description, targetUrl, imageUrl, buttonTitle });
  };

  return { createInviteUrl, createShareUrl };
};

const sendKakaoFeed = ({
  title = "러브 매치",
  description = "우리 사이, 이대로 괜찮을까?",
  targetUrl = "/",
  imageUrl = "https://love-match.vercel.app/static/media/main.c7cb733adac7e6d11b19.jpeg",
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
