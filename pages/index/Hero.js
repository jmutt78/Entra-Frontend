import React from 'react';
import styled from 'styled-components';

const HeroContainer = styled.div`
  background: content-box
      radial-gradient(rgb(37, 37, 37, 0.5), rgb(37, 37, 37, 0.5)),
    url(/static/paula-may-AJqeO_-ifx0-unsplash.jpg) center center no-repeat;
  background-size: cover;
  overflow: hidden;
`;

const HeroContent = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  text-align: center;
  padding: 5rem 15px 10rem 15px;

  @media (max-width: 800px) {
    padding: 2rem 15px;
  }
`;

const HeroHeader = styled.h1`
  font-size: 6rem;
  text-transform: uppercase;
  margin-top: 0;
  margin-bottom: -25px;
  font-family: Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol';
`;

const HeroText = styled.p`
  font-size: 2rem;
  font-weight: bold;
  padding: 0 70px;
  font-family: Lora, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol';

  @media (max-width: 800px) {
    font-size: 1.4rem;
    font-weight: bold;
    padding: 0;
  }
`;

class Hero extends React.Component {
  render() {
    return (
      <HeroContainer>
        <HeroContent>
          <HeroHeader>Entra</HeroHeader>
          <HeroText>The Entrepreneurs Hub</HeroText>
        </HeroContent>
      </HeroContainer>
    );
  }
}

export default Hero;
