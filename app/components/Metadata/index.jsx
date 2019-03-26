import { link, lrsType } from 'link-redux';
import PropTypes from 'prop-types';
import { NamedNode } from 'rdflib';
import React from 'react';
import { Helmet } from 'react-helmet';

import { NS } from '../../helpers/LinkedRenderStore';

const Metadata = ({
  coverPhoto,
  identifier,
  lrs,
  name,
}) => {
  const coverURL = coverPhoto
    && lrs.getResourceProperty(NamedNode.find(coverPhoto), NS.argu('imgUrl1500x600'));

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
    coverPhoto: NS.argu('coverPhoto'),
    identifier: NS.dc('identifier'),
    name: [NS.schema('name'), NS.rdfs('label')],
  },
  { returnType: 'value' }
)(Metadata);
