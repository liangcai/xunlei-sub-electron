import React from "react";
import { Button, Alert } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

export default function DownloadBtn(props) {
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