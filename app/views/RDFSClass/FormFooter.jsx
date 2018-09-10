import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { link, linkedPropType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { Button } from '../../components';
import { normalizeFontAwesomeIRI } from '../../helpers/iris';
import { NS } from '../../helpers/LinkedRenderStore';
import { formFooterTopology } from '../../topologies/FormFooter/Footer';

const propTypes = {
  current: PropTypes.bool,
  description: linkedPropType,
  image: linkedPropType,
  label: linkedPropType,
  onClick: PropTypes.func,
};

const RDFSClassFormFooter = ({
  current,
  description,
  image,
  label,
  onClick,
}) => {
  const curClass = current ? ' Button--omniform-switcher--current' : '';

  return (
    <Button
      className={`Button--omniform-switcher Button--omniform-switcher-- ${curClass}`}
      icon={normalizeFontAwesomeIRI(image)}
      theme="transparant"
      title={description.value}
      onClick={onClick}
    >
      {label.value}
    </Button>
  );
};

RDFSClassFormFooter.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  link([
    NS.schema('description'),
    NS.rdfs('label'),
    NS.schema('image'),
  ])(RDFSClassFormFooter),
  NS.rdfs('Class'),
  RENDER_CLASS_NAME,
  formFooterTopology
);
