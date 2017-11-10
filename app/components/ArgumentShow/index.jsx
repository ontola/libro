import PropTypes from 'prop-types';
import React from 'react';

import PersonContainer from 'containers/PersonContainer';

import Button from '../Button';
import Card, {
  CardActions,
  CardContent,
  CardHeader,
} from '../Card';
import DetailsBar from '../DetailsBar';
import DetailDate from '../DetailDate';
import Heading from '../Heading';
import Markdown from '../Markdown';

const propTypes = {
  createdAt: PropTypes.instanceOf(Date),
  creator: PropTypes.string,
  name: PropTypes.string.isRequired,
  side: PropTypes.oneOf(['pro', 'con']).isRequired,
  /** Content of argument */
  text: PropTypes.string,
};

const ArgumentShow = ({
  createdAt,
  creator,
  side,
  text,
  name,
}) => (
  <Card>
    <CardHeader noSpacing>
      <Heading size="3" variant={side}>{name}</Heading>
      <DetailsBar>
        {creator && <PersonContainer user={creator} />}
        {createdAt && <DetailDate date={createdAt} />}
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
