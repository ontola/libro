import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import Grid from '@material-ui/core/Grid';

import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import { FC, useProperty } from 'link-redux';
import React from 'react';

import argu from '../../../ontology/argu';
import { showcaseTopology } from '../../../topologies/Showcase';
import { SalesTheme, withSalesTheme } from '../SalesThemeProvider';

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
        borderColor: 'grey',
        borderRadius: 5,
        flex: 'column',
        margin: 10,
        marginTop: 50,
        padding: '0 30px',
        textTransform: 'none',
        width: '30%',
    },
    typography: {
        fontWeight: 'bold',
    },
});

const CaseShowcase: FC = () => {
    const classes = useStyles();
    const [name] = useProperty(schema.name);
    const [tagline] = useProperty(argu.ns('tagline'));

    return (
        <Button
            className={classes.productButton}
        >
            <Grid
                container
                alignItems="center"
                direction="column"
            >
                <Typography className={classes.typography} variant="h6">{name.value}</Typography>
                <Typography variant="h6">{tagline.value}</Typography>
                <ArrowRightAltIcon style={{ fontSize: 60, color: '#2D7080' }}/>
            </Grid>
        </Button>
    );
};

CaseShowcase.type = argu.ns('CasePage');

CaseShowcase.topology = showcaseTopology;

CaseShowcase.hocs = [withSalesTheme];

export default CaseShowcase;
