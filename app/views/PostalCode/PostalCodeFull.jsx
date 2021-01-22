import schema from '@ontologies/schema';
import { OK } from 'http-status-codes';
import {
  Property,
  register,
  subjectType,
  useLRS,
} from 'link-redux';
import React from 'react';

import AttributeListItem from '../../components/AttributeListItem';
import CardContent from '../../components/Card/CardContent';
import { LoadingFullResource } from '../../components/Loading';
import teamGL from '../../ontology/teamGL';
import AttributeList from '../../topologies/AttributeList';
import CardMain from '../../topologies/Card/CardMain';
import Container from '../../topologies/Container';
import { fullResourceTopology } from '../../topologies/FullResource';

export const usePartialResourceCheck = (subject) => {
  const lrs = useLRS();
  const partal = lrs.getStatus(subject).status !== OK;

  React.useEffect(() => {
    if (partal) {
      lrs.api.invalidate(subject);
    }
  }, [subject]);

  return partal;
};

const PostalCodeFull = ({ subject }) => {
  const partal = usePartialResourceCheck(subject);
  if (partal) {
    return <LoadingFullResource />;
  }

  return (
    <React.Fragment>
      <Container>
        <Property label={schema.isPartOf} />
        <CardMain>
          <CardContent noSpacing>
            <Property label={schema.name} />
            <AttributeList fullLabel>
              <AttributeListItem label={teamGL.totalFlyers} />
              <AttributeListItem label={teamGL.flyerVolunteers} />
              <AttributeListItem label={teamGL.activeFlyered} />
            </AttributeList>
          </CardContent>
        </CardMain>
      </Container>
      <Property label={teamGL.streets} />
    </React.Fragment>
  );
};

PostalCodeFull.type = teamGL.PostalCode;

PostalCodeFull.topology = fullResourceTopology;

PostalCodeFull.propTypes = {
  subject: subjectType,
};

export default register(PostalCodeFull);
