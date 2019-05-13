import { Property, register, subjectType } from 'link-redux';
import React from 'react';

import { CardContent } from '../../components';
import { hightlightType } from '../../containers/Highlight';
import { NS } from '../../helpers/LinkedRenderStore';
import ActionsBar from '../../topologies/ActionsBar';
import Card from '../../topologies/Card';
import CardAppendix from '../../topologies/Card/CardAppendix';
import { containerTopology } from '../../topologies/Container';

class ArgumentContainer extends React.PureComponent {
  static type = [
    NS.argu('Argument'),
    NS.argu('ProArgument'),
    NS.argu('ConArgument'),
  ];

  static topology = containerTopology;

  static propTypes = {
    highlighted: hightlightType,
    subject: subjectType,
  };

  render() {
    const { highlighted, subject } = this.props;

    return (
      <Card about={subject.value} shine={highlighted}>
        <Property label={NS.argu('coverPhoto')} />
        <CardContent noSpacing>
          <Property label={[NS.schema('name'), NS.rdfs('label')]} />
          <Property label={[NS.schema('text'), NS.schema('description'), NS.dbo('abstract')]} />
        </CardContent>
        <ActionsBar>
          <Property label={NS.ontola('favoriteAction')} />
        </ActionsBar>
        <CardAppendix>
          <Property label={NS.argu('voteableVoteEvent')} />
          <Property label={NS.argu('topComment')} />
          <Property clickToOpen forceRender label={NS.app('omniform')} />
        </CardAppendix>
      </Card>
    );
  }
}

export default register(ArgumentContainer);
