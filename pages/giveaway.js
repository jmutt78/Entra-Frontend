import React from 'react';

import Grid from './index/Grid';
import Areyou from './index/Areyou';
import Hero from './index/Hero';
import Questions from './index/Questions';
import Why from './index/why';
import CallToAction from './index/callToAction';
import ViewAll from './index/AllQuestionCTA.js';
import Layout from '../components/layout/index.js';

import './index/index.css';

const Page = () => {
  function createMarkup() {
    return {
      __html: `  <div
            id="kingsumo-embed"
            data-url="https://kingsumo.com/g/l8qjb7/90-minute-power-hour-business-coaching-session-with-kate-bagoy"
          ></div>
          <script src="https://kingsumo.com/js/embed.js"></script>`
    };
  }

  return (
    <Layout>
      <div className="landingContainer">
        <h2 className="landingHeader sans">
          Enter To Win a FREE Coaching Session!
        </h2>

        <div dangerouslySetInnerHTML={createMarkup()} />
      </div>
    </Layout>
  );
};

export default Page;
