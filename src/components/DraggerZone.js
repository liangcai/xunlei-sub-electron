import React, { useState } from "react";
import DraggerArea from "./DraggerArea";
import SubZone from "./Subzone";
import {DownloadBtn, MyIframe} from "./Download";
import FileDownload from "js-file-download";
import Axios from "axios";
import qs from "qs";

function DraggerZone(props) {

  const [treeData, setTreeData] = useState([]);
  const [selectedSubs, setSelectedSubs] = useState();

  const handCheck = (checkedKeys, info) => {
    console.log("onChecked", checkedKeys, info);
    let checkedSubs = info.checkedNodes
      .map((item) => {
        if (!("children" in item)) {
          return {fpath: item.title.props.fpath, surl: item.title.props.surl, key: item.key};
        }
      })
      .filter((surl) => {
        return surl !== undefined;
      });
    console.log("checkedSubs state:", checkedSubs);
    setSelectedSubs(checkedSubs);
  };

  const handDownloadBtnClick = (event) => {
    if (selectedSubs === 0 || selectedSubs === undefined) {
      console.log("请先选择要下载的字幕");
      alert("请先选择要下载的字幕");
    } else {
      selectedSubs.map(item => {
      let sname = item.fpath.replace(/^.*[\\\/]/, '').replace(/^\.[^\.]*$/, '');
      let sext = item.surl.replace(/^.*\./, '');
      let sfullname = sname + "." + sext
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
          })
      })
    }
    // console.log("handleDownloadBtnClick");
    // let url = "http://192.168.1.182:5000/api/downsub?&surl=http://subtitle.v.geilijiasu.com/BF/6A/BF6AD0B41866DDEC4072BC96966439F98B04E58E.srt&sname=undefined.srt";
    // return <MyIframe iframeSrc={url} />; 
  };


  return (
    <section className="container">
      <DraggerArea setTreeData={setTreeData} />
      <SubZone substree={treeData} handCheck={handCheck} />
      <DownloadBtn
        handDownloadBtnClick={handDownloadBtnClick}
        selectedSubs={selectedSubs}
      />
    </section>
  );
}

export default DraggerZone;
