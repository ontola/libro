import { Module } from './Module';
import Academy from './modules/Academy';
import Action from './modules/Action';
import Argu from './modules/Argu';
import Auth from './modules/Auth';
import Collection from './modules/Collection';
import Common from './modules/Common';
import DataCube from './modules/DataCube';
import Dexes from './modules/Dexes';
import Elements from './modules/Elements';
import Flow from './modules/Flow';
import Form from './modules/Form';
import Kernel from './modules/Kernel';
import Libro from './modules/Libro';
import Menu from './modules/Menu';
import NavBar from './modules/NavBar';
import Omniform from './modules/Omniform';
import SalesWebsite from './modules/SalesWebsite';
import Table from './modules/Table';

export const modules: Module[] = [
  Kernel,
  Common,

  Action,
  Auth,
  Collection,
  DataCube,
  Elements,
  Form,
  Flow,
  Libro,
  Menu,
  NavBar,
  Omniform,
  Table,

  Academy,
  Argu,
  Dexes,
  SalesWebsite,
];
