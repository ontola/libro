import React from 'react';

interface DropdownMenuContextInterface {
  loaded: number;
  setLoaded: React.Dispatch<React.SetStateAction<number>>;
}

export const DropdownMenuContext = React.createContext<DropdownMenuContextInterface>({} as any);
