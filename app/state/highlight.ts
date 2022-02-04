import React from 'react';

interface highlightContextType {
  highlightState: string | undefined;
  setHighlightState: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const highlightContext = React.createContext<highlightContextType>(undefined as any);
