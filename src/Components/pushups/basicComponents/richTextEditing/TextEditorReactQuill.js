import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const QuillReactEditor = ({ initialValue, onChange, onSubmit, submitButtonText, placeholder, hideToolbar, customStyles }) => {
  // console.log("hideToolbar: ", hideToolbar);
  const [value, setValue] = React.useState(initialValue ? initialValue : null);//placeholder will be useed instead
  React.useEffect(() => { setValue(initialValue ? initialValue : null) }, [initialValue]);
  // const [bigObject, setBigObject] = React.useState();

  React.useEffect(() => {
    // if (!onChange && !onSubmit) document.querySelector('.ql-toolbar').style.display = 'none';
  }, []);

  // const modules = {
  //   toolbar: [
  //     [{ 'header': [1, 2, false] }],
  //     ['bold', 'italic', 'underline', 'strike', 'blockquote'],
  //     [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
  //     // ['link', 'image'],
  //     ['link'],
  //     ['clean']
  //   ],
  // };

  const modules = {
    toolbar: hideToolbar ? false
      : [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        // ['link', 'image'],
        ['link'],
        ['clean']
      ],
  };

  // const modules.toolbar = hideToolbar ? false
  //     : [
  //       [{ 'header': [1, 2, false] }],
  //       ['bold', 'italic', 'underline', 'strike', 'blockquote'],
  //       [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
  //       // ['link', 'image'],
  //       ['link'],
  //       ['clean']
  //     ],
  // };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link',
    // 'image'
  ];

  const handleChange = (a, b, c, d) => {
    // console.log("ABCD: \n", a + '\n' + b + '\n' + c + '\n' + d);
    // console.log(d.getContents());
    setValue(a);
    // setBigObject(d.getContents()); //doesn't load the values in properly in adjust plan - spae and bunch of other stuff doesn't work
    // setBigObject(a);
    if (onChange) onChange(a);
  }

  const submitChanges = () => {
    // let dataToSave = JSON.stringify(bigObject);
    // localStorage.setItem('bigObject', dataToSave);
    // console.log("submitted", );
    // if (functionUsingSubmittedValue) functionUsingSubmittedValue(bigObject);
    // onSubmit(bigObject);
    if (onSubmit) onSubmit(value);
    // console.log(functionUsingSubmittedValue);
  }

  // const getData = async () => {
  //   let dataFromStorage = localStorage.getItem('bigObject');
  //   let data = JSON.parse(localStorage.getItem('bigObject'));
  //   console.log(dataFromStorage);
  //   console.log(data);
  //   setValue(data);
  // }

  return (
    <div>
      <ReactQuill
        value={value}
        onChange={handleChange}
        readOnly={(onChange || onSubmit) ? false : true}
        theme="snow"
        // theme="bubble"
        modules={modules}
        placeholder={placeholder ? placeholder : 'write here...'}
        formats={formats}//all enabled by default
        style={customStyles}
      // toolbar={false} //disabled as alert was displayed that this is an old-deprecated format, module.toolbar is needed now...
      />
      {onSubmit &&
        <button
          className='ql-MiroSubmitButton'
          style={{ textAlign: 'center', margin: 'auto', display: 'block' }}
          onClick={submitChanges}>
          {submitButtonText ? submitButtonText : 'submit'}
        </button>}
    </div>
  );
}
export default QuillReactEditor;