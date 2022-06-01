import {
  Helpers,
  TopologyType,
  renderError,
  useCalculateChildProps,
  useLRS,
  useTopologyProvider,
} from 'link-redux';
import React from 'react';

import { handle } from '../../helpers/logging';

export interface TopologyState {
  error?: Error;
}

export type TopologyContent = JSX.Element;
type ErrorRenderComp<C, P> = React.FC<TopologyState & Helpers & { context: C, props: P; }>;

export const renderErrorComp = (self: React.Component<Record<string, unknown>, TopologyState>) => (): JSX.Element => {
  const ErrorRenderer: ErrorRenderComp<typeof self.context, typeof self.props> = ({
    context,
    error,
    props,
    reset,
  }) => {
    const lrs = useLRS();

    try {
      const childProps = useCalculateChildProps(
        props,
        context,
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

  return (
    <ErrorRenderer
      context={self.context}
      error={self.state.error}
      props={self.props}
      reset={() => self.setState({ error: undefined })}
    />
  );
};

export type TopologyFC<P = unknown> = React.FC<React.PropsWithChildren<P>>;

export const createBasicTopologyProvider = (topology: TopologyType): TopologyFC => {
  const BasicTopology: TopologyFC = ({ children }) => {
    const [BasicTopologyProvider] = useTopologyProvider(topology);

    return (
      <BasicTopologyProvider>
        {children}
      </BasicTopologyProvider>
    );
  };

  return BasicTopology;
};
