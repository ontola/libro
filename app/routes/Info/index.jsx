import Helmet from 'react-helmet';
import React, { PropTypes } from 'react';

import articles from '../../articles';
import {
  Cover,
  Heading,
  Markdown,
  Container,
} from 'components';

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
    <Cover type="white" fullScreen>
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
