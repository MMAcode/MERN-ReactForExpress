import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import RawDraftContentState from './RawDraftContentState';
// import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import { postJsonDataUrlAfterAPIpushups } from '../../../../functions/postJsonData'
import { postJsonDataUrlAfterAPIpushups } from '../../../../functions/postJsonData';
import PushUpsContext from '../../state/PushUpsContextState';



const EditorComponent = ({ user }) => {
  console.log("USER AS PROP", user);
  // let { user, updateUser,publicPlans, updatePublicPlans } = React.useContext(PushUpsContext);

  // const [editorState, setEditorState] = React.useState(EditorState.createEmpty());
  // console.log("EDITOR state: ", editorState);
  // console.log("EDITOR: ", editorState._immutable._map.size);
  // console.log("EDITOR: ", editorState.getCurrentContent());

  //converting data
  // const content = { "entityMap": {}, "blocks": [{ "key": "637gr", "text": "Initialized from content state.", "type": "unstyled", "depth": 0, "inlineStyleRanges": [], "entityRanges": [], "data": {} }] };
  const content = { "entityMap": {}, "blocks": [{ "key": "698li", "text": "Initialized from content state XX.", "type": "unstyled", "depth": 0, "inlineStyleRanges": [], "entityRanges": [], "data": {} }] };
  // const [contentState, setContentState] = React.useState(convertFromRaw(content));
  const [contentState, setContentState] = React.useState(content);
  // const [contentState, setContentState] = React.useState(user.settings.richText);
  console.log("CONTENT state: ", contentState);

  const saveChanges = async () => {
    // let text = convertToRaw(contentState);
    let text= convertToRaw(contentState: ContentState): RawDraftContentState;
    let text = contentState;
    let updatedUserOrPlans = await postJsonDataUrlAfterAPIpushups('/richText', { text, action: 'save' });

  }

  // React.useEffect(() => {
  //   // setContentState(convertFromRaw(content));
  // }, [])

  // React.useEffect(() => {
  //   if (user)
  //     setContentState(user.settings.richText);
  //     // setContentState(convertFromRaw(content));

  //   console.log("UPDATING text FROM USER")
  // },[user])

  // if (!user) return <p>loading...</p>


  return (
    <div>
      <Editor
        // styles:
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        // wrapperStyle={{ color: 'red' }}
        // {/* wrapperStyle={<wrapperStyleObject>} */}
        // {/* editorStyle={<editorStyleObject>} */}
        // {/* toolbarStyle={<toolbarStyleObject>} */}

        ////state
        // editorState={editorState}
        // defaultEditorState={editorState}

        // onEditorStateChange={setEditorState}
        //content
        initialContentState={contentState}
        // defaultContentState={contentState}
        // initialContentState={JSON.parse(contentState)}
        // initialContentState={convertFromRaw(contentState)}
        // initialContentState={user.settings.richText}
        // initialContentState={user.settings.richText}
        // initialContentState={JSON.stringify({ entityMap: {}, blocks: user.settings.richText })}
        // initialContentState={convertFromRaw({ entityMap: {}, blocks: user.settings.richText })}
        // initialContentState={convertToRaw({ entityMap: {}, blocks: user.settings.richText })}
        // initialContentState={JSON.stringify(convertToRaw({ entityMap: {}, blocks: user.settings.richText }))}
        // initialContentState={convertToRaw(user.settings.richText)}

        // { "entityMap": {}, "blocks": [{ "key": "698li", "text": "Initialized from content state XX.", "type": "unstyled", "depth": 0, "inlineStyleRanges": [], "entityRanges": [], "data": {} }] };
        onContentStateChange={setContentState}
      />
      {/* <Editor
        onEditorStateChange={setEditorState}
        onContentStateChange={setContentState}
      /> */}
      {/* <div
        onEditorStateChange={setEditorState}
        onContentStateChange={setContentState}
      ></div> */}
      <button onClick={saveChanges}>Save changes</button>
    </div>
  )
}


const EditorComponentWrapper = () => {
  let { user, updateUser, publicPlans, updatePublicPlans } = React.useContext(PushUpsContext);

  if (!user) return <p>loading...</p>
  return (
    <EditorComponent user={user} />
  );
};


export default EditorComponentWrapper;