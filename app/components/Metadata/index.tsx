import rdf from '@ontologies/core';
import {
  ReturnType,
  useLink,
  useLinkRenderContext,
  useResourceProperty,
} from 'link-redux';
import React from 'react';
import { Helmet } from 'react-helmet-async';

import { getMetaContent } from '../../helpers/arguHelpers';
import { useStrippedMarkdown } from '../../helpers/markdownHelper';
import {
  COVER_PREDICATES,
  COVER_URL_PREDICATES,
  NAME_PREDICATES,
  TEXT_PREDICATES,
  getMetaTags,
} from '../../helpers/metaData';

const MAX_TEXT_LENGTH = 300;

const Metadata: React.FC = () => {
  const { subject } = useLinkRenderContext();
  const {
    coverPhoto,
    name,
    text,
  } = useLink({
    coverPhoto: COVER_PREDICATES,
    name: NAME_PREDICATES,
    text: TEXT_PREDICATES,
  },
  { returnType: ReturnType.Value },
  );
  const [coverURL] = useResourceProperty(
    typeof coverPhoto === 'string' ? rdf.namedNode(coverPhoto) : coverPhoto,
    COVER_URL_PREDICATES[0],
  );
  const appName = getMetaContent('application-name');
  const trimmedText = text?.substring(0, MAX_TEXT_LENGTH);
  const strippedText = useStrippedMarkdown(trimmedText);
  const metaTags = React.useMemo(() => (
    getMetaTags({
      appName,
      coverURL: coverURL?.value,
      name,
      text: strippedText,
      url: subject.value,
    })
  ), [appName, name, subject, strippedText, coverURL]);

  return (
    <Helmet>
      {metaTags.map((metaTag) => {
        const {
          type,
          ...tagProps
        } = metaTag;

        return React.createElement(type, {
          key: `${tagProps.name ?? tagProps.id ?? tagProps.rel}:${tagProps.href ?? tagProps.content}`,
          ...tagProps,
        });
      })}
    </Helmet>
  );
};

export default Metadata;
