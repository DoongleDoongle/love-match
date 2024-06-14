import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.light};
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const FooterText = styled.div``;

const FooterLink = styled.a`
  color: ${(props) => props.theme.colors.secondary};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>
        Contact:{" "}
        <FooterLink href="mailto:woorimprog@gmail.com">
          woorimprog@gmail.com
        </FooterLink>
      </FooterText>

      <FooterText>
        Follow us on:
        <FooterLink href="https://github.com/woorim960" target="_blank">
          {" "}
          Github
        </FooterLink>
        ,
        <FooterLink href="https://www.youtube.com/@woorimit" target="_blank">
          {" "}
          Youtube
        </FooterLink>
        ,
        <FooterLink
          href="https://www.instagram.com/dev_woorimit/"
          target="_blank"
        >
          {" "}
          Instagram
        </FooterLink>
        {/* ,
        <FooterLink href="https://woorim960.github.io/" target="_blank">
          {" "}
          Blog
        </FooterLink> */}
      </FooterText>

      <br />

      <FooterText>© 2024 박우림. All rights reserved.</FooterText>
      <FooterText>Developed by 박우림.</FooterText>
    </FooterContainer>
  );
};

export default Footer;
