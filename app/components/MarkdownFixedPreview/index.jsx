import PropTypes from 'prop-types';
import React from 'react';

import Markdown from '../Markdown';

import './MarkdownFixedPreview.scss';

const propTypes = {
  text: PropTypes.string.isRequired,
};

// Shorter strings cost less computational power.
const STRING_LENGTH = 330;

const MarkdownFixedPreview = ({
  text,
}) => (
  <div className="MarkdownFixedPreview">
    <Markdown data-test="Thing-text" text={text.slice(0, STRING_LENGTH)} />
    {text.length > STRING_LENGTH && <div className="MarkdownFixedPreview__footer" />}
  </div>
);

MarkdownFixedPreview.propTypes = propTypes;

export default MarkdownFixedPreview;
