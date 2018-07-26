import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';

import { NS } from '../../helpers/LinkedRenderStore';
import {
  Loading,
  LoadingSideBarLink,
  LoadingCard,
  LoadingCardFixed,
  LoadingPage,
  LoadingParent,
  LoadingRow,
} from '../../components';

export default [
  LinkedRenderStore.registerRenderer(
    LoadingPage,
    NS.ll('LoadingResource')
  ),
  LinkedRenderStore.registerRenderer(
    LoadingParent,
    NS.ll('LoadingResource'),
    RENDER_CLASS_NAME,
    NS.argu('parent')
  ),
  LinkedRenderStore.registerRenderer(
    LoadingCard,
    NS.ll('LoadingResource'),
    RENDER_CLASS_NAME,
    [
      NS.argu('collection'),
      NS.argu('container'),
      NS.argu('section'),
    ]
  ),
  LinkedRenderStore.registerRenderer(
    LoadingCardFixed,
    NS.ll('LoadingResource'),
    RENDER_CLASS_NAME,
    [
      NS.argu('grid'),
      NS.argu('widget'),
    ]
  ),
  LinkedRenderStore.registerRenderer(
    LoadingRow,
    NS.ll('LoadingResource'),
    RENDER_CLASS_NAME,
    [
      NS.argu('card'),
      NS.argu('cardFixed'),
      NS.argu('cardHover'),
      NS.argu('cardMain'),
      NS.argu('cardRow'),
    ]
  ),
  LinkedRenderStore.registerRenderer(
    LoadingSideBarLink,
    NS.ll('LoadingResource'),
    RENDER_CLASS_NAME,
    [
      NS.argu('dropdownContent'),
      NS.argu('sidebar'),
    ]
  ),
  LinkedRenderStore.registerRenderer(
    Loading,
    NS.ll('LoadingResource'),
    RENDER_CLASS_NAME,
    [
      NS.argu('detail'),
      NS.argu('inline'),
      NS.argu('voteBubble'),
    ]
  ),
];
