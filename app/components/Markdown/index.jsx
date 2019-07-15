import memoize from 'memoize-one';
import PropTypes from 'prop-types';
import React from 'react';
import ReactMarkdown from 'react-markdown';

import Link from '../Link';
import { expandPath, isDifferentWebsite, retrievePath } from '../../helpers/iris';

import './Markdown.scss';

const MIN_LENGTH_TO_ADD_HIGHLIGHT = 1;

const routerLink = tabIndex => (link) => {
  const extendedLink = expandPath(link.href);

  if (!isDifferentWebsite(extendedLink)) {
    return (
      <Link
        tabIndex={tabIndex}
        to={retrievePath(extendedLink)}
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

const stylizedPlaintextLink = link => <u>{link.children}</u>;

const codePre = code => <code className="Markdown__inline-code">{code.children}</code>;

class Markdown extends React.PureComponent {
  static propTypes = {
    /** Array of strings that need to be highlighted */
    highlightedText: PropTypes.string,
    /** Renders all children inline */
    inline: PropTypes.bool,
    /** Disable creation of anchor elements in the output */
    noLinks: PropTypes.bool,
    /** Makes all links tabbable. */
    tabbable: PropTypes.bool,
    /** The content of the item */
    text: PropTypes.string.isRequired,
  };

  static defaultProps = {
    inline: false,
    tabbable: true,
  };

  sourceText = memoize((highlightedText, text) => {
    if (highlightedText && highlightedText.length > MIN_LENGTH_TO_ADD_HIGHLIGHT) {
      // Selects all strings. Case insensitive.
      const pattern = new RegExp(highlightedText, 'gi');
      return text.replace(pattern, `**${highlightedText.toUpperCase()}**`);
    }

    return text;
  });

  render() {
    const {
      highlightedText,
      inline,
      noLinks,
      tabbable,
      text,
    } = this.props;

    const customRenderers = {
      code: codePre,
      link: noLinks ? stylizedPlaintextLink : routerLink(tabbable ? undefined : -1),
    };

    return (
      <ReactMarkdown
        escapeHtml
        unwrapDisallowed
        className={`Markdown ${inline ? 'Markdown--inline' : ''}`}
        renderers={customRenderers}
        softBreak="br"
        source={this.sourceText(highlightedText, text)}
      />
    );
  }
}

export default Markdown;
