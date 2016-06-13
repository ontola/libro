// @flow
import React, { PropTypes } from 'react';
import './markdownContent.scss';

const propTypes = {
  content: PropTypes.string,
};

function MarkdownContent({ content }) {
  return (
    <div className="markdownContent test">
      {content}
    </div>
  );
}

MarkdownContent.propTypes = propTypes;

export default MarkdownContent;
