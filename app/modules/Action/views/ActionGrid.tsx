import { makeStyles } from '@mui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  dig,
  register,
  useGlobalIds,
  useStrings,
} from 'link-redux';
import React from 'react';

import { LibroTheme } from '../../Kernel/lib/themes';
import Heading, { HeadingSize } from '../../Common/components/Heading';
import Link from '../../Common/components/Link';
import { NAME_PREDICATES } from '../../Common/lib/metaData';
import { footerTopology } from '../../Common/topologies/Footer';
import { gridTopology } from '../../Common/topologies/Grid';
import { LoadingHidden } from '../../Common/components/Loading';
import ontola from '../../Kernel/ontology/ontola';
import SVG from '../../SVG/components';

const useStyles = makeStyles<LibroTheme>((theme) => ({
  image: {
    '& svg': {
      filter: `
        drop-shadow(0.5px  3.7px  3.1px rgba(0, 0, 0, 0.040))
        drop-shadow(1.2px  8.5px  8.6px rgba(0, 0, 0, 0.027))
        drop-shadow(2.3px 16.8px 20.8px rgba(0, 0, 0, 0.021))
        drop-shadow(6.0px 44.0px 69.0px rgba(0, 0, 0, 0.015))`,
      height: 'auto',
      width: '100%',
    },
    color: theme.palette.primary.main,
  },
  link: {
    flexDirection: 'column',
    width: '100%',
  },
}));

const ActionGrid: FC = ({ subject }) => {
  const classes = useStyles();
  const [image] = useGlobalIds(ontola.svg);
  const [actionName] = useStrings(schema.name);
  const [className] = useStrings(dig(schema.result, NAME_PREDICATES));

  return (
    <Link
      className={classes.link}
      to={subject.value}
    >
      <Heading size={HeadingSize.MD}>
        {className ?? actionName}
      </Heading>
      {image?.value && (
        <SVG
          className={classes.image}
          src={image.value}
        />
      )}
      <Property
        label={ontola.updateAction}
        onLoad={LoadingHidden}
      />
      <Property label={schema.text} />
    </Link>
  );
};

ActionGrid.type = schema.Action;

ActionGrid.topology = [
  footerTopology,
  gridTopology,
];

export default register(ActionGrid);
