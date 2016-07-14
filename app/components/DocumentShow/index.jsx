// @flow
import './documentshow.scss';
import React, { PropTypes } from 'react';
import {
  Box,
  Detail,
  DetailsBar,
  Heading,
  MarkdownContent,
} from '../';

const propTypes = {
  data: PropTypes.object.isRequired,
  loading: false,
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
      <MarkdownContent content={text} />
    </Box>
  );
};

DocumentShow.propTypes = propTypes;

export default DocumentShow;
