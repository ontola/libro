import rdf from '@ontologies/core';
import dcterms from '@ontologies/dcterms';
import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import {
  ReturnType,
  link,
  linkType,
  subjectType,
  useResourceProperty,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet-async';

import dbo from '../../ontology/dbo';
import ontola from '../../ontology/ontola';
import { getMetaContent } from '../../helpers/arguHelpers';
import { stripMarkdown } from '../../helpers/markdownHelper';

const Metadata = ({
  coverPhoto,
  name,
  subject,
  text,
}) => {
  const [coverURL] = useResourceProperty(
    typeof coverPhoto === 'string' ? rdf.namedNode(coverPhoto) : coverPhoto,
    ontola.imgUrl1500x2000
  );
  const appName = getMetaContent('application-name');

  const strippedText = stripMarkdown(text);

  return (
    <Helmet>
      <title>{name && name.length > 0 ? name : appName}</title>
      <link href={subject.value} itemProp="url" rel="canonical" />
      <meta content={subject.value} property="og:url" />
      <meta content={[name, appName].filter(Boolean).join(' | ')} property="og:title" />
      <meta content={[name, appName].filter(Boolean).join(' | ')} name="twitter:title" />
      {coverURL && <meta content={coverURL.value} id="og:image" property="og:image" />}
      {coverURL && <meta content={coverURL.value} name="twitter:image" />}
      {text && <meta content={strippedText} id="og:description" property="og:description" />}
      {text && <meta content={strippedText} name="twitter:description" />}
      {text && <meta content={strippedText} id="description" name="description" property="description" />}
      <meta content={coverURL ? 'summary_large_image' : 'summary'} name="twitter:card" />
    </Helmet>
  );
};

Metadata.propTypes = {
  coverPhoto: PropTypes.string,
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
  { returnType: ReturnType.Value }
)(Metadata);
