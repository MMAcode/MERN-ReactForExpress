import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils} from 'draft-js';

function MyEditor() {
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty());

  //focus editor on load
  const editor = React.useRef(null);
  function focusEditor() {editor.current.focus();}
  React.useEffect(() => {focusEditor()}, []);

  //buttons
  const _onBoldClick= ()=> {
    // setEditorState((editorState)=>RichUtils.toggleInlineStyle(editorState, 'BOLD'));
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  }

  return (
    <div onClick={focusEditor} style={{ backgroundColor: 'gray' }}>
      <button onClick={_onBoldClick}>Bold</button>
      <Editor
        ref={editor}
        editorState={editorState}
        onChange={editorState => setEditorState(editorState)}
      />
    </div>
  );
}

export default MyEditor;