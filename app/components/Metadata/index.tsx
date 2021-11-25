import {
  dig,
  useLinkRenderContext,
  useValues,
} from 'link-redux';
import React from 'react';
import { Helmet } from 'react-helmet-async';

import { appContext } from '../../appContext';
import {
  COVER_PREDICATES,
  COVER_URL_PREDICATES,
  NAME_PREDICATES,
  TEXT_PREDICATES,
  getMetaTags,
} from '../../helpers/metaData';
import { useStrippedMarkdown } from '../../helpers/useStrippedMarkdown';

const MAX_TEXT_LENGTH = 300;

const Metadata: React.FC = () => {
  const { title: appName } = React.useContext(appContext);
  const { subject } = useLinkRenderContext();
  const [coverURL] = useValues(dig(COVER_PREDICATES, COVER_URL_PREDICATES[0]));
  const [name] = useValues(NAME_PREDICATES);
  const [text] = useValues(TEXT_PREDICATES);
  const trimmedText = text?.substring(0, MAX_TEXT_LENGTH);
  const strippedText = useStrippedMarkdown(trimmedText);
  const metaTags = React.useMemo(() => (
    getMetaTags({
      appName,
      coverURL: coverURL,
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
