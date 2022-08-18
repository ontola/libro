import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import {
  TopologyFC,
  createTopologyProvider,
  useLinkRenderContext, 
} from 'link-redux';
import React from 'react';

import { LibroTheme } from '../../../Kernel/lib/themes';
import { attributeListTopology } from '../index';

const useStyles = makeStyles((theme: LibroTheme) => ({
  attributeList: {
    '& a': {
      '&:hover': {
        textDecoration: 'underline',
      },
      display: 'block',
      fontWeight: 'normal',
      textDecoration: 'underline',
    },

    '& label': {
      color: theme.palette.grey.midDark,
    },

    '& td': {
      padding: '.3em 0',
    },

    '& th': {
      color: theme.palette.grey.midDark,
      fontWeight: 600,
      paddingRight: '1rem',
      textAlign: 'left',
    },

    '&:not($fullLabel)': {
      'th': {
        width: '30%',
      },
    },
    marginBottom: '.6rem',
  },
  fullLabel: {},
}));

interface AttributeListProps {
  fullLabel?: boolean;
}

const AttributeListTopology = createTopologyProvider(attributeListTopology);

const AttributeList: TopologyFC<AttributeListProps> = ({ children, fullLabel }) => {
  const { subject } = useLinkRenderContext();
  const classes = useStyles();

  const className = clsx({
    [classes.attributeList]: true,
    [classes.fullLabel]: fullLabel,
  });

  return (
    <AttributeListTopology>
      <table
        className={className}
        resource={subject && subject.value}
      >
        <tbody>
          {children}
        </tbody>
      </table>
    </AttributeListTopology>
  );
};

export default AttributeList;
