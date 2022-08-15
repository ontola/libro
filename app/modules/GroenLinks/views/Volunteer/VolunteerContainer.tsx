import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import CardContent from '../../../Common/components/Card/CardContent';
import { containerTopology } from '../../../Common/topologies';
import Card from '../../../Common/topologies/Card';
import ContentDetails from '../../../Common/topologies/ContentDetails';
import teamGL from '../../ontology/teamGL';

import { useContactOptionStyles } from './useContactOptionStyles';

const VolunteerContainer = () => {
  const classes = useContactOptionStyles();

  return (
    <Card>
      <CardContent noSpacing>
        <Property label={[schema.name, rdfs.label]} />
        <ContentDetails>
          <Property label={teamGL.department} />
          <Property label={teamGL.engagement} />
        </ContentDetails>
        <div className={classes.volunteerContactOptions}>
          <Property label={teamGL.telephone} />
          <Property label={schema.email} />
        </div>
        <Property label={schema.text} />
      </CardContent>
    </Card>
  );
};

VolunteerContainer.type = teamGL.Volunteer;

VolunteerContainer.topology = containerTopology;

export default register(VolunteerContainer);
