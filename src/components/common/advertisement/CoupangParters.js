import React, { useEffect } from "react";

const CoupangPartners = ({ width = "100%", height = "100px" }) => {
  useEffect(() => {
    // 쿠팡 파트너스 스크립트 추가
    const script = document.createElement("script");
    script.src = "https://ads-partners.coupang.com/g.js";
    script.async = true;
    script.onload = () => {
      // 스크립트 로드 후 PartnersCoupang 객체 사용
      const scriptInit = document.createElement("script");
      scriptInit.innerHTML = `
        new PartnersCoupang.G({
          id: 784987,
          template: 'carousel',
          trackingCode: 'AF0701292',
          width: '${width}',
          height: '${height}',
          tsource: '',
        });
      `;
      document.getElementById("coupang-partners").appendChild(scriptInit);
    };
    document.getElementById("coupang-partners").appendChild(script);

    // Cleanup 함수: 컴포넌트 언마운트 시 스크립트 제거
    return () => {
      const coupangPartnersElement =
        document.getElementById("coupang-partners");
      if (coupangPartnersElement) {
        coupangPartnersElement.innerHTML = "";
      }
    };
  }, [width, height]);

  return <div id="coupang-partners"></div>;
};

export default CoupangPartners;
