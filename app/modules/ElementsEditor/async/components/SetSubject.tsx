import {
  LinkRenderCtx,
  useDataInvalidation,
  useLinkRenderContext,
} from 'link-redux';
import { SubjectProp } from 'link-redux/dist-types/types';
import React from 'react';

/**
 * Sets the current subject to {props.subject} and renders its children.
 */
export const SetSubject = (props: React.PropsWithChildren<SubjectProp>): JSX.Element => {
  const ctx = useLinkRenderContext();
  const updated = React.useMemo(() => (
    {
      ...ctx,
      subject: props.subject,
    }
  ), [ctx, props.subject]);
  useDataInvalidation(updated.subject);

  return (
    <LinkRenderCtx.Provider value={updated}>
      {props.children}
    </LinkRenderCtx.Provider>
  );
};
