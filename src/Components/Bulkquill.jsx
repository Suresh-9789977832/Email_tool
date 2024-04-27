// import React, { useState } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

// export function Bulkemailquill({quillcontent,setquillcontent}) {

//   var toolbar= [
//     [{ header:'1' },{header:"2"}, {header:[3,4,5,6]},{font:[]}],
//     [{size:[]}],
//     ['bold', 'italic', 'underline','strike', 'blockquote'],
//     [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
//     ['link', 'image'],
//     ['clean'],
//     ['code-block']
//   ]
//   const module = {
//     toolbar:toolbar
//   }

//   const handleChange = (content, delta, source, editor) => {
//     const plainText = editor.getText();

//     setquillcontent(plainText);
//   };



//   return <ReactQuill modules={module} theme="snow" value={quillcontent} onChange={handleChange} className='h-80'/>;
// }
