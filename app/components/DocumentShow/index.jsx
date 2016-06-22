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
  data: PropTypes.object,
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
      <div className="Box__content">
        <Heading children={onderwerp} />
        <DetailsBar>
          <Detail text={classification} icon="file-o" />
          <Detail text={date} icon="clock-o" />
        </DetailsBar>
        <MarkdownContent content={text} />
      </div>
    </Box>
  );
};

DocumentShow.propTypes = propTypes;

export default DocumentShow;
