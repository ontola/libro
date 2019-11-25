import schema from '@ontologies/schema';
import { linkType, register } from 'link-redux';
import React from 'react';
import PropTypes from 'prop-types';

import Detail from '../../components/Detail';
import { contentDetailsTopology } from '../../topologies/ContentDetails/index';
import { detailsBarTopology } from '../../topologies/DetailsBar/index';

const EntryPointDetail = ({ image, name }) => {
  const icon = image && image.value.startsWith('fa-') ? image.value.slice('fa-'.length) : image.value;

  return <Detail icon={icon} text={name} />;
};

EntryPointDetail.type = schema.EntryPoint;

EntryPointDetail.topology = [
  contentDetailsTopology,
  detailsBarTopology,
];

EntryPointDetail.mapDataToProps = {
  image: schema.image,
};

EntryPointDetail.propTypes = {
  image: linkType,
  name: PropTypes.string,
};

export default register(EntryPointDetail);
