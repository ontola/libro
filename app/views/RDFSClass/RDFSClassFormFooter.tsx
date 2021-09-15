import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';
import MediaQuery from 'react-responsive';

import Button, { ButtonTheme } from '../../components/Button';
import { mediaQueries } from '../../components/shared/config';
import { normalizeFontAwesomeIRI } from '../../helpers/iris';
import { values } from '../../helpers/ssr';
import { formFooterTopology } from '../../topologies/FormFooter';

interface RDFSClassFormFooterProps {
  current?: boolean;
  onClick?: () => void;
}

const RDFSClassFormFooter: FC<RDFSClassFormFooterProps> = ({
  current,
  onClick,
}) => {
  const [description] = useProperty(schema.description);
  const [image] = useProperty(schema.image);
  const [label] = useProperty(rdfs.label);

  const curClass = current ? ' Button--omniform-switcher--current' : '';

  const children = !image
    ? label?.value
    : (
      <MediaQuery
        query={mediaQueries.smallAndAbove}
        values={values}
      >
        {label?.value}
      </MediaQuery>
    );

  return (
    <Button
      className={`Button--omniform-switcher Button--omniform-switcher-- ${curClass}`}
      icon={image && normalizeFontAwesomeIRI(image)}
      theme={ButtonTheme.Transparent}
      title={description?.value}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

RDFSClassFormFooter.type = rdfs.Class;

RDFSClassFormFooter.topology = formFooterTopology;

export default register(RDFSClassFormFooter);
