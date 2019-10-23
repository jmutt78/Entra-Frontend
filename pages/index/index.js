import React from 'react';

import Grid from './Grid';
import Areyou from './Areyou';
import Hero from './Hero';
import Questions from './Questions';
import Why from './why';
import CallToAction from './callToAction';
import ViewAll from './AllQuestionCTA.js';
import Layout from '../../components/layout/index.js';

import Pixel from '../../utils/Pixel.js';
import './index.css';

const Landingpage = () => {
  return (
    <Layout>
      <div className="landingContainer">
        <Pixel name="FACEBOOK_PIXEL_1" />
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
              icon: '/static/9.png',
              alt: 'lightbulb icon',
              body:
                'Whether you are just starting out and looking for some solid advice, or you have experience and knowledge you want to share with the next generation so we can make a better world, Entra is the right place for you.'
            },
            {
              icon: '/static/1.png',
              alt: 'cross arrow',
              body:
                'Find your tribe: the people who want to help you, and the people you can help'
            },
            {
              icon: '/static/8.png',
              alt: 'badge icon',
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
              alt: 'pencil icon',
              body:
                'Contribute to build your status as an industry expert and a successful authority'
            },
            {
              icon: '/static/6.png',
              alt: 'bubble icon',
              body:
                'Get the answers you are looking for to daily problems without paying buckets full of cash for expensive programs'
            },
            {
              icon: '/static/5.png',
              alt: 'Money bag icon',
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

export default Landingpage;
