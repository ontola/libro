import { LibroDocument } from '../../components/Studio';

export interface EditorFile {
  name: string;
  language: string;
  value: string;
}

export const filesToDoc = (files: EditorFile[]): LibroDocument => {
  const source = files.filter((f) => f.language === 'typescript')[0].value;
  const manifestOverride = files.filter((f) => f.language === 'json')[0].value;

  return {
    manifestOverride,
    source,
  };
};
