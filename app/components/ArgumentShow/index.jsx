import React, { PropTypes } from 'react';

import PersonContainer from 'containers/PersonContainer';
import {
  Button,
  Card,
  CardActions,
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
      <Button
        icon="arrow-up"
        theme="box"
        onClick={() => undefined}
      >
        Upvote
      </Button>
      <Button
        icon="comment"
        theme="box"
        onClick={() => undefined}
      >
        Reageer
      </Button>
    </CardActions>
  </Card>
);

ArgumentShow.propTypes = propTypes;

export default ArgumentShow;
