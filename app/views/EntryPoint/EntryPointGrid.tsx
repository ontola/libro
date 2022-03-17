import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import clsx from 'clsx';
import {
  FC,
  Property,
  register,
  useProperty,
  useTopology,
} from 'link-redux';
import React from 'react';

import Button from '../../components/Button';
import EntryPointForm from '../../components/Form/EntryPointForm';
import GridHeader from '../../components/Grid/GridHeader';
import { LoadingHidden } from '../../components/Loading';
import ontola from '../../ontology/ontola';
import { footerTopology } from '../../topologies/Footer';
import FormFooter from '../../topologies/FormFooter';
import { gridTopology } from '../../topologies/Grid';
import { navbarTopology } from '../../topologies/Navbar';

import useEntryPointFormProps, { EntryPointProps } from './useEntryPointFormProps';

const useStyles = makeStyles({
  navbar: {
    '& .Button': {
      border: '1px solid',
      marginTop: '.5em',
      padding: '.2em 1em',
    },
    '& .MuiRadio-root': {
      color: 'white',
    },
  },
});

interface EntryPointGridProps extends EntryPointProps {
  smallButton: boolean;
}

const EntryPointGrid: FC<EntryPointGridProps> = ({
  smallButton,
  subject,
  ...otherProps
}) => {
  const classes = useStyles();
  const topology = useTopology();
  const entryPointFormProps = useEntryPointFormProps(subject!, otherProps);
  const [name] = useProperty(schema.name);
  const footer = React.useCallback((loading: boolean) => (
    <FormFooter>
      <Button
        loading={loading}
        small={smallButton}
        type="submit"
      >
        {name?.value}
      </Button>
    </FormFooter>
  ), [name, smallButton]);

  const className = clsx({
    [classes.navbar]: topology && [footerTopology, navbarTopology].includes(topology),
  });

  return (
    <React.Fragment>
      <Property label={schema.isPartOf}>
        <GridHeader header={<Property label={schema.name} />}>
          <Property
            label={ontola.updateAction}
            onLoad={LoadingHidden}
          />
        </GridHeader>
        <Property label={schema.text} />
      </Property>
      <EntryPointForm
        {...entryPointFormProps}
        className={className}
        footer={footer}
      />
    </React.Fragment>
  );
};

EntryPointGrid.type = schema.EntryPoint;

EntryPointGrid.topology = [
  footerTopology,
  gridTopology,
];

export default register(EntryPointGrid);
