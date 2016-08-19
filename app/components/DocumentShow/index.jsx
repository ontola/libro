// @flow
import './Documentshow.scss';
import React, { PropTypes } from 'react';
import { Box } from 'components';

const propTypes = {
  data: PropTypes.object.isRequired,
  loading: PropTypes.bool,
};

const DocumentShow = ({
  data,
}) => (
  <Box
    title={data.onderwerp}
    date={data.date}
    children={data.text}
    type={data.classification}
  />
);

DocumentShow.propTypes = propTypes;

export default DocumentShow;
