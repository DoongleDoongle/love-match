import React, { useState } from "react";
import CustomHelmet from "components/common/Helmet";
import styled from "styled-components";
import { calculateMainLayoutHeight } from "styles/functions";

import Input from "components/common/utils/Input";
import Button from "components/common/utils/CustomButton";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  height: ${({ theme }) => calculateMainLayoutHeight(theme)};
  background-color: #f0f0f0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 8px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const DeveloperPage = ({ platformTitle = "" }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.length > 0 && email.length > 0 && message.length > 0) {
      const subject = `[러브매치] 개발자 문의: ${name}`;
      const body = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
      const mailtoLink = `mailto:woorimprog@gmail.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;

      // 메일 링크로 리디렉션
      window.location.href = mailtoLink;

      // 폼 제출 후 초기화
      setName("");
      setEmail("");
      setMessage("");
    }
  };

  return (
    <Container>
      <CustomHelmet
        title={`러브매치 - ${platformTitle}`}
        description="개발자에게 해주고 싶은 말이 있으신가요?"
      />
      <Form onSubmit={handleSubmit}>
        <Title>{platformTitle}</Title>
        <Label htmlFor="name">이름</Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Label htmlFor="email">이메일</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Label htmlFor="message">메시지</Label>
        <TextArea
          id="message"
          rows="5"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <Button type="submit">제출</Button>
      </Form>
    </Container>
  );
};

export default DeveloperPage;
