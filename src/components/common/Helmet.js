import { Helmet } from "react-helmet";

const CustomHelmet = ({
  title = "러브매치",
  description = "아이스브레이킹의 모든 것",
  keywords = "커플, 친구, 궁합, 사주, 궁합테스트, 궁합 테스트, 입맛, 장소",
  author = "박우림",
  url = "", // "/taste-match"
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content="https://love-match.co.kr/og-image.png"
      />
      <meta property="og:url" content={`https://love-match.co.kr/${url}`} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:site_name" content="러브매치" />
    </Helmet>
  );
};

export default CustomHelmet;
