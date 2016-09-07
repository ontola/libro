import React, { PropTypes } from 'react';

import PersonContainer from 'containers/PersonContainer';
import {
  Card,
  CardActions,
  CardButton,
  CardContent,
  CardHeader,
  DetailsBar,
  Detail,
  Heading,
} from 'components';

const propTypes = {
  children: PropTypes.node,
  creator: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  side: PropTypes.string.isRequired,
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
        <Detail text={createdAt} icon="clock-o" />
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
