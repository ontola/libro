import { SomeNode } from 'link-lib';
import React from 'react';

export interface OmniformRecordType {
  action?: SomeNode;
  inlineOpened?: boolean;
  parentIRI?: string;
}

export type OmniformState = Record<string, OmniformRecordType>;

interface OmniformContextType {
  omniformState: OmniformState;
  setOmniformState: React.Dispatch<React.SetStateAction<OmniformState>>;
}

export const omniformContext = React.createContext<OmniformContextType>(undefined as any);

const OmniformProvider = ({ children }: { children: React.ReactElement }): JSX.Element => {
  const [omniformState, setOmniformState] = React.useState<OmniformState>({});

  const omniformStateMemo = React.useMemo(() => ({
    omniformState,
    setOmniformState,
  }), [omniformState, setOmniformState]);

  return (
    <omniformContext.Provider value={omniformStateMemo}>
      {children}
    </omniformContext.Provider>
  );
};

export default OmniformProvider;
