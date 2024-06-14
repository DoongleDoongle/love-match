import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.light};
  margin-top: 20px;
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
      <FooterText>© 2024 박우림. All rights reserved.</FooterText>
      <FooterText>Developed by 박우림.</FooterText>
      <br />

      <FooterText>
        Contact:{" "}
        <FooterLink href="mailto:woorimprog@gmail.com">
          woorimprog@gmail.com
        </FooterLink>
      </FooterText>

      {/* <FooterText>
        Visit our website:{" "}
        <FooterLink href="https://www.yourcompany.com" target="_blank">
          www.yourcompany.com
        </FooterLink>
      </FooterText>

      <FooterText>
        Follow us on:
        <FooterLink href="https://twitter.com/yourcompany" target="_blank">
          {" "}
          Twitter
        </FooterLink>
        ,
        <FooterLink href="https://facebook.com/yourcompany" target="_blank">
          {" "}
          Facebook
        </FooterLink>
        ,
        <FooterLink
          href="https://linkedin.com/company/yourcompany"
          target="_blank"
        >
          {" "}
          LinkedIn
        </FooterLink>
      </FooterText> */}
    </FooterContainer>
  );
};

export default Footer;
