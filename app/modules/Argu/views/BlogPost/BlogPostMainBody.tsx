import { makeStyles } from '@mui/styles';
import * as foaf from '@ontologies/foaf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useStrings,
} from 'link-redux';
import React from 'react';

import dbo from '../../../Common/ontology/dbo';
import meeting from '../../../../ontology/meeting';
import CollapseText from '../../../Common/components/CollapseText';
import LDLink from '../../../Common/components/LDLink';
import { mainBodyTopology } from '../../../Common/topologies';
import ResourceBoundary from '../../../Common/components/ResourceBoundary';
import argu from '../../ontology/argu';

const useStyles = makeStyles(() => ({
  wrapper: {
    border: '1px solid #E0E0E0',
    borderRadius: '.3em',
    marginTop: '1em',
    padding: '1em',
  },
}));

const BlogPostMainBody: FC = ({
  subject,
}) => {
  const classes = useStyles();
  const [text] = useStrings([schema.text, schema.description, dbo.abstract]);

  return (
    <ResourceBoundary wrapperProps={{ className: classes.wrapper }}>
      <LDLink>
        <Property label={[schema.name, rdfs.label, foaf.name]} />
      </LDLink>
      <CollapseText
        id={subject.value}
        minCharacters={700}
        text={text ?? ''}
      />
      <Property label={[argu.attachments, meeting.attachment]} />
    </ResourceBoundary>
  );
};

BlogPostMainBody.type = argu.BlogPost;

BlogPostMainBody.topology = mainBodyTopology;

export default register(BlogPostMainBody);
