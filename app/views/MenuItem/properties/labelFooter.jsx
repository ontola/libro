import schema from '@ontologies/schema';
import { linkType, register } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import Heading from '../../../components/Heading';
import argu from '../../../ontology/argu';
import ontola from '../../../ontology/ontola';
import { footerTopology } from '../../../topologies/Footer';

const MenuItemLabelFooter = ({ linkedProp, nested }) => {
  if (nested) {
    return (
      <div className="">
        {linkedProp.value}
      </div>
    );
  }

  return (
    <Heading size="3" variant="navbar">
      {linkedProp.value}
    </Heading>
  );
};

MenuItemLabelFooter.type = [
  ontola.MenuItem,
  argu.SubMenu,
  argu.Menu,
];

MenuItemLabelFooter.property = schema.name;

MenuItemLabelFooter.topology = footerTopology;

MenuItemLabelFooter.mapDataToProps = {
  image: schema.image,
  name: schema.name,
};

MenuItemLabelFooter.propTypes = {
  linkedProp: linkType,
  nested: PropTypes.bool,
};

export default register(MenuItemLabelFooter);
