import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Progress } from "rsuite"; // 가이드: https://rsuitejs.com/components/progress/
import "rsuite/dist/rsuite.min.css";
import { fetchChoices } from "apis/queries/choices";

import theme from "styles/theme";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  flex: 1; // 남은 공간을 모두 채움
  width: 100%;
`;

const TextArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.huge};
  font-weight: bolder;
  width: 100%;
  height: 100%;
  cursor: pointer;
  background-color: ${({ active, theme }) =>
    active
      ? theme.colors.primary
      : theme.colors.background}; // 클릭 시 배경색 변경
  color: ${({ active, theme }) =>
    active
      ? theme.colors.primary
      : theme.colors.dark}; // 클릭 시 텍스트 색상 변경
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
`;

const VersusText = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

const ProgressContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const LeftProgress = styled(Progress.Line)`
  width: 50%;
`;

const RightProgress = styled(Progress.Line)`
  width: 50%;
`;

const QuestionPage = () => {
  const navigate = useNavigate();
  const [keywords, setKeywords] = useState([{ top: "", bottom: "" }]);
  const [keywordIdx, setKeywordIdx] = useState(0);
  const [selected, setSelected] = useState(null); // 선택된 영역을 추적

  useEffect(() => {
    const fetchData = async () => {
      const { choices, error } = await fetchChoices();

      if (!error) {
        const pairedChoices = createPairedChoices(choices).slice(0, 7);
        setKeywords(pairedChoices);
      }
    };

    fetchData();
  }, []);

  const clickTextArea = (type) => {
    setSelected(type);
    if (keywordIdx + 1 < keywords.length) {
      setTimeout(() => {
        setKeywordIdx(keywordIdx + 1);
        setSelected(null); // 다음 질문으로 넘어가면 선택 해제
      }, 250); // 선택 시 시각적 피드백을 제공한 후 다음으로 넘어감
    } else {
      navigate("/taste-match/results"); // keywords를 모두 표시한 후 다음 페이지로 이동
    }
  };

  const currentKeyword = keywords[keywordIdx];
  const leftProgressPercentage = (keywordIdx / keywords.length) * 200;
  const rightProgressPercentage =
    leftProgressPercentage > 100 ? leftProgressPercentage - 100 : 0;

  return (
    <Container>
      <TextArea
        onClick={() => clickTextArea("top")}
        active={selected === "top"}
      >
        {currentKeyword.top}
      </TextArea>

      <ProgressContainer>
        <LeftProgress
          percent={leftProgressPercentage}
          strokeColor={theme.colors.primary}
          showInfo={false}
          strokeWidth={10}
        />
        <VersusText>VS</VersusText>
        <RightProgress
          percent={rightProgressPercentage}
          strokeColor={theme.colors.primary}
          showInfo={false}
          strokeWidth={10}
        />
      </ProgressContainer>
      <TextArea
        onClick={() => clickTextArea("bottom")}
        active={selected === "bottom"}
      >
        {currentKeyword.bottom}
      </TextArea>
    </Container>
  );
};

const createPairedChoices = (choices) => {
  // group_id로 그룹화하고 결과를 배열로 변환
  const grouped = choices.reduce((acc, item) => {
    acc[item.group_id] = acc[item.group_id] || [];
    acc[item.group_id].push(item.choice);
    return acc;
  }, {});

  // 변환된 객체를 배열 [{top, bottom}] 형태로 매핑
  const pairedChoices = Object.values(grouped).map((group) => {
    return {
      top: group[0], // 첫 번째 항목을 top으로 설정
      bottom: group[1] || "", // 두 번째 항목이 없으면 빈 문자열로 설정
    };
  });

  return pairedChoices;
};

export default QuestionPage;
