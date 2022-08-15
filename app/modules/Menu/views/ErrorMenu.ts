import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';

import { ERROR_CLASSES } from '../../Common/lib/metaData';
import {
  alertDialogTopology,
  containerTopology,
  listTopology, 
} from '../../Common/topologies';
import { ErrorButtonInline } from '../../Common/views/Error/ErrorButtonInline';
import { ErrorContainer } from '../../Common/views/Error/ErrorContainer';
import { appMenuTopology } from '../topologies';

export default [
  ...LinkedRenderStore.registerRenderer(
    ErrorButtonInline,
    ERROR_CLASSES,
    RENDER_CLASS_NAME,
    appMenuTopology,
  ),
  ...LinkedRenderStore.registerRenderer(
    ErrorContainer,
    ERROR_CLASSES,
    RENDER_CLASS_NAME,
    [
      alertDialogTopology,
      containerTopology,
      listTopology,
    ],
  ),
];
