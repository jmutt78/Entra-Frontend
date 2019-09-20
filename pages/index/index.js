import React from 'react';

import Grid from './Grid';
import Areyou from './Areyou';
import Hero from './Hero';
import Questions from './Questions';
import Why from './why';
import CallToAction from './callToAction';
import ViewAll from './AllQuestionCTA.js';
import Layout from '../../components/layout/index.js';

import './index.css';

const Landingpage = () => {
  return (
    <Layout>
      <div className="landingContainer">
        <Hero />
        <Why />
        <h2 className="landingHeader sans">
          It’s time to make entrepreneurship accessible for everyone:
        </h2>
        <Grid
          image="/static/inspired.jpg"
          alignment="left"
          sections={[
            {
              icon: '/static/3.png',

              body:
                'Find your tribe: the people who want to help you, and the people you can help'
            },
            {
              icon: '/static/4.png',

              body:
                'Fit into a community that celebrates your victories and hard-won knowledge with you'
            }
          ]}
        />
        <Grid
          image="/static/ask.jpeg"
          alignment="right"
          sections={[
            {
              icon: '/static/5.png',

              body:
                'Contribute to build your status as an industry expert and a successful authority'
            },
            {
              icon: '/static/6.png',

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

export default Landingpage;
