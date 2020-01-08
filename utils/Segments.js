import React from 'react';
import Head from 'next/head';

import SEGMENT_PIXEL_1 from './segment-1.js';

export default ({ name }) => {
  return <Head>{name === 'SEGMENT_PIXEL_1' && <SEGMENT_PIXEL_1 />}</Head>;
};
