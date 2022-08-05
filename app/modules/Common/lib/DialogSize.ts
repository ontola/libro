export enum DialogSize {
  Xs = 'xs',
  Sm = 'sm',
  Md = 'md',
  Lg = 'lg',
  Xl = 'xl',
}

export const isDialogSize = (size?: string | null): size is DialogSize => [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  false,
].includes(size ?? '');
