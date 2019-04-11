import React from 'react';

export const WebsiteContext = React.createContext();

export function withWebsiteIRI(Component) {
  return (props) => {
    const location = React.useContext(WebsiteContext);

    return (
      <Component {...props} websiteIRI={location.websiteIRI} />
    );
  };
}

export function withWebsitePathname(Component) {
  return (props) => {
    const location = React.useContext(WebsiteContext);

    return (
      <Component {...props} websitePathname={location.websitePathname} />
    );
  };
}

export function withWebsiteCtx(Component) {
  return (props) => {
    const location = React.useContext(WebsiteContext);

    return (
      <Component {...props} websiteCtx={location} />
    );
  };
}
