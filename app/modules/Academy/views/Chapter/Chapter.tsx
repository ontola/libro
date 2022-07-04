import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import { LibroTheme } from '../../../Kernel/lib/themes';
import { allTopologiesExcept } from '../../../../topologies';
import argu from '../../../Argu/ontology/argu';
import { pageTopology } from '../../../Common/topologies/Page';
import { sideBarTopology } from '../../../Common/topologies/SideBar';
import { ChapterContent } from '../../topologies/ChapterContent';

const H1_BOTTOM_MARGIN = 5;

const useStyles = makeStyles<LibroTheme>((theme) => ({
  h1: {
    fontSize: '2.2rem',
    fontWeight: theme.typography.fontWeightBold,
    marginBottom: theme.spacing(H1_BOTTOM_MARGIN),
  },
  wrapper: {
    '& img, & video': {
      marginBlock: '.5rem',
      maxWidth: '90%',
    },
  },
}));

const Chapter: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Typography
        classes={{ h1: classes.h1 }}
        variant="h1"
      >
        <Property label={schema.title} />
      </Typography>
      <ChapterContent>
        <Property label={argu.ns('chapterContent')} />
      </ChapterContent>
    </div>
  );
};

Chapter.type = argu.Chapter;
Chapter.topology = allTopologiesExcept(sideBarTopology, pageTopology);

export default register(Chapter);
