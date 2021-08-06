import { Literal, NamedNode } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import { getTermBestLang } from 'link-lib';
import {
  FC,
  register,
  useLRS,
  useResourceProperty,
} from 'link-redux';
import React from 'react';

import Detail from '../../components/Detail';
import LDLink from '../../components/LDLink';
import { LinkFeature, LinkTheme } from '../../components/Link';
import { detailsBarTopology } from '../../topologies/DetailsBar';

interface ThingDetailsBarProps {
  features?: LinkFeature[];
  name: Literal;
  theme: LinkTheme;
  type: NamedNode;
}

const ThingDetailsBar: FC<ThingDetailsBarProps> = ({
  features: featuresFromProps,
  name,
  theme,
  type,
}) => {
  const lrs = useLRS();
  const rawLabels = useResourceProperty(type, rdfs.label);
  const label = name?.value
    || getTermBestLang(rawLabels, (lrs.store as any).langPrefs)?.value?.toLowerCase();
  const features = (featuresFromProps || []).concat([LinkFeature.Centered]);

  return (
    <LDLink
      data-test="Thing-parent"
      features={features}
      theme={theme}
    >
      <Detail text={label} />
    </LDLink>
  );
};

ThingDetailsBar.type = schema.Thing;

ThingDetailsBar.topology = detailsBarTopology;

ThingDetailsBar.mapDataToProps = {
  name: schema.name,
  type: rdfx.type,
};

export default register(ThingDetailsBar);
