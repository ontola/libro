import {
  linkType,
  lrsType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import Link, { linkFeatures } from '../../../components/Link';
import argu from '../../../ontology/argu';
import ontola from '../../../ontology/ontola';
import { footerTopology } from '../../../topologies/Footer';
import { navbarTopology } from '../../../topologies/Navbar';

class Href extends React.PureComponent {
  static type = [
    argu.Link,
    ontola.MenuItem,
    argu.SubMenu,
  ];

  static property = ontola.href;

  static topology = [
    footerTopology,
    navbarTopology,
  ];

  static mapDataToProps = {
    action: ontola.action,
    href: ontola.href,
  };

  static propTypes = {
    action: linkType,
    children: PropTypes.node,
    component: PropTypes.func,
    features: linkFeatures,
    handleClick: PropTypes.func,
    href: linkType,
    lrs: lrsType,
    onClickToggle: PropTypes.func,
  };

  clickHandler() {
    const {
      action,
      lrs,
      onClickToggle,
    } = this.props;

    if (action) {
      return (e) => {
        if (e) {
          e.preventDefault();
        }

        return lrs.exec(action);
      };
    }

    return onClickToggle;
  }

  render() {
    const {
      children,
      component,
      features,
      handleClick,
      href,
    } = this.props;

    const LinkComponent = component || Link;

    return (
      <LinkComponent
        isIndex
        features={features}
        to={href?.value}
        onClick={handleClick || this.clickHandler()}
      >
        {children}
      </LinkComponent>
    );
  }
}

export default register(Href);
