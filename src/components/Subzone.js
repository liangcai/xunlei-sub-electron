import React from 'react';
import { Tree } from 'antd';

const { TreeNode } = Tree;

function Subzone(props) {
  // const subs = props.subs.map((sub) => (
  //   <li key={sub.sname}>
  //     {sub.rate} / {sub.sname}
  //   </li>
  // ));

  // return <ul>{subs}</ul>;
  const onSelect = (selectedKeys, info) => {
    console.log('onSelected', selectedKeys, info);
  };

  const onCheck = (checkedKeys, info) => {
    console.log('onChecked', checkedKeys, info);
  };

  return (
    <Tree 
      checkable
      defaultExpandedKeys={[]}
      defaultSelectedKeys={[]}
      defaultCheckedKeys={[]}
      onSelect={onSelect}
      onCheck={onCheck}
      treeData={props.substree}
      children={props.substree.subs}
    />
  );
};

export default Subzone;
