import React from 'react';

interface highlightContextType {
  highlightState: string | undefined;
  setHighlightState: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const highlightContext = React.createContext<highlightContextType>(undefined as any);

export const useHighlight = (): highlightContextType => React.useContext(highlightContext);

const HighlightProvider = ({ children }: { children: React.ReactElement }): JSX.Element => {
  const [highlightState, setHighlightState] = React.useState<string | undefined>(undefined);

  const highlightStateMemo = React.useMemo(() => ({
    highlightState,
    setHighlightState,
  }), [highlightState, setHighlightState]);

  return (
    <highlightContext.Provider value={highlightStateMemo}>
      {children}
    </highlightContext.Provider>
  );
};

export default HighlightProvider;
