import { ThemeOptions } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import { FC, Property, useProperty } from 'link-redux';
import React from 'react';
// import Image from '../../components/Image';

import argu from '../../ontology/argu';
import Container from '../../topologies/Container';
import { fullResourceTopology } from '../../topologies/FullResource';
import Showcase from '../../topologies/Showcase';
import Header from './Header';
import { withSalesTheme } from './SalesThemeProvider';

const useStyles = makeStyles<Theme>(theme => ({
    buttonPrimary: {
        backgroundColor: '#B33A00',
        borderRadius: 3,
        color: 'white',
        height: 48,
        margin: 20,
        padding: 20,
    },
    gridStyle: {
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
    propositionSelector: {
        boxShadow: '0 0 25px rgba(0,0,0,0.2)',
        margin: 'auto',
        borderRadius: '5px',
        display: 'flex',
        overflow: 'hidden',
        marginBottom: '4rem',
    },
    paperContainer: {
        alignItems: 'center',
        justifyContent: 'center',
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
    subtitle: {
        textAlign: 'center',
        width: 643,
    },
    wrapper: {
        // This should be removed if Page no longer sets a margin
        marginTop: '-1rem',
        backgroundColor: theme.palette.background.default,
    },
}));

const LandingPageFull: FC = () => {
    const classes = useStyles();
    // const [source] = useProperty(schema.image);
    const [title] = useProperty(schema.name);
    const [text] = useProperty(schema.text);
    const [demoText] = useProperty(argu.ns('demoText'));

    return (
        <div className={classes.wrapper}>
            <Header title={title.value} subtitle={text.value} imageUrl="/static/images/header_image.svg" />
            <Grid
                container
                alignItems="center"
                direction="column"
                className={classes.gridStyle}
            >
                <Container>
                    <Showcase>
                        <div className={classes.propositionSelector}>
                            <Property label={argu.ns('showcase')} />
                        </div>
                    </Showcase>
                </Container>
                <Property label={argu.ns('cases')} />
                <Container>
                    <Property label={argu.ns('features')} />
                </Container>
                <Container>
                    <Property label={argu.ns('blogs')} />
                </Container>
            </Grid>
        </div>
    );
};

LandingPageFull.type = argu.ns('LandingPage');

LandingPageFull.topology = fullResourceTopology;

LandingPageFull.hocs = [withSalesTheme];

export default LandingPageFull;
