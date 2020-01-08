import React from 'react';
import Head from 'next/head';
import Segment from '../../utils/Segments.js';

const Meta = () => (
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <meta
      name="Description"
      content="The crowd-sourcing Q & A platform where we can all learn to be better: better marketers, better professionals, better mentors, and better business owners."
    />
    <Segment name="SEGMENT_PIXEL_1" />
    <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
    <link
      href="https://fonts.googleapis.com/css?family=Montserrat:400,400i,500,500i,600,600i,700,700i,800,800i,900,900i&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Lora:400,400i,500,500i,600,600i,700,700i,800,800i,900,900i&display=swap"
      rel="stylesheet"
    />

    <title>Entra</title>
  </Head>
);

export default Meta;
