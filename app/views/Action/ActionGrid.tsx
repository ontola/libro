import { makeStyles } from '@material-ui/styles';
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

import Heading, { HeadingSize } from '../../components/Heading';
import Link from '../../components/Link';
import { LoadingHidden } from '../../components/Loading';
import SVG from '../../containers/SVG';
import { NAME_PREDICATES } from '../../helpers/metaData';
import ontola from '../../ontology/ontola';
import { LibroTheme } from '../../themes/themes';
import { footerTopology } from '../../topologies/Footer';
import { gridTopology } from '../../topologies/Grid';

const useStyles = makeStyles<LibroTheme>((theme) => ({
  image: {
    '& svg': {
      borderRadius: theme.shape.borderRadius,
      boxShadow:
        `0.5px 3.7px 3.1px rgba(0, 0, 0, 0.04),
        1.2px 8.5px 8.6px rgba(0, 0, 0, 0.027),
        2.3px 16.8px 20.8px rgba(0, 0, 0, 0.021),
        6px 44px 69px rgba(0, 0, 0, 0.015)`,
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

  return(
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
