import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { link, linkedPropType } from 'link-redux';
import React from 'react';

import { Detail } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import { detailsBarTopology } from '../../topologies/DetailsBar';
import TypeDetail from '../Thing/properties/type';

import FormFooter from './FormFooter';

const propTypes = {
  description: linkedPropType,
  label: linkedPropType,
};

const RDFSClass = ({
  description,
  label,
}) => (
  <Detail
    linkedImage
    text={label.value}
    title={description.value}
  />
);

RDFSClass.displayName = 'RDFSClass';
RDFSClass.propTypes = propTypes;

export default [
  LinkedRenderStore.registerRenderer(
    link([NS.schema('description'), NS.rdfs('label'), NS.schema('image')])(RDFSClass),
    NS.rdfs('Class'),
    RENDER_CLASS_NAME,
    detailsBarTopology
  ),
  FormFooter,
  TypeDetail,
];
