import rdf from '@ontologies/core';
import dcterms from '@ontologies/dcterms';
import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import { link, lrsType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet-async';

import ontola from '../../ontology/ontola';

const Metadata = ({
  coverPhoto,
  identifier,
  lrs,
  name,
}) => {
  const coverURL = coverPhoto
    && lrs.getResourceProperty(rdf.namedNode(coverPhoto), ontola.imgUrl1500x2000);

  return (
    <Helmet>
      <title>{name}</title>
      {identifier && <link href={identifier} itemProp="url" rel="canonical" />}
      {identifier && <meta content={identifier} property="og:url" />}
      <meta content={`${name} | Argu`} property="og:title" />
      {coverURL && <meta content={coverURL.value} id="og:image" property="og:image" />}
    </Helmet>
  );
};

Metadata.propTypes = {
  coverPhoto: PropTypes.string,
  identifier: PropTypes.string.isRequired,
  lrs: lrsType,
  name: PropTypes.string.isRequired,
};

export default link(
  {
    coverPhoto: ontola.coverPhoto,
    identifier: dcterms.identifier,
    name: [schema.name, rdfs.label],
  },
  { returnType: 'value' }
)(Metadata);
