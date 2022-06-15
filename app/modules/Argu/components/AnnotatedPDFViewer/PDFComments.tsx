import React from 'react';

import PDFComment, { CommentProps } from './PDFComment';

export interface AllCommentsProps {
  comments: CommentProps[];
  currentPage: number;
}

const PDFComments = ({
  comments,
  currentPage,
}: AllCommentsProps): JSX.Element => {
  const filtered = comments.filter((comment) => comment.page === currentPage);

  return (
    <p>
      {filtered.map((commentProps) => (
        <PDFComment
          key={commentProps.subject.value}
          {...commentProps}
        />
      ))}
    </p>
  );
};

export default PDFComments;
