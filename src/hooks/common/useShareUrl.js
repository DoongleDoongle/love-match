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

    shareUrl({ type, title, description, imageUrl, buttonTitle, targetUrl });
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

    shareUrl({ type, title, description, imageUrl, buttonTitle, targetUrl });
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
      handleCapture();
      // sendKakaoFeed({ title, description, targetUrl, imageUrl, buttonTitle });
      // copyClipboard(targetUrl);
      break;
    case "clipboard":
      copyClipboard(targetUrl);
      break;
    case "captureScreen":
      handleCapture();
      break;
    default:
      throw new Error("존재하지 않는 공유 타입입니다.");
  }
};

const sendKakaoFeed = ({
  title = "러브 매치",
  description = "우리 사이, 이대로 괜찮을까?",
  targetUrl = "/",
  imageUrl = "https://love-match.co.kr/static/media/main.c7cb733adac7e6d11b19.jpeg",
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

const handleCapture = async () => {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: { mediaSource: "screen" },
    });

    const track = stream.getVideoTracks()[0];
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const video = document.createElement("video");

    video.srcObject = stream;
    video.onloadedmetadata = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      video.play();

      // 비디오 프레임을 캡쳐
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      track.stop();

      // 캡쳐된 이미지 다운로드
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "screenshot.png";
        a.click();
      });
    };
  } catch (error) {
    console.error("Error capturing screen:", error);
  }
};
