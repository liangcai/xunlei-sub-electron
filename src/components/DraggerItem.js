import React from "react";
import { useDropzone } from "react-dropzone";
import Subzone from "./Subzone";

function Basic(props) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: 'video/*'
  });

  const getsubs = (idx) => {
    if (props.subs && "subs" in props.subs[idx]) {
      return props.subs[idx].subs;
    } else {
      return [];
    }
  };

  const acceptedFilesItems = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));


  // const files = props.files.map((file, idx) => (
  //   <li key={file.name}>
  //     {file.name} - {file.size} bytes
  //     <Subzone subs={getsubs(idx)} />
  //   </li>
  // ));

  const mapTreeData = (data) => {
    const result = data.map((item, index) => {
      return {
        title: item.name,
        key: item.path,
        // path: item.path,
        children: item.subs.map((sub, idx) => {
          return {
            title: sub.sname,
            key: sub.surl,
            rate: sub.rate,
          };
        })
      };
    })
    console.log('mapTreeDate result: ', result)
    return result;
  };


  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        <em>(Only video will be accepted)</em>
      </div>
      <aside>
        <h4>Files</h4>
        <Subzone substree={mapTreeData(props.substree)} />
      </aside>
    </section>
  );
}

export default Basic;
