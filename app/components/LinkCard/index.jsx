import React from 'react';
import { PropertyBase } from 'link-redux';

import {
  Card,
  CardContent,
  LDLink,
} from 'components';

class LinkCard extends PropertyBase {
  render() {
    return (
      <LDLink>
        <Card>
          <CardContent>
            {this.getLinkedObjectProperty()}
          </CardContent>
        </Card>
      </LDLink>
    );
  }
}

export default LinkCard;
