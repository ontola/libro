declare module 'react-typeform-embed' {
  import React from 'react';

  export interface TypeForm {
    open: () => void;
  }

  export interface TypeFormWrapper {
    typeform?: TypeForm;
  }

  export const enum TypeFormModes {
    Popup = 'popup',
    DrawerLeft = 'drawer_left',
    DrawerRight = 'drawer_right',
  }

  export interface ReactTypeformEmbedProps {
    autoClose?: number;
    autoOpen?: boolean;
    buttonText?: string;
    hideFooter?: boolean;
    hideHeaders?: boolean;
    mode?: TypeFormModes;
    onSubmit?: () => void;
    opacity?: number;
    popup?: boolean;
    ref: (typeform: TypeFormWrapper) => void;
    url: string;
  }

  export const ReactTypeformEmbed: React.ComponentType<ReactTypeformEmbedProps>;
}
