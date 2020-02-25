import React from 'react';

import Grid from './index/Grid';
import Areyou from './index/Areyou';
import Hero from './index/Hero';
import Questions from './index/Questions';
import Why from './index/why';
import CallToAction from './index/callToAction';
import ViewAll from './index/AllQuestionCTA.js';
import Layout from '../components/layout/index.js';
import Pixel from '../utils/Pixel.js';

import './index/index.css';

const Page = () => {
  return (
    <Layout>
      <div className="landingContainer">
        {process.env.NODE_ENV === 'production' && (
          <Pixel name="FACEBOOK_PIXEL_1" />
        )}
        <Hero />
        <Why />
        <h2 className="landingHeader sans">
          It’s time to make entrepreneurship accessible for everyone:
        </h2>
        <Grid
          image="/static/women-working.jpg"
          alignment="left"
          sections={[
            {
              icon: '/static/1.png',

              body:
                'Find your tribe: the people who want to help you, and the people you can help'
            },
            {
              icon: '/static/8.png',

              body:
                'Fit into a community that celebrates your victories and hard-won knowledge with you'
            }
          ]}
        />
        <Grid
          image="/static/man-working.jpg"
          alignment="right"
          sections={[
            {
              icon: '/static/2.png',

              body:
                'Contribute to build your status as an industry expert and a successful authority'
            },
            {
              icon: '/static/5.png',

              body:
                'Get the answers you are looking for to daily problems without paying buckets full of cash for expensive programs'
            },
            {
              icon: '/static/6.png',

              body:
                'Make lifelong connections that will bring you additional profits and fulfillment for years to come'
            }
          ]}
        />
        <Questions />
        <ViewAll />
        <Areyou />
        <CallToAction />
        <hr className="sectionbreak" />
      </div>
    </Layout>
  );
};

export default Page;
