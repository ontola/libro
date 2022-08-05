import {
  Button,
  Grid,
  LinearProgress,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { NamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import clsx from 'clsx';
import { SomeNode } from 'link-lib';
import {
  FC,
  Property,
  Resource,
  array,
  register,
  useFields,
  useIds,
  useLRS,
} from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { FormattedMessage, useIntl } from 'react-intl';
import { NavLink } from 'react-router-dom';

import { SetSearchTarget } from '../../../middleware/actions';
import { BreakPoints, LibroTheme } from '../../Kernel/lib/themes';
import { academyMessages } from '../../../translations/messages';
import argu from '../../Argu/ontology/argu';
import retrievePath from '../../Common/lib/iris';
import { fullResourceTopology } from '../../Common/topologies/FullResource';
import SideBar from '../../Common/topologies/SideBar';
import { useChapterNavigation } from '../hooks/useChapterNavigation';

export interface BookProps {
  chapter?: SomeNode;
}

interface StyleProps {
  headerImage: string;
}

const SIDEBAR_CHILDREN_PADDING = 4;
const NAME_WRAPPER_PADDING_VERTICAL = 6;
const BUTTON_NAV_PADDING = 10;
const BUTTON_NAV_GAP = 4;
const ARTICLE_PADDING = 5;
const ARTICEL_PADDING_BIG = 15;

const useStyles = makeStyles<LibroTheme, StyleProps>((theme) => ({
  article: {
    [theme.breakpoints.up(BreakPoints.Medium)]: {
      padding: theme.spacing(ARTICEL_PADDING_BIG),
    },
    margin: 'auto',
    marginTop: '3.5rem',
    padding: theme.spacing(ARTICLE_PADDING),
    width: 'min(100%, 900px)',
  },
  articleWrapper: {
    backgroundImage: ({ headerImage }) => `url(${headerImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    gridArea: 'article',
  },
  button: {
    [theme.breakpoints.down(BreakPoints.Medium)]: {
      flexGrow: 1,
    },
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
    padding: theme.spacing(SIDEBAR_CHILDREN_PADDING),
    width: '100%',
  },
  grid: {
    display: 'grid',
    gridTemplateAreas: '"sidebar article" "sidebar button-nav"',
    gridTemplateColumns: 'minmax(25ch, auto) minmax(75%, 1fr)',
    gridTemplateRows: 'minmax(70vh, auto) 200px',
    [theme.breakpoints.down(BreakPoints.Large)]: {
      gridTemplateAreas: '"article" "button-nav" "sidebar"',
      gridTemplateColumns: '1fr',
    },
  },
  linkActive: {
    color: theme.palette.primary.main,
  },
  nameWrapper: {
    '&:hover': {
      color: theme.palette.primary.main,
    },

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
  const intl = useIntl();
  const progressBarOverrideStyles = useProgressBarOverrideStyles();
  const members = useIds(array(argu.chapters));
  const [headerImage] = useFields(schema.image);
  const [pdfURL] = useFields(schema.contentUrl);
  const [coverText] = useFields(schema.text);
  const classNames = useStyles({ headerImage: headerImage.value });

  const {
    prevChapter,
    nextChapter,
    progress,
    completeChapter,
    completedChapters,
    currentChapter,
    navigate,
  } = useChapterNavigation(subject, chapter);

  const nameWrapperClass = clsx({
    [classNames.nameWrapper]: true,
    [classNames.linkActive]: !chapter,
  });

  const pageText = chapter ? currentChapter : coverText;

  React.useEffect(() => {
    lrs.actions.get(SetSearchTarget)(subject);
  }, [subject]);

  const handleOnChapterChange = (clickedSubject: NamedNode) => {
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
      <Grid
        container
        className={classNames.grid}
        spacing={0}
      >
        <Grid
          item
          className={classNames.sideBar}
        >
          <SideBar>
            <div className={nameWrapperClass}>
              <NavLink to={retrievePath(subject as NamedNode)!}>
                <Property label={schema.title} />
              </NavLink>
            </div>
            <div className={classNames.devider} />
            <ol className={classNames.sideBarList}>
              {members.map((member) => (
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
                  id="academy-download-link"
                >
                  <FontAwesome
                    className={classNames.downloadIcon}
                    name="download"
                  />
                  <FormattedMessage {...academyMessages.pdfDownload} />
                </a>
              </React.Fragment>
            )}

          </SideBar>
        </Grid>
        <Grid
          item
          className={classNames.articleWrapper}
        >
          <article
            className={classNames.article}
            role="main"
          >
            <Resource subject={pageText} />
          </article>
        </Grid>
        <Grid
          item
          aria-label={intl.formatMessage(academyMessages.chapterNavigationAriaLabel)}
          className={classNames.buttonNav}
          component="nav"
          role="navigation"
        >
          {prevChapter ? (
            <Button
              className={classNames.button}
              size="large"
              startIcon={(
                <FontAwesome
                  className={classNames.buttonNavIcon}
                  name="arrow-circle-left"
                  size="2x"
                />
              )}
              onClick={onPrevClick}
            >
              <Resource subject={prevChapter}>
                <Property label={schema.title} />
              </Resource>
            </Button>
          ) : (
            <span>
              {' '}
            </span>
          )}
          {nextChapter ? (
            <Button
              className={classNames.button}
              endIcon={(
                <FontAwesome
                  className={classNames.buttonNavIcon}
                  name="arrow-circle-right"
                />
              )}
              size="large"
              onClick={onNextClick}
            >
              <Resource subject={nextChapter}>
                <Property label={schema.title} />
              </Resource>
            </Button>
          ) : (
            <span>
              {' '}
            </span>
          )}
          <span className={classNames.progressBarWrapper}>
            <span>
              {`${Math.round(progress)}%`}
            </span>
            <LinearProgress
              aria-label={intl.formatMessage(academyMessages.progressBarAriaLabel)}
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
