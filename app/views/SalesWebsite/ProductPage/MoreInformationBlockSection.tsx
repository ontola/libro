import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeStyles } from '@material-ui/styles';
import { FC, useProperty } from 'link-redux';
import * as schema from '@ontologies/schema';
import React from 'react';
import { NavLink } from 'react-router-dom';

import sales from '../../../ontology/sales';
import { SalesTheme } from '../../../themes/salesWebsite/SalesThemeProvider';
import { allTopologies } from '../../../topologies';
import retrievePath from '../../../helpers/iris';

const useStyles = makeStyles<SalesTheme>((theme) => ({
  button: {
    fontSize: 24,
    fontWeight: 'bold',
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
      <Button
        className={classes.button}
        component={NavLink as React.ElementType}
        endIcon={(
          <ChevronRightIcon
            className={classes.icon}
            style={{ fontSize: 40 }}
          />
        )}
        to={retrievePath(buttonLink.value)}
      >
        {buttonText.value}
      </Button>
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
