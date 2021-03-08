import { Theme, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import Grid from '@material-ui/core/Grid';

import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import { FC, useProperty } from 'link-redux';
import React from 'react';

import argu from '../../../ontology/argu';
import { showcaseTopology } from '../../../topologies/Showcase';
import { withSalesTheme } from '../SalesThemeProvider';

const useStyles = makeStyles<Theme>((theme) => ({
    productButton: {
        padding: '1rem',
        textAlign: 'left',
        alignItems: 'start',
        textTransform: 'none',
        width: '50%',
        flex: 1,
        '&:first-child': {
            paddingLeft: '2rem',
        },
        '&:last-child': {
            paddingRight: '2rem',
        },
        [theme.breakpoints.down('md')]: {
            width: '25%',
        },
    },
    typography: {
        fontWeight: 'bold',
    },
    arrow: {
        justifySelf: 'flex-end',
    },
}));

const ProductShowcase: FC = () => {
    const classes = useStyles();
    const [tagline] = useProperty(argu.ns('tagline'));
    const [name] = useProperty(schema.name);

    return (
        <Button
            className={classes.productButton}
        >
            <Grid
                container
                alignItems="flex-start"
                direction="column"
            >
                <Typography className={classes.typography} variant="h6">{name.value}</Typography>
                <Typography variant="subtitle1">{tagline.value}</Typography>
                <ArrowRightAltIcon color="primary" style={{ fontSize: 60 }} className={classes.arrow} />
            </Grid>
        </Button>
    );
};

ProductShowcase.type = argu.ns('ProductPage');

ProductShowcase.topology = showcaseTopology;

ProductShowcase.hocs = [withSalesTheme];

export default ProductShowcase;
