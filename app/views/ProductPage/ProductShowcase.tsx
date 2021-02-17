import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import Grid from '@material-ui/core/Grid';

import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import { FC, useProperty } from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import { showcaseTopology } from '../../topologies/Showcase';
import { SalesTheme, withSalesTheme } from '../LandingPage/SalesThemeProvider';

const useStyles = makeStyles<SalesTheme>({
    buttonPrimary: {
        backgroundColor: '#B33A00',
        borderRadius: 3,
        color: 'white',
        height: 48,
        padding: '0 30px',
    },
    margin: {
        marginTop: 100,
    },
    productButton: {
        backgroundColor: '#FFFFFF',
        border: 3,
        borderColor: 'grey',
        borderRadius: 5,
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, 0.15)',
        color: 'black',
        flex: 'column',
        height: 170,
        margin: 10,
        marginTop: 140,
        padding: '0 30px',
        textTransform: 'none',
        width: 250,
    },
    typography: {
        fontWeight: 'bold',
    },
});

const ProductShowcase: FC = () => {
    const classes = useStyles();
    const [text] = useProperty(schema.name);
    const [title] = useProperty(schema.title);

    return (
            <Button
                className={classes.productButton}
            >
                <Grid
                    container
                    alignItems="center"
                    direction="column"
                >
                    <Typography className={classes.typography} variant="h6">{title.value}</Typography>
                    <Typography variant="h6">{text.value}</Typography>
                    <ArrowRightAltIcon style={{ fontSize: 60, color: '#2D7080' }}/>
                </Grid>
            </Button>
    );
};

ProductShowcase.type = argu.ns('ProductPage');

ProductShowcase.topology = showcaseTopology;

ProductShowcase.hocs = [withSalesTheme];

export default ProductShowcase;
