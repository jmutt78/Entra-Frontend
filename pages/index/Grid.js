import React from 'react';
import { withRouter } from 'next/router';
import styled from 'styled-components';
import { Mixpanel } from '../../utils/Mixpanel';
import { HeroSignupButtonText } from './styledComponents';

const GridContainer = styled.div`
  display: flex;
  ${props =>
    props.alignment === 'left'
      ? `flex-direction: row;`
      : `flex-direction: row-reverse;`};

  @media (max-width: 800px) {
    ${props =>
      props.alignment === 'left'
        ? `flex-direction: column-reverse;`
        : `flex-direction: column-reverse;`};
  }
`;

const GridContent = styled.div`
  width: 50%;
  background: #f2f4ef;
  padding: 0 10% 4rem 10%;

  @media (max-width: 800px) {
    width: 100%;
    background: #f2f4ef;
    padding: 1rem 10% 4rem 10%;
  }
`;

const GridHeader = styled.h3`
  font-size: 1.8rem;
  display: inline-block;
  position: relative;
  font-family: Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol';

  &:before {
    content: '';
    height: 3px;
    width: 100%;
    background-color: #85bdcb;
    position: absolute;
    bottom: -0.5em;
    left: 50%;
    transform: translate(-50%);
  }
`;

const GridSectionBody = styled.div`
  color: #767676;
  font-size: 1.2rem;
  font-family: Lora, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol';
`;

const ViewButton = styled.button`
  cursor: pointer;
  width: 300px;
  height: 3.5rem;
  max-width: 90%;
  border: none;
  border-radius: 100px;
  background: #85bdcb;
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding: 5px;
`;

const GridImageContainer = styled.div`
  background-image: url(${props => props.image});
  width: 50%;
  background-size: cover;
  background-color: #f2f4ef;
  background-position: center;
  background-attachment: scroll;
  background-origin: padding-box;
  background-clip: border-box;

  @media (max-width: 800px) {
    width: 100%;
    height: 400px;
  }
`;

const Grid = ({
  image,
  head,
  sub,
  alignment,
  sections,
  alt,
  buttonText,
  buttonLink,
  mixtag,
  router
}) => {
  return (
    <GridContainer alignment={alignment}>
      <GridContent>
        <GridHeader>{head}</GridHeader>

        {sections.map(({ icon, body, alt }, key) => (
          <div key={key} style={{ padding: '1rem 0' }}>
            <img src={icon} alt={alt} style={{ maxWidth: 60 }} />

            <GridSectionBody>{body}</GridSectionBody>
          </div>
        ))}
        <ViewButton>
          {' '}
          <HeroSignupButtonText
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              Mixpanel.track(mixtag);
              router.push({
                pathname: buttonLink
              });
            }}
          >
            {buttonText}
          </HeroSignupButtonText>
        </ViewButton>
      </GridContent>
      <GridImageContainer image={image} />
    </GridContainer>
  );
};

export default withRouter(Grid);
