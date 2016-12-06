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
  Markdown,
} from 'components';

const propTypes = {
  creator: PropTypes.string,
  createdAt: PropTypes.instanceOf(Date).isRequired,
  side: PropTypes.oneOf(['pro', 'con']).isRequired,
  /** Content of argument */
  text: PropTypes.node,
  title: PropTypes.string.isRequired,
};

const ArgumentShow = ({
  createdAt,
  creator,
  side,
  text,
  title,
}) => (
  <Card>
    <CardHeader noSpacing>
      <Heading variant={side} size="3">{title}</Heading>
      <DetailsBar>
        {creator && <PersonContainer user={creator} />}
        <DetailDate date={createdAt} />
      </DetailsBar>
    </CardHeader>
    <CardContent noSpacing>
      <Markdown
        text={text}
      />
    </CardContent>
    <CardActions>
      <CardButton type="upvote" action={() => undefined}>Upvote</CardButton>
      <CardButton type="comment" action={() => undefined}>Reageer</CardButton>
    </CardActions>
  </Card>
);

ArgumentShow.propTypes = propTypes;

export default ArgumentShow;
