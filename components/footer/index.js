import React from 'react';
import Link from 'next/link';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import styled from 'styled-components';

const CreditBarContainer = styled.div`
  background: #2d3436;
  display: flex;
  justify-content: center;
`;

const CopyrightText = styled(Typography)`
  color: #85bdcb;
  padding: 1.5rem 2rem;
  font-size: 18;
  font-weight: bold;
`;

const FooterBarContainer = styled.div`
  display: flex;
  background: #f2f4ef;
  flex-direction: row;
  justify-content: center;

  @media (max-width: 700px) {
    flex-direction: column;
    padding-left: 2rem;
  }
`;

const FooterSection = styled.div`
  width: 28vw;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 700px) {
    width: 100%;
  }
`;

const HeadingText = styled(Typography)`
  &&& {
    color: #85bdcb;
    font-size: 17px;
    font-weight: bold;
  }
`;

const ListItemStyled = styled(ListItem)`
  &&& {
    padding: 0.8rem 0;
  }
`;

const TextLink = styled.span`
  font-size: 16px;
  color: #2d3436;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;

  :hover {
    color: #85bdcb;
  }
`;

const StyledAnchor = styled.a`
  font-size: 16px;
  color: #2d3436;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;

  :hover {
    color: #85bdcb;
  }
`;

const StyledImg = styled.img`
  margin-right: 15px;
  width: 30px;
  color: grey;
`;

export const CreditBar = () => {
  return (
    <CreditBarContainer>
      <CopyrightText color="secondary">
        &copy; Copyright {new Date().getFullYear()} Entra
      </CopyrightText>
    </CreditBarContainer>
  );
};

export const FooterBar = () => {
  return (
    <FooterBarContainer>
      <FooterSection>
        <HeadingText>LEGAL</HeadingText>

        <List component="nav">
          <ListItemStyled>
            <Typography>
              <Link href="/terms">
                <TextLink>Terms and Conditions</TextLink>
              </Link>
            </Typography>
          </ListItemStyled>

          <ListItemStyled>
            <Typography>
              <Link href="/privacy">
                <TextLink>GDPR Privacy Policy</TextLink>
              </Link>
            </Typography>
          </ListItemStyled>
        </List>
      </FooterSection>

      <FooterSection>
        <HeadingText>COMMUNITY</HeadingText>

        <List component="nav">
          <ListItemStyled>
            <Typography>
              <Link href="/blog">
                <TextLink>Blog</TextLink>
              </Link>
            </Typography>
          </ListItemStyled>

          <ListItemStyled>
            <Typography>
              <Link href="/why">
                <TextLink>Our Why</TextLink>
              </Link>
            </Typography>
          </ListItemStyled>

          <ListItemStyled>
            <Typography>
              <StyledAnchor
                href="https://entra.drift.help/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Help
              </StyledAnchor>
            </Typography>
          </ListItemStyled>
        </List>
      </FooterSection>

      <FooterSection>
        <HeadingText>CONNECT WITH US</HeadingText>

        <List component="nav">
          <ListItemStyled>
            <a
              href="https://www.facebook.com/Entra-463274424415901"
              target="_blank"
              rel="noopener noreferrer"
            >
              <StyledImg
                src="/static/icons8-facebook-circled-48.png"
                alt="facebook icon"
              />
            </a>
            <a
              href="https://www.instagram.com/entra.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <StyledImg
                src="/static/icons8-instagram-old-50.png"
                alt="instagram icon"
              />
            </a>
            <a
              href="https://www.linkedin.com/company/entraio/about"
              target="_blank"
              rel="noopener noreferrer"
            >
              <StyledImg
                src="/static/icons8-linkedin-48.png"
                alt="linkedin icon"
              />
            </a>
            <a
              href="https://www.twitter.com/entraio"
              target="_blank"
              rel="noopener noreferrer"
            >
              <StyledImg
                src="/static/icons8-twitter-squared-48.png"
                alt="twitter icon"
              />
            </a>
          </ListItemStyled>
        </List>
      </FooterSection>
    </FooterBarContainer>
  );
};

const Footer = () => {
  return (
    <div>
      <FooterBar />
      <CreditBar />
    </div>
  );
};

export default Footer;
