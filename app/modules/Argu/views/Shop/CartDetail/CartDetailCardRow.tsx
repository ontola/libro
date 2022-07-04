import { makeStyles } from '@mui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import { CardMicroRow } from '../../../../Common/topologies/Card';
import { cardRowTopology } from '../../../../Common/topologies/Card/CardRow';
import argu from '../../../ontology/argu';

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
