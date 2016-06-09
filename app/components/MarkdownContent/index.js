// @flow
import React, { PropTypes } from 'react';

const propTypes = {
  content: PropTypes.string.isRequired,
};

function MarkdownContent({ content }) {
  return (
    <div className="markdownContent">
      {content}
    </div>
  );
}

MarkdownContent.propTypes = propTypes;

export default MarkdownContent;
