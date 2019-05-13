import {
  linkType,
  lrsType,
  register,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import Link from '../../../components/Link';
import { NS } from '../../../helpers/LinkedRenderStore';
import SHACL from '../../../helpers/shacl';
import { navbarTopology } from '../../../topologies/Navbar';
import { appMenuTopology } from '../../../topologies/AppMenu';

class Href extends React.PureComponent {
  static type = [
    NS.argu('Link'),
    NS.ontola('MenuItem'),
    NS.argu('SubMenu'),
  ];

  static property = NS.ontola('href');

  static topology = [
    appMenuTopology,
    navbarTopology,
  ];

  static mapDataToProps = [
    NS.ontola('action'),
    NS.ontola('href'),
  ];

  static propTypes = {
    action: linkType,
    children: PropTypes.node,
    component: PropTypes.func,
    features: PropTypes.arrayOf(
      PropTypes.oneOf([
        'highlighted-darken',
        'highlighted-lighten',
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
