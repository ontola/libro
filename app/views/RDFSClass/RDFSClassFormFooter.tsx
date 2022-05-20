import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import Button, { ButtonVariant } from '../../components/Button';
import { normalizeFontAwesomeIRI } from '../../helpers/iris';
import { BreakPoints } from '../../themes/themes';
import { formFooterTopology } from '../../topologies';

interface RDFSClassFormFooterProps {
  current?: boolean;
  onClick?: () => void;
}

const RDFSClassFormFooter: FC<RDFSClassFormFooterProps> = ({
  current,
  onClick,
}) => {
  const theme = useTheme();
  const [description] = useProperty(schema.description);
  const [image] = useProperty(schema.image);
  const [label] = useProperty(rdfs.label);
  const screenIsWide = useMediaQuery(theme.breakpoints.up(BreakPoints.Medium));

  return (
    <Button
      active={current}
      icon={image && normalizeFontAwesomeIRI(image)}
      title={description?.value}
      variant={ButtonVariant.Omniform}
      onClick={onClick}
    >
      {(!image || screenIsWide) && label?.value}
    </Button>
  );
};

RDFSClassFormFooter.type = rdfs.Class;

RDFSClassFormFooter.topology = formFooterTopology;

export default register(RDFSClassFormFooter);
