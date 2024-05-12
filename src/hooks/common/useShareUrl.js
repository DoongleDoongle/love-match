export const useShareUrl = () => {
  const shareUrl = () => {
    // 현재 URL 파싱
    const url = new URL(window.location.href);
    // 'results' 부분 제거
    const basePath = url.pathname.replace("/results", "");
    // 'participantId' 파라미터 제거
    url.searchParams.delete("participantId");
    // 최종 URL 조합
    const finalUrl = `${url.origin}${basePath}${url.search}`;

    // 수정된 URL을 클립보드에 복사
    navigator.clipboard
      .writeText(finalUrl)
      .then(() => {
        alert("공유 URL이 클립보드에 복사되었습니다. 친구와 공유해보세요!");
      })
      .catch((err) => {
        console.error("클립보드 복사에 실패했습니다:", err);
        alert("클립보드 복사에 실패했습니다.");
      });
  };

  return { shareUrl };
};
