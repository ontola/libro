import { linkedPropType, register } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import Detail from '../../../components/Detail';
import { formatDateFromNow } from '../../../helpers/date';
import { NS } from '../../../helpers/LinkedRenderStore';
import { detailsBarTopology } from '../../../topologies/DetailsBar';

const propTypes = {
  linkedProp: linkedPropType,
  short: PropTypes.bool,
};

class ExpiresAt extends React.PureComponent {
  static type = NS.schema('Thing');

  static property = NS.argu('expiresAt');

  static topology = detailsBarTopology;

  static propTypes = propTypes;

  render() {
    const { linkedProp, short } = this.props;

    const d = new Date(linkedProp.value);

    if (d < Date.now()) {
      return (
        <Detail
          icon="lock"
          text={short ? '' : 'Gesloten'}
          title={`Gesloten op ${d.toLocaleString()}`}
        />
      );
    }

    return (
      <Detail
        icon="exclamation"
        text={`Nog ongeveer ${formatDateFromNow(d)}`}
        title={`Sluit op ${d.toLocaleString()}`}
      />
    );
  }
}

export default register(ExpiresAt);
