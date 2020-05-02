import React from "react";
import { Button, message } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const ipcRenderer = window.electron.ipcRenderer;

function DownloadBtn(props) {
  const key = "downloadsub";
  const handDownloadBtnClick = (event) => {
    if (props.selectedSubs === 0 || props.selectedSubs === undefined) {
      alert("请先选择要下载的字幕");
    } else {
      downloadSubs(props.selectedSubs)
        .then(() => {
          message.success({content: '开始下载字幕', key, duration: 3})
        })
    }
  };

  const downloadSubs = async (items) => {
      const files = items.map((item) => {
        let sname = item.fpath
          .replace(/^.*[\\\/]/, "")
          .replace(/\.[^\.]*$/, "");
        let sext = item.surl.replace(/^.*\./, "");
        let savein = item.fpath.replace(/[^/]*?$/, "");
        let sfullname = sname + "." + sext;

        console.log(`savein: ${savein}, sname: ${sname},download url: ${item.surl}`);
        return {url: item.surl, properties: { directory: savein, filename: sfullname }}
      })

      console.log('files: ', files);

      ipcRenderer.send("download", files);

      ipcRenderer.on("download complete", (event) => {
        console.log(`下载完成`); // Full file path
        message.loading({ content: `下载完成` });
      });
  };

  return (
    <Button
      type="primary"
      shape="round"
      icon={<DownloadOutlined />}
      size={"large"}
      block
      onClick={handDownloadBtnClick}
    >
      下载
    </Button>
  );
}

export default DownloadBtn;
