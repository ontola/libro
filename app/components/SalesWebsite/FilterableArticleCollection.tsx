import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import { NamedNode, SomeTerm } from '@ontologies/core';
import { SomeNode } from 'link-lib';
import React from 'react';

import { useSalesArticles } from '../../hooks/useSalesArticles';
import { SalesTheme } from '../../themes/salesWebsite/SalesThemeProvider';

import { ArticleThemeSwitcher } from './ArticleThemeSwitcher';

export interface FilterableArticleCollectionProps {
  articlePropertyPath: NamedNode[];
  fadeWrapper?: React.ElementType;
  renderArticles: (articles: SomeTerm[]) => JSX.Element;
  subject: SomeNode;
}

const THEME_SWICHER_BOTTOM_MARGIN = 20;

const useStyles = makeStyles<SalesTheme>((theme) => ({
  themeSwitcher: {
    marginBottom: theme.spacing(THEME_SWICHER_BOTTOM_MARGIN),
  },
}));

export const FilterableArticleCollection = ({
  articlePropertyPath,
  fadeWrapper,
  renderArticles,
  subject,
}: FilterableArticleCollectionProps): JSX.Element => {
  const classes = useStyles();

  const {
    articles,
    filter,
    setFilter,
    themes,
    visible,
  } = useSalesArticles(subject, articlePropertyPath);

  const FadeWrapper = fadeWrapper ?? React.Fragment;

  return (
    <React.Fragment>
      <div className={classes.themeSwitcher}>
        <ArticleThemeSwitcher
          currentTheme={filter}
          themes={themes}
          onThemeSwitch={setFilter}
        />
      </div>
      <FadeWrapper>
        <Fade
          in={visible}
          timeout={{
            enter: 200,
            exit: 0,
          }}
        >
          {renderArticles(articles)}
        </Fade>
      </FadeWrapper>
    </React.Fragment>
  );
};
