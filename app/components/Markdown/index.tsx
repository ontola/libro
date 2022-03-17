import {
  WithStyles,
  createStyles,
  withStyles,
} from '@material-ui/styles';
import rdf from '@ontologies/core';
import clsx from 'clsx';
import { useLRS } from 'link-redux';
import memoize from 'memoize-one';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';
import ReactMarkdown from 'react-markdown';

import { entityIsLoaded } from '../../helpers/data';
import { hasDataExtension } from '../../helpers/dataExtensions';
import {
  expandPath,
  isDifferentWebsite,
  retrievePath,
} from '../../helpers/iris';
import { handle } from '../../helpers/logging';
import { LibroTheme } from '../../themes/themes';
import Heading, { HeadingSize, HeadingVariant } from '../Heading';
import Link from '../Link';

const styles = (theme: LibroTheme) => createStyles({
  markdown: {
    '& a': {
      '&:hover': {
        textDecoration: 'underline',
      },
      textDecoration: 'underline',
    },
    '& a,p,h1,h2,h3,h4,span': {
      wordBreak: 'break-word',
    },
    '& blockquote': {
      '& p': {
        marginBottom: 0,
      },
      '&::after': {
        backgroundColor: theme.palette.grey.light,
        bottom: 0,
        content: '""',
        display: 'block',
        height: '100%',
        left: '-.7em',
        position: 'absolute',
        top: 0,
        width: '.3em',
      },
      fontStyle: 'italic',
      marginBottom: '1em',
      marginLeft: '.7em',
      position: 'relative',
    },
    // Required to overwrite styling for megaDraft component
    '& code,.public-DraftStyleDefault-pre': {
      backgroundColor: theme.palette.grey.xxLight,
      border: theme.greyBorder,
      fontFamily: 'monospace',
      fontSize: '.9em',
      marginBottom: '1em',
      overflow: 'auto',
      padding: '.2em .3em',
      whiteSpace: 'pre',
    },
    '& em': {
      fontStyle: 'italic',
    },
    '& h1': {
      fontSize: '1.3em',
    },
    '& h2': {
      fontSize: '1.2em',
    },
    '& h3': {
      fontSize: '1.1em',
    },
    '& h4,h3,h2,h1': {
      color: theme.palette.grey.midDark,
      fontWeight: 700,
      lineHeight: '1em',
      marginBottom: '.4em',
    },
    '& img': {
      maxWidth: '100%',
    },
    // Required to overwrite styling for megaDraft component
    '& p,.public-DraftStyleDefault-ltr': {
      marginBottom: '1em',
    },
    '& strong': {
      fontWeight: 'bold',
    },
    // eslint-disable-next-line sort-keys
    '& ol': {
      listStyleType: 'decimal',
    },
    '& ul': {
      listStyleType: 'disc',
    },
    '& ul,ol': {
      '& li': {
        // Required to overwrite styling for megaDraft component
        '& .public-DraftStyleDefault-ltr': {
          marginBottom: 0,
        },
        marginBottom: '.3em',
        marginLeft: '1.5em',
      },
      marginBottom: '.5em',
    },
    '&--inline': {
      '& a,p': {
        display: 'inline',
      },
      display: 'inline',
    },
    // Disabled collapsing margins
    display: 'flex',
    flexDirection: 'column',
    wordWrap: 'break-word',
  },
  noSpacing: {
    '& p': {
      marginBottom: 0,
    },
  },
});

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

const stylizedPlaintextLink = (link: any) => (
  <u>
    {link.value}
  </u>
);

const codePre = (link: any) => (
  <code>
    {link.value}
  </code>
);

type MarkdownProps = WithStyles<typeof styles> & {
  /** Array of strings that need to be highlighted */
  highlightedText?: string;
  /** Disable creation of anchor elements in the output */
  noLinks?: boolean;
  /** Remove padding */
  noSpacing?: boolean;
  /** Makes all links tabbable. */
  tabbable?: boolean;
  /** The content of the item */
  text: string;
};

interface MarkdownState {
  hasError: boolean;
}

class Markdown extends React.PureComponent<MarkdownProps, MarkdownState> {
  public static getDerivedStateFromError(): MarkdownState {
    return { hasError: true };
  }

  public static defaultProps = {
    tabbable: true,
  };

  constructor(props: MarkdownProps) {
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
          <Heading
            size={HeadingSize.LG}
            variant={HeadingVariant.Alert}
          >
            <FontAwesome name="exclamation-triangle" />
            {' '}
            <FormattedMessage
              defaultMessage="An error occurred while formatting the text. The original text in markdown format is as follows:"
              id="https://app.argu.co/i18n/errors/markdown/renderError"
            />
          </Heading>
          <div>
            {this.sourceText(highlightedText, text)}
          </div>
        </div>
      );
    }

    const customRenderers = {
      code: codePre,
      link: noLinks ? stylizedPlaintextLink : routerLink(tabbable ? undefined : -1),
    };

    const className = clsx({
      [this.props.classes.markdown]: true,
      [this.props.classes.noSpacing]: noSpacing,
    });

    return (
      <ReactMarkdown
        escapeHtml
        unwrapDisallowed
        className={className}
        renderers={customRenderers}
        source={this.sourceText(highlightedText, text)}
      />
    );
  }
}

export default withStyles(styles)(Markdown);
