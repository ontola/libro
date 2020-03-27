import rdf from '@ontologies/core';
import dcterms from '@ontologies/dcterms';
import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import {
  link,
  linkType,
  lrsType,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet-async';

import dbo from '../../ontology/dbo';
import ontola from '../../ontology/ontola';
import { getMetaContent } from '../../helpers/arguHelpers';

const Metadata = ({
  coverPhoto,
  lrs,
  name,
  subject,
  text,
}) => {
  const coverURL = coverPhoto
    && lrs.getResourceProperty(rdf.namedNode(coverPhoto), ontola.imgUrl1500x2000);
  const appName = getMetaContent('application-name');

  return (
    <Helmet>
      <title>{name && name.length > 0 ? name : appName}</title>
      <link href={subject.value} itemProp="url" rel="canonical" />
      <meta content={subject.value} property="og:url" />
      <meta content={[name, appName].filter(Boolean).join(' | ')} property="og:title" />
      <meta content={[name, appName].filter(Boolean).join(' | ')} name="twitter:title" />
      {coverURL && <meta content={coverURL.value} id="og:image" property="og:image" />}
      {coverURL && <meta content={coverURL.value} name="twitter:image" />}
      {text && <meta content={text} id="og:description" property="og:description" />}
      {text && <meta content={text} name="twitter:description" />}
      {text && <meta content={text} id="description" name="description" property="description" />}
      <meta content={coverURL ? 'summary_large_image' : 'summary'} name="twitter:card" />
    </Helmet>
  );
};

Metadata.propTypes = {
  coverPhoto: PropTypes.string,
  lrs: lrsType,
  name: PropTypes.string.isRequired,
  subject: subjectType,
  text: linkType,
};

export default link(
  {
    coverPhoto: ontola.coverPhoto,
    identifier: dcterms.identifier,
    name: [schema.name, rdfs.label],
    text: [dbo.abstract, schema.description, schema.text],
  },
  { returnType: 'value' }
)(Metadata);
