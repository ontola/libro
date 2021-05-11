import { NamedNode } from '@ontologies/core';
import {
  FC,
  register,
  useLRS,
} from 'link-redux';
import React from 'react';

import Link, { LinkFeature } from '../../../components/Link';
import argu from '../../../ontology/argu';
import ontola from '../../../ontology/ontola';
import { footerTopology } from '../../../topologies/Footer';
import { navbarTopology } from '../../../topologies/Navbar';

interface HrefProps {
  action?: NamedNode;
  component: React.FunctionComponent<any>;
  features: LinkFeature[];
  handleClick: () => void;
  linkedProp: NamedNode;
  onClickToggle: () => void;
}

const Href: FC<HrefProps> = ({
  action,
  children,
  component,
  features,
  handleClick,
  linkedProp,
  onClickToggle,
}) => {
  const lrs = useLRS();
  const actionHandler = React.useCallback((e) => {
    if (e) {
      e.preventDefault();
    }

    return lrs.exec(action!);
  }, [action]);
  const clickHandler = action ? actionHandler : onClickToggle;
  const LinkComponent = component ?? Link;

  return (
    <LinkComponent
      isIndex
      features={features}
      to={linkedProp?.value}
      onClick={handleClick ?? clickHandler}
    >
      {children}
    </LinkComponent>
  );
};

Href.type = [
  argu.Link,
  ontola.MenuItem,
  argu.SubMenu,
];

Href.property = ontola.href;

Href.topology = [
  footerTopology,
  navbarTopology,
];

Href.mapDataToProps = {
  action: ontola.action,
  href: ontola.href,
};

export default register(Href);
