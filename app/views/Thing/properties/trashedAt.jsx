import { linkedPropType, register } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { CardContent } from '../../../components';
import { NS } from '../../../helpers/LinkedRenderStore';
import Card from '../../../topologies/Card';
import { containerTopology } from '../../../topologies/Container';


class TrashedAt extends React.PureComponent {
  static type = NS.schema('Thing');

  static property = NS.argu('trashedAt');

  static topology = containerTopology;

  static propTypes = {
    intl: PropTypes.shape({
      formatTime: PropTypes.func,
    }),
    linkedProp: linkedPropType,
  };

  render() {
    const { intl: { formatTime }, linkedProp } = this.props;

    return (
      <Card warn>
        <CardContent endSpacing>
          Dit item is verwijderd op {formatTime(linkedProp.value)}
        </CardContent>
      </Card>
    );
  }
}

export default register(TrashedAt);
