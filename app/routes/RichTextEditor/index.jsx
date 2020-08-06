// import React, { useState, useMemo, useCallback } from "react";
// import { deserializeMarkdown, RichTextEditor, serializeMarkdown } from '../../async/TextEditor/RichTextEditor';
// import { useSlate, ReactEditor } from "slate-react";
// import styled from 'styled-components';

// const EditorFrame = styled.div`
//   flex: 1; 
//   height: 100%;
//   margin: 0 10px;
// `;

// const Title = styled.div`
//   color: #888;
//   display: table-cell;
//   height: 50px;
//   vertical-align: middle;
// `;

// const initialValue = [
//   {
//     children: [
//       {
//         type: 'p',
//         children: [{ text: '' }],
//       }
//     ]
//   },
// ];

// const deserialize = () => {
//   const markdown = localStorage.getItem('RTE');
//   if (markdown) {
//     return [{ children: deserializeMarkdown(markdown) }];
//   }
//   return null;
// }

// const RTE = () => {
//   const [value, setValue] = useState(deserialize() || initialValue);

//   const onSave = useCallback((editor, nodes) => {
//     const markdown = serializeMarkdown(nodes);
//     localStorage.setItem('RTE', markdown)
//   }, []);

//   const onChange = useCallback((editor, nodes) => {
//     if (ReactEditor.isFocused(editor)) {
//       onSave(editor, nodes);
//     }
//   }, []);

//   const plugins = useMemo(() => ([
//     {
//       name: 'Heading',
//       commands: [
//         {
//           name: 'FormatHeading3',
//           disabled: true,
//         }
//       ],
//     },
//     {
//       name: 'Save',
//       disabled: false,
//       commands: [{
//         name: 'Save',
//         button: (props) => {
//           const editor = useSlate();
//           return (
//             <button        
//               onClick={e => {
//                 e.preventDefault();
//                 onSave(editor, editor.children);
//               }} 
//               style={{ marginLeft: '9px' }}
//               {...props}
//             >
//               Save
//             </button>
//           )
//         },
//       }],
//     },
//   ]), []);

//   return (
//       <EditorFrame>
//         <Title>Slate with plugins</Title>
//         <RichTextEditor 
//           placeholder='Typ hier uw tekst...'
//           plugins={plugins}
//           value={value} 
//           // onAutoSave={onSaveEditor1}
//           // onChange={onChangeEditor1} 
//           style={{
//             backgroundColor: '#fff',
//             height: '80vh', 
//             overflowY: 'scroll',
//             padding: '0px 10px',
//           }} 
//           toolbarStyle={{
//             backgroundColor: '#fff',
//           }}/>
//       </EditorFrame>
//   );
// }

// // ReactDOM.render(
// //     React.createElement(App),
// //     document.getElementById('root')
// // );




import React from 'react';
import RichEditor from '../../async/TextEditor/RichEditor';
const RTE = () => <div>test</div>;

export default RTE;