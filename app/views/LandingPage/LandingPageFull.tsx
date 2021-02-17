import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import Grid from '@material-ui/core/Grid';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import { FC, Property, useProperty } from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import { fullResourceTopology } from '../../topologies/FullResource';
import Showcase from '../../topologies/Showcase';
import { SalesTheme, withSalesTheme } from './SalesThemeProvider';

const useStyles = makeStyles<SalesTheme>({
    buttonPrimary: {
        backgroundColor: '#B33A00',
        borderRadius: 3,
        color: 'white',
        height: 48,
        padding: '0 30px',
    },
    gridStyle: {
        backgroundColor: 'white',
        marginBottom: 20,
        marginTop: 20,
        paddingBottom: 20,
        paddingTop: 20,
    },
    header: {
        alignItems: 'flex-end',
        backgroundColor: 'red',
        justifyContent: 'flex-end',
    },
    headerTitle: {
        fontSize: '3rem',
    },
    productPageTile: {
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        color: 'black',
        height: 170,
        margin: 10,
        padding: '0 30px',
        width: 250,
    },
});

const LandingPageFull: FC = () => {
    const classes = useStyles();
    const [title] = useProperty(schema.name);
    const [text] = useProperty(schema.text);
    const [demoText] = useProperty(argu.ns('demoText'));

    return (
        <div>
            <Grid
                container
                alignItems="center"
                direction="column"
                className={classes.gridStyle}
            >
                <Typography variant="h1">{title.value}</Typography>
                <Typography variant="body1">{text.value}</Typography>
                <Button
                    className={classes.buttonPrimary}
                    endIcon={<ArrowRightAltIcon style={{ fontSize: 50 }}/>}
                >
                    {demoText.value}
                </Button>
                <Showcase>
                    <Property label={argu.ns('showcase')} />
                </Showcase>
            </Grid>
        </div>
    );
};

LandingPageFull.type = argu.ns('LandingPage');

LandingPageFull.topology = fullResourceTopology;

LandingPageFull.hocs = [withSalesTheme];

export default LandingPageFull;
