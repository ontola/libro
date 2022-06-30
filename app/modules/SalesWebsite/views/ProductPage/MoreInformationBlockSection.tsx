import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import * as schema from '@ontologies/schema';
import { FC, useProperty } from 'link-redux';
import React from 'react';
import { NavLink } from 'react-router-dom';

import { BreakPoints, LibroTheme } from '../../../../themes/themes';
import { allTopologies } from '../../../../topologies';
import retrievePath from '../../../Common/lib/iris';
import sales from '../../ontology/sales';

const useStyles = makeStyles<LibroTheme>((theme) => ({
  button: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  link: {
    '&:hover': {
      color: theme.palette.primary.main,
    },
    alignItems: 'center',
    display: 'flex',
    fontSize: '1.6rem',
    fontWeight: theme.typography.fontWeightMedium,
  },
  subtitle: {
    textAlign: 'right',
    [theme.breakpoints.down(BreakPoints.Medium)]: {
      textAlign: 'left',
    },
  },
}));

const MoreInformationBlockSection: FC = () => {
  const classes = useStyles();
  const [buttonText] = useProperty(sales.buttonText);
  const [buttonLink] = useProperty(sales.buttonLink);
  const [text] = useProperty(schema.text);

  return (
    <React.Fragment>
      <span className={classes.link}>
        <NavLink
          to={retrievePath(buttonLink.value) ?? ''}
        >
          {buttonText.value}
        </NavLink>
        <ChevronRightIcon
          className={classes.icon}
          style={{ fontSize: 40 }}
        />
      </span>
      <Typography
        className={classes.subtitle}
        variant="body1"
      >
        {text.value}
      </Typography>
    </React.Fragment>
  );
};

MoreInformationBlockSection.type = sales.MoreInformationBlockSection;
MoreInformationBlockSection.topology = allTopologies;

export default MoreInformationBlockSection;
