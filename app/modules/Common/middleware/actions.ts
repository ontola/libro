import { Literal, NamedNode } from '@ontologies/core';
import { AttributeKey, SomeNode } from 'link-lib';

import libro from '../../Kernel/ontology/libro';

export const ShowSnackbar = new AttributeKey<(message: Literal | string) => void>(libro.actions.snackbar.show.value);
export const ShowDialog = new AttributeKey<(resource: SomeNode, size?: string | null) => Promise<void>>(libro.actions.dialog.alert.value);
export const HideDialog = new AttributeKey<(resource?: SomeNode, done?: boolean) => void>(libro.actions.dialog.close.value);
export const Navigate = new AttributeKey<(resource: NamedNode, reload?: boolean) => void>(libro.actions.redirect.value);
export const OpenWindow = new AttributeKey<(url: string) => void>(libro.actions.window.open.value);
export const PlayAudio = new AttributeKey<(resource: NamedNode) => void>(libro.actions.playAudio.value);
export const PlayBeep = new AttributeKey<(opts?: { time?: number, steps?: number, frequency?: number }) => void>(libro.actions.playBeep.value);
