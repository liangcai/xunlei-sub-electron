import React from 'react';
import { Tree, Rate, Badge } from 'antd';


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

  function Title(props) {
    let { rate, svote, title } = props;
    return (
      <div>
        <Badge count={parseInt(svote)} style={{ backgroundColor: '#52c41a', width: 45 }} />
        <Rate disabled defaultValue={parseInt(rate)} />
        <span className="ant-rate-text text-hidden" title={title}>{title}</span>
      </div>
    )
  }

  return (
    <Tree 
      showIcon
      defaultExpandAll
      checkable
      defaultExpandedKeys={[]}
      defaultSelectedKeys={[]}
      defaultCheckedKeys={[]}
      onSelect={onSelect}
      onCheck={onCheck}
      // treeData={props.substree}
      // children={props.substree.subs}
    >
    {props.substree.map(data => (
      console.log('data: ',data),
      <TreeNode 
        title={data.title} 
        key={data.key}
      >
        {data.children.map(sub => (
          <TreeNode 
            title={<Title {...sub} />}
            key={sub.key}
            // icon={<Icon {...sub} />}
          />
        ))}
      </TreeNode>
    ))}
    </Tree>
  );
};

export default Subzone;
