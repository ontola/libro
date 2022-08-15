import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  Button,
  Grid,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';
import { NavLink } from 'react-router-dom';

import { BreakPoints, LibroTheme } from '../../../Kernel/lib/themes';
import retrievePath from '../../../Common/lib/iris';
import sales from '../../ontology/sales';
import { showcaseTopology } from '../../topologies';

const CONAINER_SPACING = 20;

const useStyles = makeStyles<LibroTheme>((theme) => ({
  button: {
    color: (props: Record<string, string>) => props.color,
    fontSize: '1.4rem',
    fontWeight: 'bold',
    marginTop: 'auto',
    textAlign: 'center',
  },
  container: {
    [theme.breakpoints.down(BreakPoints.Medium)]: {
      padding: '1rem',
    },
    backgroundColor: (props: Record<string, string>) => props.backgroundColor,
    // borderBottomLeftRadius: 0,
    borderColor: 'grey',
    borderRadius: 5,
    // borderTopLeftRadius: 0,
    color: (props: Record<string, string>) => props.color,
    marginTop: 50,
    padding: theme.spacing(CONAINER_SPACING),
  },
  icon: {
    color: (props: Record<string, string>) => props.color,
  },
  subTitle: {
    [theme.breakpoints.down(BreakPoints.Medium)]: {
      fontSize: '1.14rem',
      textAlign: 'start',
    },
    fontSize: '1.4rem',
    maxWidth: 575,
    textAlign: 'center',
  },
  title: {
    [theme.breakpoints.down(BreakPoints.Medium)]: {
      textAlign: 'start',
    },
    fontWeight: 'bold',
    textAlign: 'center',
  },
}));

const BlockShowcase: FC = () => {
  const [buttonLink] = useProperty(sales.buttonLink);
  const [buttonText] = useProperty(sales.buttonText);
  const [name] = useProperty(schema.name);
  const [text] = useProperty(schema.text);
  const [color] = useProperty(schema.color);
  const [textColor] = useProperty(sales.textColor);
  const classes = useStyles({
    backgroundColor: color.value,
    color: textColor.value,
  });

  return (
    <Grid
      container
      alignItems="center"
      className={classes.container}
      direction="column"
      md={6}
    >
      {name && (
        <Typography
          className={classes.title}
          variant="h2"
        >
          {name.value}
        </Typography>
      )}
      <Typography
        className={classes.subTitle}
        variant="body2"
      >
        {text.value}
      </Typography>
      <Button
        classes={{
          iconSizeLarge: classes.icon,
          root: classes.button,
        }}
        component={NavLink as React.ElementType}
        endIcon={(
          <ChevronRightIcon />
        )}
        size="large"
        to={retrievePath(buttonLink.value)}
      >
        {buttonText.value}
      </Button>
    </Grid>
  );
};

BlockShowcase.type = sales.Block;

BlockShowcase.topology = showcaseTopology;

export default register(BlockShowcase);
