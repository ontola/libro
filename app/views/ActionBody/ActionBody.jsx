import {
  Property,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import form from '../../ontology/form';
import { allTopologies } from '../../topologies';

const ActionBody = ({
  contentWrapper,
}) => {
  const itemWrapperOpts = React.useMemo(() => (
    contentWrapper === CardContent
      ? { noStartSpacing: true }
      : {}
  ), [contentWrapper]);

  return (
    <Property
      itemWrapper={contentWrapper}
      itemWrapperOpts={itemWrapperOpts}
      label={form.pages}
    />
  );
};

ActionBody.type = form.Form;

ActionBody.topology = allTopologies;

ActionBody.propTypes = {
  contentWrapper: PropTypes.elementType,
};

ActionBody.mapDataToProps = {
  pages: form.pages,
};

export default register(ActionBody);
