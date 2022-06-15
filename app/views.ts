/**
 * This document is purely for including all the views into the code.
 * Please properly include each file when access to the code is needed.
 */
import { ComponentRegistration } from 'link-lib';
import { LinkReduxLRSType } from 'link-redux';

import { componentRegistrations } from './components';
import Academy from './modules/Academy/views';
import Action from './modules/Action/views';
import Argu from './modules/Argu/views';
import Auth from './modules/Auth/views';
import Collection from './modules/Collection/views';
import Common from './modules/Common/views';
import Core from './modules/Core/views';
import Dexes from './modules/Dexes/views';
import Element from './modules/Elements/views';
import Flow from './modules/Flow/views';
import Form from './modules/Form/views';
import GroenLinks from './modules/GroenLinks/views';
import Menu from './modules/Menu/views';
import NavBar from './modules/NavBar/views';
import Omniform from './modules/Omniform/views';
import SalesWebsite from './modules/SalesWebsite/views';

export function getViews(): Array<ComponentRegistration<any> | Array<ComponentRegistration<any>>> {
  return [
    ...Academy,
    ...Auth,
    ...Core,
    ...Action,
    ...Argu,
    ...Collection,
    ...Common,
    ...Dexes,
    ...Element,
    ...Flow,
    ...Form,
    ...GroenLinks,
    ...Menu,
    ...NavBar,
    ...Omniform,
    ...SalesWebsite,
  ];
}

export default function register(lrs: LinkReduxLRSType): void {
  lrs.registerAll(...getViews(), ...componentRegistrations());
}
