import React, { useState } from "react";
import DraggerArea from "./DraggerArea";
import SubZone from "./Subzone";
import DownloadBtn from "./Download";

function DraggerZone(props) {

  const [treeData, setTreeData] = useState([]);
  const [selectedSubs, setSelectedSubs] = useState();

  return (
    <section className="container">
      <DraggerArea setTreeData={setTreeData} />
      <SubZone substree={treeData} setSelectedSubs={setSelectedSubs} />
      <DownloadBtn selectedSubs={selectedSubs}
      />
    </section>
  );
}

export default DraggerZone;
