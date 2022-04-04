import { NamedNode } from '@ontologies/core';
import {
  FC,
  register,
  useGlobalIds,
  useLRS,
} from 'link-redux';
import React from 'react';

import Link, { LinkFeature } from '../../../components/Link';
import argu from '../../../ontology/argu';
import ontola from '../../../ontology/ontola';
import { footerTopology, navbarTopology } from '../../../topologies';

interface HrefProps {
  component: React.FunctionComponent<any>;
  features: LinkFeature[];
  handleClick: () => void;
  linkedProp: NamedNode;
  onClickToggle: () => void;
}

const Href: FC<HrefProps> = ({
  children,
  component,
  features,
  handleClick,
  linkedProp,
  onClickToggle,
}) => {
  const lrs = useLRS();
  const [action] = useGlobalIds(ontola.action);
  const actionHandler = React.useCallback((e) => {
    if (e) {
      e.preventDefault();
    }

    return lrs.exec(action!);
  }, [action]);
  const clickHandler = action ? actionHandler : onClickToggle;
  const LinkComponent = component ?? Link;

  return linkedProp?.value ? (
    <LinkComponent
      isIndex
      allowExternal={false}
      features={features}
      to={linkedProp?.value ?? ''}
      onClick={handleClick ?? clickHandler}
    >
      {children}
    </LinkComponent>
  ) : (
    <span>
      {children}
    </span>
  );
};

Href.type = [
  argu.Link,
  ontola.MenuItem,
  argu.SubMenu,
];

Href.property = ontola.href;

Href.topology = [
  navbarTopology,
  footerTopology,
];

export default register(Href);
