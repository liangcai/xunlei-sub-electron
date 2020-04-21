import React, { useState } from "react";
import { useDropzone } from "react-dropzone";


export default function DraggerArea(props) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "video/*, .mkv, .rmvb, .avi",
    onDrop: handonDrop,
  });

  const acceptedFilesItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const getTreeData = (files) => {
    files.map((file) => {
      querySub(file.path);
    })
  }

  function handonDrop(acceptedFiles) {
    // const req = request.post('/api');
    getTreeData(acceptedFiles);
  }

  const querySub = (path) => {
    console.log("query sub from python api, arg: ", path);
  }

  return (
    <div {...getRootProps({ className: "dropzone" })}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
      <em>(Only video will be accepted)</em>
    </div>
  );
}