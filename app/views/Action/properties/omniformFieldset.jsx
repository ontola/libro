import LinkedRenderStore from 'link-lib';
import PropTypes from 'prop-types';
import React from 'react';

import { allTopologies, NS } from '../../../helpers/LinkedRenderStore';

import ArgumentFields from './fields/ArgumentFields';
import BlogPostFields from './fields/BlogPostFields';
import CommentFields from './fields/CommentFields';
import IdeaFields from './fields/IdeaFields';

const propTypes = {
  formName: PropTypes.string,
  onKeyUp: PropTypes.func,
};

const CreateActionFallbackFieldset = props => <CommentFields autoFocus {...props} />;

const CreateBlogPostFieldset = props => <BlogPostFields autoFocus {...props} />;

const CreateCommentFieldset = props => <CommentFields autoFocus {...props} />;

const CreateConArgumentFieldset = ({ formName, onKeyUp }) => (
  <ArgumentFields autoFocus formName={formName} side="con" onKeyUp={onKeyUp} />
);
CreateConArgumentFieldset.propTypes = propTypes;

const CreateProArgumentFieldset = ({ formName, onKeyUp }) => (
  <ArgumentFields autoFocus formName={formName} side="pro" onKeyUp={onKeyUp} />
);
CreateProArgumentFieldset.propTypes = propTypes;

const CreateIdeaFieldset = IdeaFields;

export default [
  LinkedRenderStore.registerRenderer(
    CreateProArgumentFieldset,
    NS.argu('CreateProArgument'),
    NS.app('omniformFieldset'),
    allTopologies
  ),
  LinkedRenderStore.registerRenderer(
    CreateConArgumentFieldset,
    NS.argu('CreateConArgument'),
    NS.app('omniformFieldset'),
    allTopologies
  ),
  LinkedRenderStore.registerRenderer(
    CreateBlogPostFieldset,
    NS.argu('CreateBlogPost'),
    NS.app('omniformFieldset'),
    allTopologies
  ),
  LinkedRenderStore.registerRenderer(
    CreateCommentFieldset,
    NS.argu('CreateComment'),
    NS.app('omniformFieldset'),
    allTopologies
  ),
  LinkedRenderStore.registerRenderer(
    CreateIdeaFieldset,
    NS.argu('CreateMotion'),
    NS.app('omniformFieldset'),
    allTopologies
  ),
  LinkedRenderStore.registerRenderer(
    CreateActionFallbackFieldset,
    NS.argu('CreateAction'),
    NS.app('omniformFieldset'),
    allTopologies
  ),
];
