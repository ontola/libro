import { makeStyles } from '@mui/styles';
import * as schema from '@ontologies/schema';
import {
  register,
  useProperty,
  useStrings,
} from 'link-redux';
import React from 'react';

import { useStrippedMarkdown } from '../../../helpers/useStrippedMarkdown';
import ontola from '../../../ontology/ontola';
import { cardFixedTopology, hoverBoxTopology } from '../../../topologies';

/* eslint-disable @typescript-eslint/no-magic-numbers */
const useStyles = makeStyles(() => ({
  footer: {
    background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, white 70%, white 100%)',
    bottom: 0,
    height: '2em',
    position: 'absolute',
    width: '100%',
  },
  root: {
    flexShrink: 100,
    overflow: 'hidden',
    position: 'relative',
  },
}));
/* eslint-enable @typescript-eslint/no-magic-numbers */

const STRING_CUTOFF = 150;

/**
 * Only displays text when there is no cover image, and does not overflow.
 * Note: It doesn't render inline anchor elements since it should always be wrapped in an outer
 * anchor.
 */
const TextCutoff = () => {
  const classes = useStyles();
  const [coverPhoto] = useProperty(ontola.coverPhoto);
  const [text] = useStrings([schema.text, schema.description]);
  const strippedText = useStrippedMarkdown(text);

  if (!text || coverPhoto) {
    return null;
  }

  return (
    <div className={classes.root}>
      <p>
        {strippedText}
      </p>
      {strippedText && strippedText.length > STRING_CUTOFF && <div className={classes.footer} />}
    </div>
  );
};

TextCutoff.type = schema.Thing;

TextCutoff.property = [schema.text, schema.description];

TextCutoff.topology = [
  cardFixedTopology,
  hoverBoxTopology,
];

export default register(TextCutoff);
