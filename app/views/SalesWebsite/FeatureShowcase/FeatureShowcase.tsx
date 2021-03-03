
import { FC, Property } from 'link-redux';
import React from 'react';

import argu from '../../../ontology/argu';
import { containerTopology } from '../../../topologies/Container';
import Showcase from '../../../topologies/Showcase';
import { withSalesTheme } from '../SalesThemeProvider';

const FeatureShowcase: FC = () => {
    return (
        <Showcase>
            <Property label={argu.ns('features')} />
            <Property label={argu.ns('solutions')} />
        </Showcase>
    );
};

FeatureShowcase.type = argu.ns('Features');

FeatureShowcase.topology = containerTopology;

FeatureShowcase.hocs = [withSalesTheme];

export default FeatureShowcase;
