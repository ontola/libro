import { TopologyType, useTopologyProvider } from 'link-redux';
import React from 'react';

export interface TopologyState {
  error?: Error;
}

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
