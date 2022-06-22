import {
  renderError,
  useCalculateChildProps,
  useLRS,
  useLinkRenderContext,
} from 'link-redux';
import { Helpers } from 'link-redux/dist-types/types';
import React from 'react';

import { handle } from '../../../../helpers/logging';

interface ErrorRenderer extends Helpers {
  error?: Error;
  props: Record<string, unknown>;
}

const ErrorRenderer = ({
  error,
  props,
  reset,
}: ErrorRenderer): JSX.Element | null => {
  const lrs = useLRS();
  const renderCtx = useLinkRenderContext();

  try {
    const childProps = useCalculateChildProps(
      props,
      renderCtx,
      { helpers: { reset } },
    );

    return renderError(childProps, lrs, error);
  } catch (e) {
    handle(e);

    return (
      <button
        type="button"
        onClick={reset}
      >
        Error
      </button>
    );
  }
};

export default ErrorRenderer;
