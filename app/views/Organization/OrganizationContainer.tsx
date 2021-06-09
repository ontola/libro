import { Literal } from '@ontologies/core';
import * as foaf from '@ontologies/foaf';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useLRS,
  useProperty,
} from 'link-redux';
import React from 'react';

import Heading, { HeadingSize } from '../../components/Heading';
import argu from '../../ontology/argu';
import dbo from '../../ontology/dbo';
import ontola from '../../ontology/ontola';
import Card from '../../topologies/Card';
import CardContent from '../../components/Card/CardContent';
import { containerTopology } from '../../topologies/Container';

interface OrganizationPageProps {
  hideHeader?: Literal;
  homepage?: Literal;
  name?: Literal;
}

const OrganizationPage: FC<OrganizationPageProps> = ({
  subject,
}) => {
  const lrs = useLRS();
  const [name] = useProperty(schema.name);
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    lrs.actions.ontola.openWindow(subject.value);
  };

  return (
    <Card about={subject?.value}>
      <Property label={ontola.coverPhoto} />
      <CardContent noSpacing>
        <Heading size={HeadingSize.LG}>
          <button onClick={handleClick}>
            {name?.value}
          </button>
        </Heading>
        <Property label={[schema.text, schema.description, dbo.abstract]} />
      </CardContent>
    </Card>
  );
};

OrganizationPage.type = [
  schema.Organization,
  argu.Page,
  schema.WebSite,
];

OrganizationPage.topology = containerTopology;

OrganizationPage.mapDataToProps = {
  hideHeader: ontola.hideHeader,
  homepage: foaf.homepage,
  name: schema.name,
};

export default register(OrganizationPage);
