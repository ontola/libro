// @flow
import './Documentshow.scss';
import React, { PropTypes } from 'react';
import {
  Box,
  Detail,
  DetailsBar,
  Heading,
} from 'components';

const propTypes = {
  data: PropTypes.object.isRequired,
  loading: PropTypes.bool,
};

const DocumentShow = ({ data }) => {
  const {
    classification,
    date,
    onderwerp,
    text,
  } = data;
  return (
    <Box>
      <Heading children={onderwerp} />
      <DetailsBar>
        <Detail text={classification} icon="file-o" />
        <Detail text={date} icon="clock-o" />
      </DetailsBar>
      <div>{text}</div>
    </Box>
  );
};

DocumentShow.propTypes = propTypes;

export default DocumentShow;
