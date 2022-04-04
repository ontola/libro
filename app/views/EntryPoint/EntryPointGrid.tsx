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
import PropTypes from 'prop-types';
import React from 'react';

import Button from '../../components/Button';
import EntryPointForm from '../../components/Form/EntryPointForm';
import GridHeader from '../../components/Grid/GridHeader';
import HeadingContext from '../../components/Heading/HeadingContext';
import { LoadingHidden } from '../../components/Loading';
import ontola from '../../ontology/ontola';
import {
  footerTopology,
  gridTopology,
  navbarTopology,
} from '../../topologies';
import FormFooter from '../../topologies/FormFooter';

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

interface PropTypes extends EntryPointProps {
  smallButton: boolean;
}

const EntryPointGrid: FC<PropTypes> = ({
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
    <HeadingContext>
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
    </HeadingContext>
  );
};

EntryPointGrid.type = schema.EntryPoint;

EntryPointGrid.topology = [
  footerTopology,
  gridTopology,
];

export default register(EntryPointGrid);
