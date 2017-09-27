import PropTypes from 'prop-types';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

import './Markdown.scss';

const propTypes = {
  /** Array of strings that need to be highlighted */
  highlightedText: PropTypes.string,
  /** Makes all links tabbable. */
  tabbable: PropTypes.bool,
  /** The content of the item */
  text: PropTypes.string.isRequired,
};

const MIN_LENGTH_TO_ADD_HIGHLIGHT = 1;
// Replaces all internal links with React Router links.
const routerLink = tabIndex => (link) => {
  if (link.href.match(/^\//)) {
    return (
      <Link
        tabIndex={tabIndex}
        to={link.href}
      >
        {link.children}
      </Link>
    );
  }
  return (
    <a
      href={link.href}
      rel="noopener noreferrer"
      tabIndex={tabIndex}
      target="_blank"
    >
      {link.children}
    </a>
  );
};

const defaultProps = {
  tabbable: true,
};

const Markdown = ({
  highlightedText,
  tabbable,
  text,
}) => {
  const tabIndex = tabbable ? undefined : -1;
  let source = text;
  if (highlightedText && highlightedText.length > MIN_LENGTH_TO_ADD_HIGHLIGHT) {
    // Selects all strings. Case insensitive.
    const pattern = new RegExp(highlightedText, 'gi');
    source = text.replace(pattern, `**${highlightedText.toUpperCase()}**`);
  }

  return (
    <ReactMarkdown
      escapeHtml
      unwrapDisallowed
      className="Markdown"
      renderers={{ Link: routerLink(tabIndex) }}
      softBreak="br"
      source={source}
    />
  );
};

Markdown.propTypes = propTypes;
Markdown.defaultProps = defaultProps;

export default Markdown;
