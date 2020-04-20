import React, {useState} from "react";
import { useDropzone } from "react-dropzone";
import SubZone from "./Subzone";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

function DownloadBtn() {
  return (
    <Button type="primary" icon={<DownloadOutlined />} size={"large"} block>
      下载
    </Button>
  );
}

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

  const [treeData, setTreeData] = useState(props.substree);
  const [selectedSubs, setSelectedSubs] = useState()

  const handCheck = (checkedKeys, info) => {
    console.log('onChecked', checkedKeys, info);
    let checkedSubs = info.checkedNodes.map((item) => {
      if (!('subs' in item)) {
        return item.title.props.surl;
      }
    }).filter((item)=>{
      return item != undefined;
    })
    console.log('checkedSubs state:', checkedSubs);
    setSelectedSubs(checkedSubs)
  };

  return (
    <section className="container">
    <DraggerArea />
    <SubZone substree={treeData} handCheck={handCheck}/>
    <DownloadBtn />
    </section>
  );
}



export default DraggerZone;
