import rdfx from '@ontologies/rdf';
import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import { getTermBestLang } from 'link-lib';
import {
  linkType,
  register,
  useLRS,
  useResourceProperty,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import Detail from '../../components/Detail';
import LDLink from '../../components/LDLink';
import { detailsBarTopology } from '../../topologies/DetailsBar';

const ThingDetailsBar = ({
  name,
  theme,
  type,
}) => {
  const lrs = useLRS();
  const rawLabels = useResourceProperty(type, rdfs.label);
  const label = name?.value
    || getTermBestLang(rawLabels, lrs.store.langPrefs)?.value?.toLowerCase();

  return (
    <LDLink data-test="Thing-parent" features={['centered']} theme={theme}>
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

ThingDetailsBar.propTypes = {
  name: linkType,
  theme: PropTypes.string,
  type: linkType,
};

export default register(ThingDetailsBar);
