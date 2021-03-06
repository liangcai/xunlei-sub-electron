import React from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import qs from "qs";

export default function DraggerArea(props) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "video/*, .mkv, .rmvb, .avi",
    onDrop: handonDrop,
  });

  const getTreeData = async (files) => {
    return Promise.all(
      files.map((file) => {
        return querySub(file);
      })
    );
  };

  async function handonDrop(acceptedFiles) {
    getTreeData(acceptedFiles).then((result) => {
      console.log("treedata result: ", result);
      props.setTreeData(result);
    });
  }

  const querySub = async (file) => {
    console.log("query sub from python api, arg: ", file.path);
    const data = {
      fpath:
        file.path,
    };
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url: "http://127.0.0.1:5000/api/subs",
    };
    return axios(options).then((res) => {
      if (res.data.status === '0000') {
        console.log('get sub exception: ', res.data.message)
      } else {
        console.log("get subs status: ", res.data.message, "data:", res.data);
      }
      res.data.fpath = file.path;
      res.data.name = file.name;
      res.data.size = file.size;
      return res.data;
    });
  };

  return (
    <div {...getRootProps({ className: "dropzone" })}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
      <em>(Only video will be accepted)</em>
    </div>
  );
}
