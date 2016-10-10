/* eslint no-console: 0 */
import React, { PropTypes } from 'react';

import PersonContainer from 'containers/PersonContainer';
import {
  Card,
  CardActions,
  CardButton,
  CardContent,
  CardHeader,
  DetailsBar,
  DetailDate,
  Heading,
} from 'components';

const propTypes = {
  /** Content of argument */
  children: PropTypes.node,
  creator: PropTypes.string.isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired,
  side: PropTypes.oneOf(['pro', 'con']).isRequired,
  title: PropTypes.string.isRequired,
};

const ArgumentShow = ({
  children,
  creator,
  createdAt,
  side,
  title,
}) => (
  <Card>
    <CardHeader noSpacing>
      <Heading variant={side} size="3">{title}</Heading>
      <DetailsBar>
        <PersonContainer user={creator} />
        <DetailDate date={createdAt} />
      </DetailsBar>
    </CardHeader>

    <CardContent noSpacing maxLength={150}>
      {children}
    </CardContent>

    <CardActions>
      <CardButton action={() => console.log('upvote')} type="upvote">Upvote</CardButton>
      <CardButton action={() => console.log('reageer')} type="comment">Reageer</CardButton>
    </CardActions>
  </Card>
);

ArgumentShow.propTypes = propTypes;

export default ArgumentShow;
