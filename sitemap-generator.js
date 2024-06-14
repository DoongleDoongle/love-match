const { SitemapStream } = require("sitemap");
const { createWriteStream } = require("fs");
const { resolve } = require("path");

// SitemapStream 인스턴스를 생성하여 사이트맵 생성을 시작합니다.
const sitemap = new SitemapStream({ hostname: "https://love-match.co.kr" });

// 파일 스트림을 생성하여 'sitemap.xml' 파일을 작성합니다.
const writeStream = createWriteStream(
  resolve(__dirname, "./public/sitemap.xml")
);

// 스트림 완료 후 로그를 출력합니다.
writeStream.on("finish", () => {
  console.log("Sitemap created");
});

// SitemapStream을 파일 스트림으로 파이프 연결합니다.
sitemap.pipe(writeStream);

// 각 URL을 사이트맵에 추가합니다.
// 사이트 변경 주기: always -> hourly -> daily -> weekly -> monthly -> yearly -> never
sitemap.write({ url: "/", changefreq: "daily", priority: 1 });
sitemap.write({ url: "/taste-match", changefreq: "hourly", priority: 0.9 });
sitemap.write({ url: "/place-match", changefreq: "hourly", priority: 0.9 });
sitemap.write({
  url: "/contacts/developer",
  changefreq: "monthly",
  priority: 0.3,
});

// 사이트맵 생성을 종료합니다.
sitemap.end();
