import React from 'react';
import { ReactSVG } from 'react-svg';

import { SVGPropsWithEval } from '../../containers/SVG';

const SVG = (props: SVGPropsWithEval): JSX.Element => (
  <ReactSVG {...props} />
);

export default SVG;
