import { List, Map } from 'immutable';
import { getValueOrID } from 'link-lib';
import {
  fetchLinkedObject,
  LinkedObjectContainer,
  PropertyBase,
  selectLinkedObject,
  selectLinkedObjectById
} from 'link-redux';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';


import LinkedRenderStore from '../../../helpers/LinkedRenderStore';
import {
  Columns,
} from 'components';

const propTypes = {
  /** The amount of items to render. Leave undefined for all items */
  limit: PropTypes.number,
};

function idIsInArray(id) {
  return (comp) => {
    return comp && getValueOrID(comp) === getValueOrID(id);
  };
}

class GroupedMemberView extends PropertyBase {
  componentWillMount() {
    const { memberArr, objects, loadLinkedObject } = this.props;
    memberArr.forEach((obj) => {
      const id = getValueOrID(obj);
      if (!objects.find(idIsInArray(id))) {
        loadLinkedObject(id);
      }
    });
  }

  render() {
    const { groupBy, objects } = this.props;
    const groups = new Map().withMutations(map => {
      objects.forEach(obj => {
        const curGroup = obj.get(groupBy) && getValueOrID(obj.get(groupBy).toJS());
        if (curGroup !== undefined) {
          const list = map.get(curGroup) !== undefined
            ? map.get(curGroup).push(obj)
            : new List([obj]);
          map.set(curGroup, list);
        }
      });
    });

    return (
      <div className="VoteData__votebar" style={this.props.style}>
        {groups.keySeq().map(key =>
          <div
            key={`${getValueOrID(this.context.schemaObject)}:${key}`}
            className={`VoteData__votebar-part VoteData__votebar-part--${key}`}
          >
            <div className="VoteData__votesegment-wrapper">
              {
                groups.get(key).map(obj => (
                  <LinkedObjectContainer
                    key={`${getValueOrID(this.context.schemaObject)}:${obj.get('@id')}`}
                    object={obj.get('@id')}
                    topology="collection"
                  />
                ))
              }
            </div>
          </div>
        )}
      </div>
    );
  }
}

GroupedMemberView.propTypes = propTypes;

const GroupedMember = connect(
  (state, props) => {
    return {
      data: selectLinkedObject(state, props),
      objects: props.memberArr
      .map(obj => selectLinkedObjectById(state, getValueOrID(obj)))
      .filter(obj => obj && obj.size > 3),
    };
  },
  dispatch => ({
    loadLinkedObject: (href, fetch) =>
      dispatch(fetchLinkedObject(href)),
  })
)(GroupedMemberView);

class VoteCollection extends PropertyBase {
  render() {
    return (
      <GroupedMember
        memberArr={this.getLinkedObjectPropertyRaw()}
        {...this.props}
      />
    )
  }
}

export default GroupedMemberProp;

LinkedRenderStore.registerRenderer(
  VoteCollection,
  'argu:VoteCollection'
);
