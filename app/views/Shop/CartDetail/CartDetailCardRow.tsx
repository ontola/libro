import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import argu from '../../../ontology/argu';
import { cardRowTopology } from '../../../topologies';
import { CardMicroRow } from '../../../topologies/Card';

const useStyle = makeStyles(() => ({
  wrapper: {
    float: 'right',
  },
}));

const CartDetailCardRow: FC = (): JSX.Element => {
  const styles = useStyle();

  return (
    <CardMicroRow>
      <Property label={schema.name} />
      <div className={styles.wrapper}>
        <Property label={schema.isPartOf}>
          <Property label={argu.price} />
        </Property>
      </div>
    </CardMicroRow>
  );
};

CartDetailCardRow.type = argu.CartDetail;

CartDetailCardRow.topology = cardRowTopology;

export default register(CartDetailCardRow);
