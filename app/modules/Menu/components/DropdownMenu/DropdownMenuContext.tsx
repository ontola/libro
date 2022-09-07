import React from 'react';

interface DropdownMenuContextInterface {
  loaded: string;
  setLoaded: React.Dispatch<React.SetStateAction<string>>;
}

export const DropdownMenuContext = React.createContext<DropdownMenuContextInterface>({} as any);
