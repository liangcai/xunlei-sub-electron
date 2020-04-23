import React, { useState } from "react";
import DraggerArea from "./DraggerArea";
import SubZone from "./Subzone";
import DownloadBtn from "./Download";
import Axios from "axios";

function DraggerZone(props) {

  const [treeData, setTreeData] = useState(props.substree);
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
      // console.log("click DownloadBtn, downloading: ", selectedSubs);
      selectedSubs.map(item => {
        downloadSub(item);
      })
    }
  };

  const downloadSub = (item) => {
    console.log("download, url:", item.surl, "savedpath: ", item.fpath);
  }

  return (
    <section className="container">
      <DraggerArea />
      <SubZone substree={treeData} handCheck={handCheck} />
      <DownloadBtn
        handDownloadBtnClick={handDownloadBtnClick}
        selectedSubs={selectedSubs}
      />
    </section>
  );
}

export default DraggerZone;
