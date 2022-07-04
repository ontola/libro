import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';

import { ERROR_CLASSES } from '../../Common/lib/metaData';
import { ErrorButtonInline } from '../../Common/views/Error/ErrorButtonInline';
import { omniformFieldsTopology } from '../topologies/OmniformFields/OmniformFields';

export default [
  LinkedRenderStore.registerRenderer(
    ErrorButtonInline,
    ERROR_CLASSES,
    RENDER_CLASS_NAME,
    omniformFieldsTopology,
  ),
];
