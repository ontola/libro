import Helmet from 'react-helmet';
import React, { PropTypes } from 'react';

import {
  Container,
  Cover,
  Heading,
  Markdown,
} from 'components';

import articles from '../../articles';

const propTypes = {
  // Gets the infoId from the address bar
  params: PropTypes.shape({
    infoId: PropTypes.string,
  }),
};

const Info = ({ params }) => {
  const {
    title,
    text,
  } = articles[params.infoId];

  return (
    <Cover fullScreen type="white">
      <Helmet title={title} />
      <Container>
        <Heading>{title}</Heading>
        <Markdown text={text} />
      </Container>
    </Cover>
  );
};

Info.propTypes = propTypes;

export default Info;
//
