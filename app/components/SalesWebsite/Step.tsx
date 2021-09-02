import { Grid, Typography } from '@material-ui/core';
import { lighten, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';

import { SalesTheme } from '../../themes/salesWebsite/SalesThemeProvider';
import Link from '../Link';

interface StepProps {
  name: string;
  text: string;
  first?: boolean;
  last?: boolean;
  href?: string;
  trackingId?: string;
}

const TEXT_GRID_GAP = 5;
const HOVER_LIGHTEN_AMOUNT = 0.95;

const useStyles = makeStyles<SalesTheme, StepProps>((theme: SalesTheme) => ({
  circleSmall: {
    border: '3px solid #2D7080',
    borderRadius: '50%',
    borderStyle: 'solid',
    gridArea: 'circle',
    height: '100%',
    justifySelf: 'center',
    width: '100%',
    zIndex: 1,
  },
  containerGrid: {
    '--circle-size': '80px',
    display: 'grid',
    gridTemplateAreas: '"line-top box" "circle box" "line-bottom box"',
    gridTemplateColumns: 'var(--circle-size) auto',
    gridTemplateRows: '1fr var(--circle-size) 1fr',
    [theme.breakpoints.down('sm')]: {
      '--circle-size': '50px',
    },
  },
  containerGridLink: {
    '&:hover $textGrid': {
      backgroundColor: lighten(theme.palette.secondary.main, HOVER_LIGHTEN_AMOUNT),
    },
    '&:hover $title': {
      textDecoration: 'underline',
    },
  },
  indent: {
    backgroundColor: theme.palette.background.default,
    borderRadius: '50%',
    gridArea: 'indent',
    height: 'var(--circle-size)',
    marginLeft: 'calc((var(--circle-size) / 2) * -1)',
    position: 'relative',
    width: 'var(--circle-size)',
  },
  line: {
    backgroundColor: '#2D7080',
    justifySelf: 'center',
    width: '3px',
  },
  lineBottom: {
    gridArea: 'line-bottom',
    visibility: (props) => props.last ? 'hidden' : 'visible',
  },
  lineTop: {
    gridArea: 'line-top',
    visibility: (props) => props.first ? 'hidden' : 'visible',
  },
  subtitle: {
    fontSize: '1.125rem',
    lineHeight: '1.7rem',
    marginBottom: 24,
  },
  textContainer: {
    gridArea: 'text',
    maxWidth: 570,
  },
  textGrid: {
    backgroundColor: '#F8FBFF',
    borderRadius: theme.shape.borderRadius,
    display: 'grid',
    gap: theme.spacing(TEXT_GRID_GAP),
    gridTemplateAreas: '". text" "indent text" ". text"',
    gridTemplateColumns: 'calc(var(--circle-size) / 2) auto',
    height: '100%',
    padding: '1rem',
    paddingLeft: 0,
    transition: 'background-color 100ms',
  },
  textWrapper: {
    gridArea: 'box',
    padding: '1rem',
    paddingLeft: 0,
  },
  title: {
    fontSize: '1.1667rem',
    fontWeight: 'bold',
    marginBottom: '14px',
    paddingTop: 12,
  },
}));

const Step = (props: StepProps): JSX.Element => {
  const { href, trackingId } = props;
  const hasHref = href !== undefined;

  const classes = useStyles(props);

  const containerGridClassName = clsx({
    [classes.containerGrid]: true,
    [classes.containerGridLink]: hasHref,
  });

  const TextWrapper = hasHref ? Link : React.Fragment;
  const textWrapperProps = hasHref ? {
    allowExternal: false,
    id: trackingId,
    to: href!,
  } : {} as never;

  return (
    <TextWrapper {...textWrapperProps}>
      <Grid
        container
        className={containerGridClassName}
        direction="row"
      >
        <div className={`${classes.line} ${classes.lineTop}`} />
        <div className={classes.circleSmall} />
        <div className={`${classes.line} ${classes.lineBottom}`} />
        <div className={classes.textWrapper}>
          <div className={classes.textGrid}>
            <div className={classes.indent} />
            <div className={classes.textContainer}>
              <Typography
                className={classes.title}
                variant="body1"
              >
                {props.name}
              </Typography>
              <Typography
                className={classes.subtitle}
                variant="body1"
              >
                {props.text}
              </Typography>
            </div>
          </div>
        </div>
      </Grid>
    </TextWrapper>
  );
};

Step.defaultProps = {
  first: false,
  last: false,
};

export default Step;
