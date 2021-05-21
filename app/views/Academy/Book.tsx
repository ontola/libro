import {
  FC,
  Property,
  Resource,
  register,
  useLRS,
  useProperty,
  useResourceProperty,
} from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { SomeTerm } from '@ontologies/core';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import FontAwesome from 'react-fontawesome';
import { SomeNode } from 'link-lib';

import argu from '../../ontology/argu';
import { fullResourceTopology } from '../../topologies/FullResource';
import SideBar from '../../topologies/SideBar';
import { LibroTheme } from '../../themes/themes';
import { useChapterNavigation } from '../../hooks/Academy/useChapterNavigation';
import { academyMessages } from '../../translations/messages';

const SIDEBAR_CHILDREN_PADDING = 4;
const NAME_WRAPPER_PADDING_VERTICAL = 6;
const BUTTON_NAV_PADDING = 10;
const BUTTON_NAV_GAP = 4;

export interface BookProps {
  chapter?: SomeTerm;
}

interface StyleProps {
  headerImage: string;
}

const useStyles = makeStyles<LibroTheme, StyleProps>((theme) => ({
  article: {
    backgroundImage: ({ headerImage }) => `url(${headerImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    gridArea: 'article',
  },
  button: {
    flexShrink: 1,
  },
  buttonNav: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    gridArea: 'button-nav',
    justifyContent: 'space-between',
    padding: theme.spacing(BUTTON_NAV_PADDING),
  },
  buttonNavIcon: {
    color: theme.palette.primary.main,
    fontSize: '2rem',
  },
  devider: {
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  downloadIcon: {
    color: theme.palette.text.secondary,
    fontSize: '1.2rem !important',
  },
  downloadLink: {
    '&:hover': {
      textDecoration: 'underline',
    },

    alignItems: 'center',
    display: 'flex',
    fontSize: '1rem',
    fontWeight: theme.typography.fontWeightMedium,
    gap: '1rem',
    justifyContent: 'center',
    padding: theme.spacing(SIDEBAR_CHILDREN_PADDING),
    width: '100%',
  },
  grid: {
    display: 'grid',
    gridTemplateAreas: '"sidebar article" "sidebar button-nav"',
    gridTemplateColumns: 'minmax(25ch, auto) minmax(75%, 1fr)',
    gridTemplateRows: 'minmax(70vh, auto) auto',
    [theme.breakpoints.down('md')]: {
      gridTemplateAreas: '"article" "button-nav" "sidebar"',
      gridTemplateColumns: '1fr',
    },
  },
  nameWrapper: {
    fontSize: '1.4rem',
    fontWeight: theme.typography.fontWeightBold,
    padding: theme.spacing(SIDEBAR_CHILDREN_PADDING),
    paddingBottom: theme.spacing(NAME_WRAPPER_PADDING_VERTICAL),
    paddingTop: theme.spacing(NAME_WRAPPER_PADDING_VERTICAL),
  },
  progressBar: {
    borderRadius: theme.shape.borderRadius,
    flexGrow: 1,
    height: '10px',
  },
  progressBarWrapper: {
    alignItems: 'center',
    display: 'inline-flex',
    flexDirection: 'row',
    gap: theme.spacing(BUTTON_NAV_GAP),
    width: '100%',
  },
  sideBar: {
    backgroundColor: '#FBFBFB',
    gridArea: 'sidebar',
  },
  sideBarList: {
    padding: theme.spacing(SIDEBAR_CHILDREN_PADDING),
  },
}));

const useProgressBarOverrideStyles = makeStyles<LibroTheme>((theme) => ({
  bar: {
    borderRadius: theme.shape.borderRadius,
  },
}));

const Book: FC<BookProps> = ({ subject, chapter }) => {
  const lrs = useLRS();
  const progressBarOverrideStyles = useProgressBarOverrideStyles();
  const [chapters] = useProperty(argu.chapters) as SomeNode[];
  const [headerImage] = useProperty(schema.image);
  const [pdfURL] = useProperty(schema.contentUrl);

  const classNames = useStyles({ headerImage: headerImage.value });
  const members = useResourceProperty(chapters, rdfs.member);

  const {
    prevChapter,
    nextChapter,
    progress,
    completeChapter,
    completedChapters,
    currentChapter,
    navigate,
  } = useChapterNavigation(subject, chapter);

  React.useEffect(() => {
    lrs.actions.search.setTarget(subject);
  }, [subject]);

  const handleOnChapterChange = (clickedSubject: SomeTerm) => {
    completeChapter(currentChapter!);
    navigate(clickedSubject);
  };

  const onNextClick = () => {
    completeChapter(currentChapter!);
    navigate(nextChapter!);
  };

  const onPrevClick = () => {
    navigate(prevChapter!);
  };

  return (
    <React.Fragment>
      <Grid container className={classNames.grid} spacing={0}>
        <Grid item className={classNames.sideBar}>
          <SideBar>
            <div className={classNames.nameWrapper}>
              <Property label={schema.title} />
            </div>
            <div className={classNames.devider} />
            <ol className={classNames.sideBarList}>
              {chapters && members.map((member) => (
                <li key={member.value}>
                  <Resource
                    topLevel
                    completedChapters={completedChapters}
                    currentChapter={currentChapter}
                    subject={member}
                    onChapterChange={handleOnChapterChange}
                  />
                </li>
              ))}
            </ol>
            {pdfURL?.value && (
              <React.Fragment>
                <div className={classNames.devider} />
                <a
                  download
                  className={classNames.downloadLink}
                  href={pdfURL.value}
                >
                  <FontAwesome className={classNames.downloadIcon} name="download" />
                  <FormattedMessage {...academyMessages.pdfDownload} />
                </a>
              </React.Fragment>
            )}

          </SideBar>
        </Grid>
        <Grid item className={classNames.article}>
          {currentChapter && <Resource subject={currentChapter} />}
        </Grid>
        <Grid item className={classNames.buttonNav}>
          {prevChapter ? (
            <Button
              className={classNames.button}
              size="large"
              startIcon={(
                <FontAwesome className={classNames.buttonNavIcon} name="arrow-circle-left" size="2x" />
              )}
              onClick={onPrevClick}
            >
              <Resource subject={prevChapter}>
                <Property label={schema.title} />
              </Resource>
            </Button>
          ) : <span>{' '}</span>}
          {nextChapter ? (
            <Button
              className={classNames.button}
              endIcon={(
                <FontAwesome className={classNames.buttonNavIcon} name="arrow-circle-right" />
              )}
              size="large"
              onClick={onNextClick}
            >
              <Resource subject={nextChapter}>
                <Property label={schema.title} />
              </Resource>
            </Button>
          ) : <span>{' '}</span>}
          <span className={classNames.progressBarWrapper}>
            <span>
              {`${Math.round(progress)}%`}
            </span>
            <LinearProgress
              className={classNames.progressBar}
              classes={progressBarOverrideStyles}
              value={progress}
              variant="determinate"
            />
          </span>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Book.type = argu.Book;

Book.topology = fullResourceTopology;

export default register(Book);
