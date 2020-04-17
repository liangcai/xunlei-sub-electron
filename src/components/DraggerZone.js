import React from "react";
import { useDropzone } from "react-dropzone";
import SubZone from "./Subzone";


function DraggerArea(props) {

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: 'video/*'
  });

  const acceptedFilesItems = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <div {...getRootProps({ className: "dropzone" })}>
    <input {...getInputProps()} />
    <p>Drag 'n' drop some files here, or click to select files</p>
    <em>(Only video will be accepted)</em>
  </div>
  )
}


function DraggerZone(props) {


  // const files = props.files.map((file, idx) => (
  //   <li key={file.name}>
  //     {file.name} - {file.size} bytes
  //     <Subzone subs={getsubs(idx)} />
  //   </li>
  // ));


  return (
    <section className="container">
    <DraggerArea />
    <SubZone substree={props.substree} />
    </section>
  );
}



export default DraggerZone;
