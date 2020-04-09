import React from "react";

function Subzone(props) {
  const subs = props.subs.map((sub) => (
    <li key={sub.sname}>
      {sub.rate} / {sub.sname}
    </li>
  ));

  return <ul>{subs}</ul>;
}

export default Subzone;
