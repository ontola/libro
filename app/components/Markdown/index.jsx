import rdf from '@ontologies/core';
import classNames from 'classnames';
import { useLRS } from 'link-redux';
import memoize from 'memoize-one';
import PropTypes from 'prop-types';
import React from 'react';
import ReactMarkdown from 'react-markdown';

import { dataExtensions, entityIsLoaded } from '../../helpers/data';
import {
  expandPath,
  isDifferentWebsite,
  retrievePath,
} from '../../helpers/iris';
import Link from '../Link';

import './Markdown.scss';

const MIN_LENGTH_TO_ADD_HIGHLIGHT = 1;

const routerLink = (tabIndex) => (link) => {
  const extendedLink = expandPath(link.href);
  const dataLink = dataExtensions.find((ext) => extendedLink.endsWith(ext));
  const lrs = useLRS();

  if (!dataLink && !isDifferentWebsite(extendedLink)) {
    if (__CLIENT__ && !entityIsLoaded(lrs, rdf.namedNode(extendedLink))) {
      lrs.queueEntity(rdf.namedNode(extendedLink));
    }

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

const stylizedPlaintextLink = (link) => <u>{link.value}</u>;

const codePre = (link) => <code className="Markdown__inline-code">{link.value}</code>;

class Markdown extends React.PureComponent {
  static propTypes = {
    /** Array of strings that need to be highlighted */
    highlightedText: PropTypes.string,
    /** Disable creation of anchor elements in the output */
    noLinks: PropTypes.bool,
    /** Remove padding */
    noSpacing: PropTypes.bool,
    /** Makes all links tabbable. */
    tabbable: PropTypes.bool,
    /** The content of the item */
    text: PropTypes.string.isRequired,
  };

  static defaultProps = {
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
      noLinks,
      noSpacing,
      tabbable,
      text,
    } = this.props;

    const customRenderers = {
      code: codePre,
      link: noLinks ? stylizedPlaintextLink : routerLink(tabbable ? undefined : -1),
    };

    const classes = classNames({
      Markdown: true,
      'Markdown--no-spacing': noSpacing,
    });

    return (
      <ReactMarkdown
        escapeHtml
        unwrapDisallowed
        className={classes}
        renderers={customRenderers}
        softBreak="br"
        source={this.sourceText(highlightedText, text)}
      />
    );
  }
}

export default Markdown;
