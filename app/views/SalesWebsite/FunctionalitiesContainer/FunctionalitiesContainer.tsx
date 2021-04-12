import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import Grid from '@material-ui/core/Grid';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  useProperty,
} from 'link-redux';
import React from 'react';

import Image from '../../../components/Image';
import argu from '../../../ontology/argu';
import { containerTopology } from '../../../topologies/Container';
import Showcase from '../../../topologies/Showcase';
import Parallax from '../Parallax/Parallax';
import { SalesTheme } from '../SalesThemeProvider';

const useStyles = makeStyles<SalesTheme>((theme) => ({
  '@keyframes myEffect': {
    '0%': {
      transform: 'translateX(-100%)',
    },
    '50%': {
      transform: 'translateX(0)',
    },
    '100%': {
      transform: 'translateX(-100%)',
    },
  },
  button: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 30,
    textTransform: 'none',
  },
  container: {
    flex: 1,
    margin: 'auto',
  },
  iconStyle: {
    color: '#2D7080',
    fontSize: 60,
  },
  image: {
    [theme.breakpoints.down('md')]: {
      animation: `$myEffect 10s ${theme.transitions.easing.easeInOut} infinite`,
      backgroundSize: 'fill',
      maxWidth: '100%',
    },
    [theme.breakpoints.up('md')]: {
      backgroundSize: 'percentage',
      maxWidth: '100%',
    },
  },
  imageContainer: {
    marginBottom: 85,
  },
  propositionSelector: {
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
    },
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
    },
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
  },
  subTitle: {
    margin: 'auto',
    marginBottom: '3rem',
    maxWidth: 519,
    textAlign: 'center',
  },
}));

const FunctionalitiesContainer: FC = () => {
  const classes = useStyles();
  const [image] = useProperty(schema.image);
  const [backgroundImageMobile] = useProperty(argu.ns('backgroundImageMobile'));
  const [name] = useProperty(schema.name);
  const [text] = useProperty(schema.text);
  const [buttonText] = useProperty(argu.ns('buttonText'));
  // let renderedImage;
  //
  // if (image !== undefined) {
  //   renderedImage = (
  //     <div className={classes.imageContainer}>
  //       <Image
  //         className={classes.image}
  //         linkedProp={image}
  //       />
  //     </div>
  //   );
  // } else {
  //   renderedImage = (
  //     <div />
  //   );
  // }

  return (
    <Parallax
      backgroundImageUrl={image.value}
      backgroundImageUrlMobile={backgroundImageMobile.value}
      buttonText={buttonText.value}
      subtitle={text.value}
      title={name.value}
    />);
};

FunctionalitiesContainer.type = argu.ns('FunctionalitiesContainer');

FunctionalitiesContainer.topology = containerTopology;

export default FunctionalitiesContainer;
