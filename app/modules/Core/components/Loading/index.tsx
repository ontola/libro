import Tab from '@mui/material/Tab';
import { makeStyles } from '@mui/styles';
import { CSSProperties } from '@mui/styles/withStyles/withStyles';
import clsx from 'clsx';
import { SubjectProp } from 'link-redux/dist-types/types';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import { LibroTheme } from '../../../Common/theme/types';
import { Breadcrumb } from '../../../Common/components/Breadcrumbs';
import CardContent from '../../../Common/components/Card/CardContent';
import { useCoverImageStyles } from '../../../Common/components/CoverImage';
import { coverImageChildCID } from '../../../Common/components/OverlayContainer';
import BreadcrumbsBar from '../../../Common/topologies/BreadcrumbsBar';
import Card, {
  CardFixed,
  CardMicroRow,
  CardRow,
} from '../../../Common/topologies/Card';
import Container from '../../../Common/topologies/Container';
import FullResourceTopology from '../../../Common/topologies/FullResource';

export const loadingParagraphCID = 'CID-LoadingParagraph';
export const loadingButtonCID = 'CID-LoadingButton';

export const loadingBackground = (theme: LibroTheme): CSSProperties => ({
  animationDuration: '1s',
  animationFillMode: 'forwards',
  animationIterationCount: 'infinite',
  animationName: '$loadingBackgroundAnimation',
  animationTimingFunction: 'linear',
  backgroundImage: `linear-gradient(to right, ${theme.palette.transparent.dark} 8%, ${theme.palette.transparent.midDark} 18%, ${theme.palette.transparent.dark} 33%)`,
  backgroundSize: 400,
  borderRadius: theme.shape.borderRadius,
  color: 'transparent',
  position: 'relative',
});

const useStyles = makeStyles<LibroTheme>((theme) => ({
  '@keyframes loadingBackgroundAnimation': {
    '0%': {
      backgroundPosition: '-200px 0',
    },

    '100%': {
      backgroundPosition: '200px 0',
    },
  },
  loadingBackground: loadingBackground(theme),
  loadingBackgroundInverse: {
    backgroundImage: `linear-gradient(to right, ${theme.palette.transparent.xLight} 8%, ${theme.palette.transparent.midLight} 18%, ${theme.palette.transparent.light} 33%)`,
  },
  loadingButton: {
    flexGrow: 1,
    height: '1.5em',
    margin: '1em',
  },
  loadingCardFixed: {
    minWidth: '18em',
  },
  loadingCardFloat: {
    borderRadius: '999px !important',
    display: 'inline-block',
    height: '2em',
    verticalAlign: 'middle',
    width: '2em',
  },
  loadingHeader: {
    height: '2em',
    marginBottom: '1em',
    marginTop: '.5em',
    width: '80%',
  },
  loadingNavbarLink: {
    alignItems: 'center',
    display: 'flex',
    height: '2em',
  },
  loadingNavbarLinkBackground: {
    flexGrow: 1,
    height: '1em',
    marginLeft: '2em',
    marginRight: '2.4em',
  },
  loadingParagraph: {
    height: '1em',
    marginBottom: '1em',
  },
  loadingParagraphDetail: {
    alignSelf: 'center',
    height: '1em',
    margin: 0,
    marginRight: '1em',
    width: '5em',
  },
  loadingParagraphInline: {
    display: 'inline-flex',
    width: '5em',
  },
  loadingParagraphMicroRow: {
    height: '.8em',
    marginBottom: '.4em',
    marginTop: '.4em',
  },
  loadingParagraphParent: {
    display: 'inline-block',
    marginBottom: 0,
    width: '4rem',
  },
  loadingParagraphShorter: {
    height: '1em',
    marginBottom: '1em',
    width: '70%',
  },
  loadingSelect: {
    alignItems: 'center',
    display: 'flex',
    height: 42,
    padding: '.5em',
    width: '100%',
  },
  loadingSelectParagraph: {
    marginBottom: 0,
    width: '100%',
  },
}));

const LoadingInline = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div
      className={clsx(
        loadingParagraphCID,
        classes.loadingParagraph,
        classes.loadingParagraphInline,
        classes.loadingBackground,
      )}
    />
  );
};

const LoadingParagraph = () => {
  const classes = useStyles();

  return (
    <div
      className={clsx(
        loadingParagraphCID,
        classes.loadingParagraph,
        classes.loadingBackground,
      )}
    />
  );
};

export const LoadingHidden = (): null => null;

export const LoadingNavbarLink = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.loadingNavbarLink}>
      <div
        className={clsx(
          classes.loadingBackground,
          classes.loadingNavbarLinkBackground,
          classes.loadingBackgroundInverse,
        )}
      />
    </div>
  );
};

export const LoadingButton = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div
      className={clsx(
        loadingButtonCID,
        classes.loadingButton,
        classes.loadingBackground,
      )}
    />
  );
};

export const LoadingTabbar = ({
  subject,
}: SubjectProp): JSX.Element => (
  <Tab
    icon={(
      <FontAwesome
        spin
        name="spinner"
      />
    )}
    key={subject.value}
  />
);

export const LoadingCard = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Card>
      <CardContent>
        <div
          className={clsx(
            classes.loadingHeader,
            classes.loadingBackground,
          )}
          data-testid="loading-card"
        />
        <LoadingParagraph />
        <LoadingParagraph />
        <div
          className={clsx(
            classes.loadingParagraphShorter,
            classes.loadingBackground,
          )}
        />
      </CardContent>
    </Card>
  );
};

export interface LoadingCardFixedProps {
  fill?: boolean;
}

export const LoadingCardFixed = ({ fill }: LoadingCardFixedProps): JSX.Element => {
  const classes = useStyles();

  return (
    <CardFixed
      loading
      fill={fill}
    >
      <CardContent>
        <div
          className={clsx(
            classes.loadingHeader,
            classes.loadingBackground,
            classes.loadingCardFixed,
          )}
        />
        <LoadingParagraph />
        <LoadingParagraph />
        <div
          className={clsx(
            classes.loadingParagraph,
            classes.loadingBackground,
          )}
        />
      </CardContent>
    </CardFixed>
  );
};

export const LoadingPage = (): JSX.Element => (
  <FullResourceTopology>
    <BreadcrumbsBar>
      <LoadingParent />
    </BreadcrumbsBar>
    <Container>
      <LoadingCard />
    </Container>
  </FullResourceTopology>
);

export const LoadingFullResource = (): JSX.Element => (
  <FullResourceTopology>
    <Container>
      <LoadingCard />
    </Container>
  </FullResourceTopology>
);

export const LoadingDetail = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div
      className={clsx(
        loadingParagraphCID,
        classes.loadingParagraph,
        classes.loadingParagraphDetail,
        classes.loadingBackground,
        'Detail',
      )}
    />
  );
};

export const LoadingCardFloat = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div
      className={clsx(
        classes.loadingBackground,
        classes.loadingCardFloat,
      )}
    />
  );
};

export const LoadingParent = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Breadcrumb
      label={(
        <div
          className={clsx(
            loadingParagraphCID,
            classes.loadingParagraph,
            classes.loadingParagraphParent,
            classes.loadingBackground,
          )}
        />
      )}
    />
  );
};

export const LoadingRow = (): JSX.Element => (
  <CardRow>
    <CardContent>
      <LoadingParagraph />
    </CardContent>
  </CardRow>
);

export const LoadingSelect: React.FC<{ style: any }> = ({ style }) => {
  const classes = useStyles();

  return (
    <div
      className={classes.loadingSelect}
      style={style}
    >
      <div
        className={clsx(
          loadingParagraphCID,
          classes.loadingParagraph,
          classes.loadingSelectParagraph,
          classes.loadingBackground,
        )}
      />
    </div>
  );
};

// Like a LoadingRow, but with a backdrop
export const LoadingCardRowAppendix = (): JSX.Element => (
  <CardRow backdrop>
    <CardContent>
      <LoadingParagraph />
    </CardContent>
  </CardRow>
);

export const LoadingMicroRow = (): JSX.Element => {
  const classes = useStyles();

  return (
    <CardMicroRow>
      <div
        className={clsx(
          loadingParagraphCID,
          classes.loadingParagraph,
          classes.loadingParagraphMicroRow,
          classes.loadingBackground,
        )}
      />
    </CardMicroRow>
  );
};

export const LoadingCoverPhoto = (): JSX.Element => {
  const classes = useStyles();
  const coverImageClasses = useCoverImageStyles();

  return (
    <div className={coverImageClasses.coverImageWrapper}>
      <div
        className={clsx(
          coverImageChildCID,
          classes.loadingBackground,
        )}
      />
    </div>
  );
};

// Requires a wrapper that sets a widget topology
export const LoadingGridCard = (): JSX.Element => (
  <CardFixed>
    <CardContent>
      <LoadingGridContent />
    </CardContent>
  </CardFixed>
);

export const LoadingGridContent = (): JSX.Element => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div
        className={clsx(
          classes.loadingHeader,
          classes.loadingBackground,
        )}
      />
      <LoadingParagraph />
      <LoadingParagraph />
    </React.Fragment>
  );
};

/**
 * Full page loader, same JSX/HTML as the one that shows when the app is loading
 *  @see {@link /app/spinner}
 *  @return {void}
 */
export const LoadingFiller = (): JSX.Element => (
  <div className="preloader">
    <div className="spinner">
      <div className="rect1" />
      <div className="rect2" />
      <div className="rect3" />
      <div className="rect4" />
      <div className="rect5" />
    </div>
  </div>
);

export default LoadingInline;
