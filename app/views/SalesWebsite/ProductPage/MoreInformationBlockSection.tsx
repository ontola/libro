import Typography from '@material-ui/core/Typography';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import { FC, useProperty } from 'link-redux';
import React from 'react';
import { NavLink } from 'react-router-dom';

import retrievePath from '../../../helpers/iris';
import sales from '../../../ontology/sales';
import { SalesTheme } from '../../../themes/salesWebsite/SalesThemeProvider';
import { allTopologies } from '../../../topologies';

const useStyles = makeStyles<SalesTheme>((theme) => ({
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
    [theme.breakpoints.down('sm')]: {
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
