import { Editor } from "slate";
import { ListOptions, toggleList } from "@udecode/slate-plugins";
import { withHistoryEntry } from "../transforms/withHistory";

export const getToggleList = (typeList: string, options: ListOptions) => (editor: Editor) => {
  withHistoryEntry(editor, () => {
    toggleList(editor, { 
      typeList, ...options
    });
  });
};