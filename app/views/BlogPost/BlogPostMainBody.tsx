import { makeStyles } from '@material-ui/styles';
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

import CollapseText from '../../components/CollapseText';
import LDLink from '../../components/LDLink';
import ResourceBoundary from '../../components/ResourceBoundary';
import argu from '../../ontology/argu';
import dbo from '../../ontology/dbo';
import meeting from '../../ontology/meeting';
import { mainBodyTopology } from '../../topologies';

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
