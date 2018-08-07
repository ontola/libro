import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { link } from 'link-redux';

import { Attachment } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';

export default [
  LinkedRenderStore.registerRenderer(
    link([
      NS.schema('name'),
      NS.schema('contentUrl'),
      NS.schema('fileFormat'),
      NS.schema('fileSize'),
    ], { returnType: 'value' })(Attachment),
    [NS.schema('MediaObject'), NS.council('Attachment')],
    RENDER_CLASS_NAME,
    [
      NS.argu('cardList'),
      NS.argu('cardRow'),
      NS.argu('card'),
      NS.argu('cardMain'),
    ]
  ),
];
