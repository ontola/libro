import rdf from '@ontologies/core';
import clsx from 'clsx';
import { useLRS } from 'link-redux';
import memoize from 'memoize-one';
import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';
import ReactMarkdown from 'react-markdown';

import { hasDataExtension } from '../../../common/data';
import { entityIsLoaded } from '../../helpers/data';
import {
  expandPath,
  isDifferentWebsite,
  retrievePath,
} from '../../helpers/iris';
import { handle } from '../../helpers/logging';
import Heading, { HeadingSize, HeadingVariant } from '../Heading';
import Link from '../Link';

import './Markdown.scss';

const MIN_LENGTH_TO_ADD_HIGHLIGHT = 1;

const routerLink = (tabIndex: number | undefined) => (link: any) => {
  const extendedLink = expandPath(link.href);
  const isDataLink = extendedLink && hasDataExtension(extendedLink);
  const lrs = useLRS();

  if (extendedLink && !isDataLink && !isDifferentWebsite(extendedLink)) {
    if (__CLIENT__ && !entityIsLoaded(lrs, rdf.namedNode(extendedLink))) {
      lrs.queueEntity(rdf.namedNode(extendedLink));
    }

    return (
      <Link
        tabIndex={tabIndex}
        to={retrievePath(extendedLink) ?? '#'}
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

const stylizedPlaintextLink = (link: any) => <u>{link.value}</u>;

const codePre = (link: any) => <code className="Markdown__inline-code">{link.value}</code>;

interface PropTypes {
  highlightedText?: string;
  noLinks?: boolean;
  noSpacing?: boolean;
  tabbable?: boolean;
  text: string;
}

interface MarkdownState {
  hasError: boolean;
}

class Markdown extends React.PureComponent<PropTypes, MarkdownState> {
  public static propTypes = {
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

  public static getDerivedStateFromError(): MarkdownState {
    return { hasError: true };
  }

  public static defaultProps = {
    tabbable: true,
  };

  constructor(props: PropTypes) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  public componentDidCatch(error: Error): void {
    handle(error);
  }

  public sourceText = memoize((highlightedText, text) => {
    if (highlightedText && highlightedText.length > MIN_LENGTH_TO_ADD_HIGHLIGHT) {
      // Selects all strings. Case insensitive.
      const pattern = new RegExp(highlightedText, 'gi');

      return text.replace(pattern, `**${highlightedText.toUpperCase()}**`);
    }

    return text;
  });

  public render() {
    const {
      highlightedText,
      noLinks,
      noSpacing,
      tabbable,
      text,
    } = this.props;

    if (this.state.hasError) {
      return (
        <div>
          <Heading size={HeadingSize.LG} variant={HeadingVariant.Alert}>
            <FontAwesome name="exclamation-triangle" />
            {' '}
            <FormattedMessage
              defaultMessage="An error occurred while formatting the text. The original text in markdown format is as follows:"
              id="https://app.argu.co/i18n/errors/markdown/renderError"
            />
          </Heading>
          <div>{this.sourceText(highlightedText, text)}</div>
        </div>
      );
    }

    const customRenderers = {
      code: codePre,
      link: noLinks ? stylizedPlaintextLink : routerLink(tabbable ? undefined : -1),
    };

    const classes = clsx({
      'Markdown': true,
      'Markdown--no-spacing': noSpacing,
    });

    return (
      <ReactMarkdown
        escapeHtml
        unwrapDisallowed
        className={classes}
        renderers={customRenderers}
        source={this.sourceText(highlightedText, text)}
      />
    );
  }
}

export default Markdown;
