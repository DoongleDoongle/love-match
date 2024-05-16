export const useShareUrl = () => {
  const createInviteUrl = () => {
    const url = new URL(window.location.href);
    const basePath = url.pathname.replace("/results", "");
    url.searchParams.delete("participantId");
    const finalUrl = `${url.origin}${basePath}${url.search}`;

    navigator.clipboard
      .writeText(finalUrl)
      .then(() => {
        alert("공유 URL이 클립보드에 복사되었습니다. 친구를 초대해보세요!");
      })
      .catch((err) => {
        console.error("클립보드 복사에 실패했습니다:", err);
        alert("클립보드 복사에 실패했습니다.");
      });
  };

  const createShareUrl = () => {
    const url = new URL(window.location.href);

    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert(
          "공유 URL이 클립보드에 복사되었습니다. 내 결과를 친구와 공유해보세요!"
        );
      })
      .catch((err) => {
        console.error("클립보드 복사에 실패했습니다:", err);
        alert("클립보드 복사에 실패했습니다.");
      });
  };

  return { createInviteUrl, createShareUrl };
};
