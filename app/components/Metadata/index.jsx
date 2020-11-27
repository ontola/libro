import rdf from '@ontologies/core';
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

import {
  COVER_PREDICATES,
  COVER_URL_PREDICATE,
  NAME_PREDICATES,
  TEXT_PREDICATES,
  getMetaTags,
} from '../../helpers/metaData';
import { getMetaContent } from '../../helpers/arguHelpers';
import { useStrippedMarkdown } from '../../helpers/markdownHelper';

const Metadata = ({
  coverPhoto,
  name,
  subject,
  text,
}) => {
  const [coverURL] = useResourceProperty(
    typeof coverPhoto === 'string' ? rdf.namedNode(coverPhoto) : coverPhoto,
    COVER_URL_PREDICATE
  );
  const appName = getMetaContent('application-name');
  const strippedText = useStrippedMarkdown(text);
  const metaTags = React.useMemo(() => (
    getMetaTags({
      appName,
      coverURL: coverURL?.value,
      name,
      text: strippedText,
      url: subject.value,
    })
  ), [appName, name, subject, text, coverURL]);

  return (
    <Helmet>
      {metaTags.map((metaTag) => {
        const {
          type,
          ...tagProps
        } = metaTag;

        return React.createElement(type, tagProps);
      })}
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
    coverPhoto: COVER_PREDICATES,
    name: NAME_PREDICATES,
    text: TEXT_PREDICATES,
  },
  { returnType: ReturnType.Value }
)(Metadata);
