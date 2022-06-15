import React from 'react';
import { ReactSVG } from 'react-svg';

import { SVGPropsWithEval } from '../components';

const SVG = (props: SVGPropsWithEval): JSX.Element => (
  <ReactSVG {...props} />
);

export default SVG;
