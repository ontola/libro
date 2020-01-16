import {
  linkType,
  lrsType,
  register,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import Link from '../../../components/Link';
import SHACL from '../../../helpers/shacl';
import argu from '../../../ontology/argu';
import ontola from '../../../ontology/ontola';
import { navbarTopology } from '../../../topologies/Navbar';

class Href extends React.PureComponent {
  static type = [
    argu.ns('Link'),
    ontola.MenuItem,
    argu.ns('SubMenu'),
  ];

  static property = ontola.href;

  static topology = [
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
    features: PropTypes.arrayOf(
      PropTypes.oneOf([
        'padded',
      ])
    ),
    handleClick: PropTypes.func,
    href: linkType,
    lrs: lrsType,
    onClickToggle: PropTypes.func,
    subject: subjectType,
  };

  clickHandler() {
    const {
      action,
      lrs,
      subject,
      onClickToggle,
    } = this.props;

    if (action) {
      return (e) => {
        if (e) {
          e.preventDefault();
        }

        return lrs.exec(action, SHACL.actionToObject(lrs, subject));
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
        to={href ? href.value : '#'}
        onClick={handleClick || this.clickHandler()}
      >
        {children}
      </LinkComponent>
    );
  }
}

export default register(Href);
