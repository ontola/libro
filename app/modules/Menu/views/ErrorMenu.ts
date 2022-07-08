import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';

import { ERROR_CLASSES } from '../../Common/lib/metaData';
import { containerTopology } from '../../Common/topologies/Container';
import { alertDialogTopology } from '../../Common/topologies/Dialog';
import { listTopology } from '../../Common/topologies/List';
import { ErrorButtonInline } from '../../Common/views/Error/ErrorButtonInline';
import { ErrorContainer } from '../../Common/views/Error/ErrorContainer';
import { appMenuTopology } from '../topologies/AppMenu';

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
