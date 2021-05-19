import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';
import * as schema from '@ontologies/schema';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

import argu from '../../../ontology/argu';
import { allTopologiesExcept } from '../../../topologies';
import { sideBarTopology } from '../../../topologies/SideBar';
import { LibroTheme } from '../../../themes/themes';
import { pageTopology } from '../../../topologies/Page';

const ARTICLE_PADDING = 5;

const useOverrideStyles = makeStyles<LibroTheme>((theme) => ({
  h1: {
    fontSize: '2.2rem',
    fontWeight: theme.typography.fontWeightBold,
  },
}));

const useStyles = makeStyles<LibroTheme>((theme) => ({
  article: {
    margin: 'auto',
    marginTop: '3.5rem',
    padding: theme.spacing(ARTICLE_PADDING),
    width: 'min(100%, 900px)',
  },
}));

const Chapter: FC = () => {
  const overrideStyles = useOverrideStyles();
  const classNames = useStyles();

  return (
    <article className={classNames.article}>
      <Typography classes={overrideStyles} variant="h1">
        <Property label={schema.title} />
      </Typography>
      <Property label={argu.ns('chapterContent')} />
    </article>
  );
};

Chapter.type = argu.Chapter;
Chapter.topology = allTopologiesExcept(sideBarTopology, pageTopology);

export default register(Chapter);
