import React from "react";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import FileDownload from "js-file-download";
import Axios from "axios";
import qs from "qs";


function DownloadBtn(props) {

  const handDownloadBtnClick = (event) => {
    if (props.selectedSubs === 0 || props.selectedSubs === undefined) {
      console.log("请先选择要下载的字幕");
      alert("请先选择要下载的字幕");
    } else {
      props.selectedSubs.map(item => {
      let sname = item.fpath.replace(/^.*[\\\/]/, '').replace(/^\.[^\.]*$/, '');
      let sext = item.surl.replace(/^.*\./, '');
      let sfullname = sname + "." + sext;
      let url = "http://192.168.1.182:5000/api/downsub";
      let data = {
        surl: item.surl,
        sname: sfullname
      }
      console.log("download, url:", url, "data:", qs.stringify(data));
        Axios(
          {
            url:url, 
            method: 'POST',
            data: qs.stringify(data),
            headers: {'content-type': 'application/x-www-form-urlencoded'}
          })
          .then((res) => {
            console.log(res.headers);
            let filename = decodeURI(res.headers['content-disposition'].match(/filename=(.*)/)[1]);
            // let filename = sfullname;
            FileDownload(res.data, filename);
          });
          return true;
      })
    };
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