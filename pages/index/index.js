import React from 'react';
import styled from 'styled-components';
import Grid from './Grid';
import Demo from './Demo';
import Hero from './Hero';
import VideoCTA from './VideoCTA';
import CallToAction from './callToAction';
import Layout from '../../components/layout/index.js';
import { SectionBreak } from './styledComponents';

import Pixel from '../../utils/Pixel.js';
import './index.css';

const LandingContainer = styled.div`
  width: 100%;
  background: #f2f4ef;
`;

const LandingHeader = styled.h2`
  font-size: 2em;
  font-weight: 700;
  color: #343434;
  font-variant-ligatures: common-ligatures;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 25px 50px 30px 50px;
  font-family: Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol';

  @media (max-width: 800px) {
    font-size: 1.5em;
    padding: 5;
  }
`;

const Landingpage = () => {
  return (
    <Layout>
      <LandingContainer>
        {process.env.NODE_ENV === 'production' && (
          <Pixel name="FACEBOOK_PIXEL_1" />
        )}
        <Hero />
        <LandingHeader>
          We build products that support entrepreneurs and connect them to a
          community so they can inspire, learn, and grow from one another.
        </LandingHeader>
        <VideoCTA />
        <Grid
          head={'Ask questions, get answers'}
          buttonLink={'/all'}
          buttonText={'Browse Questions'}
          mixtag={'Browse Questions'}
          image="/static/women-working.jpg"
          alignment="left"
          sections={[
            {
              icon: '/static/6.png',
              alt: 'bubble icon',
              body:
                'Get the answers you are looking for to daily problems without paying buckets full of cash for expensive programs'
            },
            {
              icon: '/static/2.png',
              alt: 'pencil icon',
              body:
                'Contribute to build your status as an industry expert and a successful authority'
            },

            {
              icon: '/static/1.png',
              alt: 'cross arrow',
              body:
                'Find your tribe: the people who want to help you, and the people you can help'
            }
          ]}
        />
        <Grid
          head={'Organize your business ideas and get feedback'}
          buttonLink={'/idea/public'}
          buttonText={'Browse Community Ideas'}
          mixtag={'Browse Ideas'}
          image="/static/man-working.jpg"
          alignment="right"
          sections={[
            {
              icon: '/static/9.png',
              alt: 'lightbulb icon',
              body: 'Document all of your business ideas in one place. '
            },

            {
              icon: '/static/5.png',
              alt: 'Money bag icon',
              body:
                'Our step by step process helps you break your ideas into the essential characteristics for success.'
            },
            {
              icon: '/static/8.png',
              alt: 'badge icon',
              body:
                'Make your idea public, and get feedback from the Entra community.'
            }
          ]}
        />
        {
          // <Demo />
        }
        <CallToAction />
        <SectionBreak />
      </LandingContainer>
    </Layout>
  );
};

export default Landingpage;
