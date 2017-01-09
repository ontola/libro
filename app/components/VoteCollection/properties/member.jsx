import { List, OrderedMap } from 'immutable';
import { getValueOrID } from 'link-lib';
import {
  fetchLinkedObject,
  LinkedObjectContainer,
  PropertyBase,
  selectLinkedObject,
  selectLinkedObjectById,
} from 'link-redux';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import LinkedRenderStore from 'helpers/LinkedRenderStore';
import { calcPercentage } from 'helpers/numbers';

const knownProTypes = [
  'http://schema.org/pro', 'pro',
  'http://schema.org/yes', 'yes',
];

const knownConTypes = [
  'http://schema.org/con', 'con',
  'http://schema.org/no', 'no',
];

const LOADING_THRESHOLD = 3;
const HREF_THRESHOLD = 2;

function getOneOf(obj, propList) {
  if (obj === undefined) {
    return undefined;
  }
  if (!(propList instanceof Array)) {
    return obj.get(propList);
  }
  const i = propList.findIndex(obj.has, obj);
  return i === -1 ? undefined : obj.get(propList[i]);
}

function idIsInArray(id) {
  return comp => comp && getValueOrID(comp) === getValueOrID(id);
}

function votebarPartStyle(key) {
  const str = ['VoteData__votebar-part'];
  if (key) {
    str.push(`VoteData__votebar-part--${key}`);
    const split = key.split(/\/|#/);
    if (split.length > HREF_THRESHOLD) {
      str.push(`VoteData__votebar-part--${split.pop()}`);
    }
  }
  return str.join(' ');
}

const propTypes = {
  /** The amount of items to render. Leave undefined for all items */
  limit: PropTypes.number,
  optionCounts: PropTypes.object,
};

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

  optionCount(key) {
    const { optionCounts } = this.props;
    return optionCounts ? getValueOrID(optionCounts[key][0]['@value']) : 0;
  }

  optionWidth(key) {
    const { optionCounts } = this.props;
    if (optionCounts === undefined) {
      return { width: '33%' };
    }
    const total = Object.keys(optionCounts).reduce((k, t) => this.optionCount(t) + k, 0);
    const width = calcPercentage(
      this.optionCount(LinkedRenderStore.expandProperty(key)),
      total
    );
    return { width: `${width}%` };
  }

  orderedOptions() {
    if (this.props.optionCounts === undefined) {
      return ['yes', 'neutral', 'no'];
    }
    const isNeutral = o => !knownProTypes.includes(o) && !knownConTypes.includes(o);
    return Object
      .keys(this.props.optionCounts)
      .sort((a, b) => {
        if (isNeutral(a)) {
          if (knownProTypes.includes(b)) {
            return 1;
          }
          return knownConTypes.includes(b) ? -1 : 0;
        } else if (knownProTypes.includes(a)) {
          return knownProTypes.includes(b) ? 0 : -1;
        } else if (knownConTypes.includes(a)) {
          return knownConTypes.includes(b) ? 0 : 1;
        }
        return 0;
      });
  }

  render() {
    const { groupBy, limit, objects } = this.props;
    const groups = new OrderedMap().withMutations((map) => {
      objects.forEach((obj) => {
        const curGroup = getValueOrID(getOneOf(obj, groupBy));
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
        {this.orderedOptions().map(key =>
          <div
            key={`${getValueOrID(this.context.schemaObject)}:${key}`}
            className={votebarPartStyle(key)}
            style={this.optionWidth(key)}
          >
            <div className="VoteData__votesegment-wrapper">
              {
                groups.get(key, new List()).take(limit || Infinity).map(obj => (
                  <LinkedObjectContainer
                    key={`${getValueOrID(this.context.schemaObject)}:${obj.get('@id')}`}
                    object={obj.get('@id')}
                    topology="collection"
                  />
                ))
              }
            </div>
            <span className={`VoteData__votebar-count VoteData__votebar-count--${key}`}>
              {this.optionCount(LinkedRenderStore.expandProperty(key))}
            </span>
          </div>
        )}
      </div>
    );
  }
}

GroupedMemberView.propTypes = propTypes;

const GroupedMember = connect(
  (state, props) => ({
    data: selectLinkedObject(state, props),
    objects: props.memberArr
      .map(obj => selectLinkedObjectById(state, getValueOrID(obj)))
      .filter(obj => obj && obj.size > LOADING_THRESHOLD),
  }),
  dispatch => ({
    loadLinkedObject: href => dispatch(fetchLinkedObject(href)),
  })
)(GroupedMemberView);

class VoteCollection extends PropertyBase {
  render() {
    return (
      <GroupedMember
        memberArr={this.getLinkedObjectPropertyRaw()}
        {...this.props}
      />
    );
  }
}

LinkedRenderStore.registerRenderer(
  VoteCollection,
  ['argu:VoteCollection', 'aod:CountCollection'],
  'hydra:member'
);
