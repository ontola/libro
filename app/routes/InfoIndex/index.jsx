import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

import path from 'helpers/paths';
import {
  CardContent,
  CardRow,
  Container,
  Heading,
  Widget,
} from 'components';

import articles, { order } from '../../articles';

const renderLink = article => (
  <Link to={path.info(article)}>
    <CardRow
      key={article}
      showArrow
    >
      <CardContent>
        <Heading size={3}>
          {articles[article].title}
        </Heading>
      </CardContent>
    </CardRow>
  </Link>
);

const InfoIndex = () => (
  <Container>
    <Helmet title="Informatie" />
    <Widget title="Informatie">
      {order.map(a => renderLink(a))}
    </Widget>
  </Container>
);

export default InfoIndex;
