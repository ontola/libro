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
  // Selects all strings. Case insensitive.
  const pattern = new RegExp(highlightedText, 'gi');

  const highlighter = () =>
    text.replace(pattern, `**${highlightedText.toUpperCase()}**`);

  const MIN_LENGTH_TO_ADD_HIGHLIGHT = 1;

  const highlightOrNot = () => {
    if (highlightedText && highlightedText.length > MIN_LENGTH_TO_ADD_HIGHLIGHT) {
      return highlighter();
    }
    return text;
  };

  return (
    <ReactMarkdown
      className="Markdown"
      source={highlightOrNot()}
      unwrapDisallowed
      escapeHtml
      softBreak="br"
      renderers={{ Link: RouterLink }}
    />
  );
};

Markdown.propTypes = propTypes;

export default Markdown;
