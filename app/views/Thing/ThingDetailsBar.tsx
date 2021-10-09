import * as rdfx from '@ontologies/rdf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import { getTermBestLang } from 'link-lib';
import {
  FC,
  register,
  useFields,
  useGlobalIds,
  useLRS,
  useValues,
} from 'link-redux';
import React from 'react';

import Detail from '../../components/Detail';
import LDLink from '../../components/LDLink';
import { LinkFeature, LinkTheme } from '../../components/Link';
import { detailsBarTopology } from '../../topologies/DetailsBar';

interface ThingDetailsBarProps {
  features?: LinkFeature[];
  theme: LinkTheme;
}

const ThingDetailsBar: FC<ThingDetailsBarProps> = ({
  features: featuresFromProps,
  theme,
}) => {
  const [name] = useValues(schema.name);
  const [type] = useGlobalIds(rdfx.type);
  const lrs = useLRS();
  const rawLabels = useFields(type, rdfs.label);
  const label = name
    ?? getTermBestLang(rawLabels, (lrs.store as any).langPrefs)?.value?.toLowerCase();
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

export default register(ThingDetailsBar);
