import React, { useState } from "react";
import DraggerArea from "./DraggerArea";
import SubZone from "./Subzone";
import DownloadBtn from "./Download";

function DraggerZone(props) {

  const [treeData, setTreeData] = useState(props.substree);
  const [selectedSubs, setSelectedSubs] = useState();

  const handCheck = (checkedKeys, info) => {
    console.log("onChecked", checkedKeys, info);
    let checkedSubs = info.checkedNodes
      .map((item) => {
        if (!("subs" in item)) {
          return item.title.props.surl;
        }
      })
      .filter((item) => {
        return item !== undefined;
      });
    console.log("checkedSubs state:", checkedSubs);
    setSelectedSubs(checkedSubs);
  };

  const handDownloadBtnClick = (event) => {
    if (selectedSubs === 0 || selectedSubs === undefined) {
      console.log("请先选择要下载的字幕");
      alert("请先选择要下载的字幕");
    } else {
      console.log("click DownloadBtn, downloading: ", selectedSubs);
    }
  };

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
