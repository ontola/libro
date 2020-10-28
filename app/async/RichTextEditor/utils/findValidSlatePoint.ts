import { Editor, Point } from 'slate';
import { ReactEditor } from 'slate-react';

export const findValidSlatePoint = (editor: ReactEditor, point: Point, isNewPoint: boolean = false): Point => {
  try {
    ReactEditor.toDOMPoint(editor, point);

    return isNewPoint ? Editor.end(editor, point.path) : point;
  } catch {
    const lastIndex = point.path.length - 1;
    if (lastIndex > -1) {
      const lastElement = point.path[lastIndex];
      if (lastElement > 0) {
        const newPoint = point;
        newPoint.offset = 0;
        newPoint.path[lastIndex] = lastElement - 1;

        return findValidSlatePoint(editor, newPoint, true);
      } else if (lastIndex > 0) {
        const newPoint = point;
        newPoint.offset = 0;
        newPoint.path.pop();

        return findValidSlatePoint(editor, newPoint, true);
      }
    }
  }

  return Editor.start(editor, []);
};
