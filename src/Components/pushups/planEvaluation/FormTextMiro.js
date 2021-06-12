import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

const FormTextMiro = ({ setting, children }) => {
  let [title, question, form, formFieldToUpdate, changesFinished, changesWhenSavedToDb] = setting;
  let formValue = form[0][formFieldToUpdate];
  // console.log(formValue);
  let onChange = form[1];

  const [showSaveButton, setShowSaveButton] = React.useState(false);
  const buttonChangesFinishedClicked = () => {
    setShowSaveButton(false);
    changesFinished();
  }

  const handleOnChangeEvent = ({ target: { value } }) => {
    onChange(origValue => ({ ...origValue, [formFieldToUpdate]: value }))
    setShowSaveButton(true);
  }

  React.useEffect(() => { setShowSaveButton(false); }, [changesWhenSavedToDb])

  return (
    <div style={{
      width: '95%', margin: 'auto', marginBottom: '10px',
      // backgroundColor: 'lightGray',
      // borderBottom:'1px dotted gray',
      padding: '10px',

    }}>
      <h4>{title}</h4>
      <p
        style={{ marginBottom: '10px' }}
      >
        {question}
      </p>
      {/* {example && <p>{example}</p>} */}
      <div style={{ marginBottom: '10px' }}>{children}</div>


      <TextareaAutosize
        style={{
          // backgroundColor: 'blue',
          width: '100%',
          // margin: 'auto',
        }}
        minRows={3}
        value={formValue}
        onChange={handleOnChangeEvent}
      />
      {showSaveButton &&
        <button
          style={{ display: 'block', margin: 'auto' }}
          onClick={buttonChangesFinishedClicked}>Save Changes</button>}

      {/* <form>
        <textarea name="textarea" value={this.state.value} onChange={this.handleChange} />
        <input type="submit" value="Save" />
      </form> */}
    </div>
  );
};

export default FormTextMiro;