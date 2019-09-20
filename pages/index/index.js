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
              head: 'Q: Why is a cash flow statement important?',
              body:
                'Q: I’ve been working on a business plan for a few weeks now and keep getting stuck on the cash flow statement. Why is it important?'
            },
            {
              icon: '/static/4.png',
              head: 'Q: How do I come up with a great product idea?',
              body:
                'Q: I have been racking my brain for months and can’t seem to find the right idea for me. How do I find the right product idea?'
            }
          ]}
        />
        <Grid
          image="/static/ask.jpeg"
          alignment="right"
          sections={[
            {
              icon: '/static/5.png',
              head: 'Q: Why is a cash flow statement important?',
              body: (
                <>
                  <p>
                    A: It can help determine whether there’s enough cash flow to
                    cover future expenses like payroll.
                  </p>
                  <p>
                    It can also be useful to compare the cash reported under the
                    operating activities section with the net income reported on
                    the income statement; if the cash reported is consistently
                    higher than net income, that’s a good sign.
                  </p>
                </>
              )
            },
            {
              icon: '/static/6.png',
              head: 'Q: How do I come up with a great product idea?',
              body:
                'A: Start to notice problems in your own life and try to build something to fix your pain points.'
            }
          ]}
        />
        <Grid
          image="/static/clout.jpg"
          alignment="left"
          sections={[
            {
              icon: '/static/7.png',
              head: 'Vote for the best answers',
              body:
                'Other Entras vote for the best answer to the question. Show your expertise.'
            },
            {
              icon: '/static/8.png',
              head: 'Receive badges for helping',
              body:
                'Every time you help a fellow Entra’ you work towards achieving badges.'
            }
          ]}
        />

        <Areyou />
        <CallToAction />
        <Questions />
        <ViewAll />
      </div>
    </Layout>
  );
};

export default Landingpage;
