import { Literal } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useIds,
  useLRS,
  useStrings,
} from 'link-redux';
import React from 'react';

import { OpenWindow } from '../../middleware/actions';
import dbo from '../../ontology/dbo';
import argu from '../../../Argu/ontology/argu';
import ontola from '../../../Kernel/ontology/ontola';
import CardContent from '../../components/Card/CardContent';
import Heading, { HeadingSize } from '../../components/Heading';
import { containerTopology } from '../../topologies';
import Card from '../../topologies/Card';

interface OrganizationContainerProps {
  hideHeader?: Literal;
  homepage?: Literal;
  name?: Literal;
}

const WebSiteContainer: FC<OrganizationContainerProps> = () => {
  const lrs = useLRS();
  const [name] = useStrings(schema.name);
  const [url] = useIds(schema.url);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    lrs.actions.get(OpenWindow)(url.value);
  };

  return (
    <Card>
      <Property label={ontola.coverPhoto} />
      <CardContent noSpacing>
        <Heading size={HeadingSize.LG}>
          <button
            type="button"
            onClick={handleClick}
          >
            {name}
          </button>
        </Heading>
        <Property label={[schema.text, schema.description, dbo.abstract]} />
      </CardContent>
    </Card>
  );
};

WebSiteContainer.type = [
  schema.Organization,
  argu.Page,
  schema.WebSite,
];

WebSiteContainer.topology = containerTopology;

export default register(WebSiteContainer);
