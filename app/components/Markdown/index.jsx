import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import ReactMarkdown from 'react-markdown';
import './Markdown.scss';

const propTypes = {
  /** Array of strings that need to be highlighted */
  highlightedText: PropTypes.string,
  /** The content of the item */
  text: PropTypes.string.isRequired,
};

const MIN_LENGTH_TO_ADD_HIGHLIGHT = 1;
// Replaces all internal links with React Router links.
const RouterLink = link => (
  link.href.match(/^\//)
    ? <Link to={link.href}>{link.children}</Link>
    : <a href={link.href}>{link.children}</a>
);

const Markdown = ({
  highlightedText,
  text,
}) => {
  let source = text;
  if (highlightedText && highlightedText.length > MIN_LENGTH_TO_ADD_HIGHLIGHT) {
    // Selects all strings. Case insensitive.
    const pattern = new RegExp(highlightedText, 'gi');
    source = text.replace(pattern, `**${highlightedText.toUpperCase()}**`);
  }

  return (
    <ReactMarkdown
      className="Markdown"
      source={source}
      unwrapDisallowed
      escapeHtml
      softBreak="br"
      renderers={{ Link: RouterLink }}
    />
  );
};

Markdown.propTypes = propTypes;

export default Markdown;
