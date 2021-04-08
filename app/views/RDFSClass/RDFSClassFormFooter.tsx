import { Literal, NamedNode } from '@ontologies/core';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import { FC, register } from 'link-redux';
import React from 'react';
import MediaQuery from 'react-responsive';

import Button, { ButtonTheme } from '../../components/Button';
import { mediaQueries } from '../../components/shared/config';
import { normalizeFontAwesomeIRI } from '../../helpers/iris';
import { values } from '../../helpers/ssr';
import { formFooterTopology } from '../../topologies/FormFooter/Footer';

interface RDFSClassFormFooterProps {
  current?: boolean;
  description?: Literal;
  image?: string | NamedNode;
  label?: Literal;
  onClick?: () => void;
}

const RDFSClassFormFooter: FC<RDFSClassFormFooterProps> = ({
  current,
  description,
  image,
  label,
  onClick,
}) => {
  const curClass = current ? ' Button--omniform-switcher--current' : '';

  const children = !image
    ? label?.value
    : (
      <MediaQuery query={mediaQueries.smallAndAbove} values={values}>
        {label?.value}
      </MediaQuery>
    );

  return (
    <Button
      className={`Button--omniform-switcher Button--omniform-switcher-- ${curClass}`}
      icon={image && normalizeFontAwesomeIRI(image)}
      theme={ButtonTheme.Transparant}
      title={description?.value}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

RDFSClassFormFooter.type = rdfs.Class;

RDFSClassFormFooter.topology = formFooterTopology;

RDFSClassFormFooter.mapDataToProps = {
  description: schema.description,
  image: schema.image,
  label: rdfs.label,
};

export default register(RDFSClassFormFooter);
