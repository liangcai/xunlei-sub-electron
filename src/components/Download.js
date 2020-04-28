import React from "react";
import { Button, Alert } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

function DownloadBtn(props) {
  return (
    <Button
      type="primary"
      shape="round"
      icon={<DownloadOutlined />}
      size={"large"}
      block
      onClick={props.handDownloadBtnClick}
    >
      下载
    </Button>
  );
}

function MyIframe(props) {
  console.log("myIframe, src:", props.iframeSrc);
  return (
    <div style={{display: 'none'}}>
      <iframe src={props.iframeSrc} />
    </div>
  )
}

export {DownloadBtn, MyIframe}