import { makeStyles } from '@material-ui/styles';
import schema from '@ontologies/schema';
import { linkedPropType, register } from 'link-redux';
import React from 'react';

import { stripMarkdown } from '../../../helpers/markdownHelper';
import ontola from '../../../ontology/ontola';
import { cardFixedTopology } from '../../../topologies/Card/CardFixed';
import { hoverBoxTopology } from '../../../topologies/HoverBox';
import { popupTopology } from '../../../topologies/Popup';

/* eslint-disable no-magic-numbers */
const useStyles = makeStyles(() => ({
  footer: {
    background: 'linear-gradient(to bottom, transparent 0%, white 70%, white 100%)',
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
/* eslint-enable no-magic-numbers */

const STRING_CUTOFF = 150;

/**
 * Only displays text when there is no cover image, and does not overflow.
 * Note: It doesn't render inline anchor elements since it should always be wrapped in an outer
 * anchor.
 */
const TextCutoff = ({ coverPhoto, text }) => {
  const classes = useStyles();

  if (!text || coverPhoto) {
    return null;
  }

  const strippedText = stripMarkdown(text.value);

  return (
    <div className={classes.root}>
      <p>{strippedText}</p>
      {strippedText.length > STRING_CUTOFF && <div className={classes.footer} />}
    </div>
  );
};

TextCutoff.type = schema.Thing;

TextCutoff.property = [schema.text, schema.description];

TextCutoff.topology = [
  cardFixedTopology,
  hoverBoxTopology,
  popupTopology,
];

TextCutoff.mapDataToProps = {
  coverPhoto: ontola.coverPhoto,
  text: [schema.text, schema.description],
};

TextCutoff.propTypes = {
  coverPhoto: linkedPropType,
  text: linkedPropType,
};

export default register(TextCutoff);
