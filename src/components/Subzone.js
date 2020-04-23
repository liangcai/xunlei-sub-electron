import React from 'react';
import { Tree, Rate, Badge } from 'antd';


const { TreeNode } = Tree;

function SubTree(props) {
  // const subs = props.subs.map((sub) => (
  //   <li key={sub.sname}>
  //     {sub.rate} / {sub.sname}
  //   </li>
  // ));

  // return <ul>{subs}</ul>;
  const onSelect = (selectedKeys, info) => {
    console.log('onSelected', selectedKeys, info);
  };

  function Sub(props) {
    let { rate, svote, title, onCheck } = props;
    return (
      <div>
      <span className="ant-rate-text text-hidden" title={title}>
        <Badge count={parseInt(svote)} style={{ backgroundColor: '#52c41a', width: 45 }} />
        <Rate disabled defaultValue={parseInt(rate)} />
        {title}
      </span>
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
      onCheck={props.onCheck}
    >
    {props.substree.map(data => (
      console.debug('data: ',data),
      <TreeNode 
        title={data.title} 
        key={data.key}
      >
        {data.subs.map(sub => (
          <TreeNode 
            title={<Sub {...sub} />}
            key={sub.key}
            // icon={<Icon {...sub} />}
          />
        ))}
      </TreeNode>
    ))}
    </Tree>
  );
};

const mapTreeData = (data) => {
  const result = data.map((item, index) => {
    return {
      title: item.name,
      key: item.fid,
      // fpath: item.path,
      subs: item.subs.map((sub, idx) => {
        return {
          title: sub.sname,
          fpath: item.path,
          key: sub.subid,
          // icon: <Rate disabled defaultValue={parseInt(sub.rate)} />,
          // icon: <div style={{width: 240}}><Badge count={parseInt(sub.svote)} style={{ backgroundColor: '#52c41a' }} /><Rate disabled defaultValue={parseInt(sub.rate)} /></div>,
          svote: sub.svote,
          surl: sub.surl,
          rate: sub.rate,
        };
      })
    };
  })
  console.debug('mapTreeDate result: ', result)
  return result;
};

function SubZone(props) {

  // const getsubs = (idx) => {
  //   if (props.subs && "subs" in props.subs[idx]) {
  //     return props.subs[idx].subs;
  //   } else {
  //     return [];
  //   }
  // };

  return (
    <aside>
    <h4>Files</h4>
    <SubTree substree={mapTreeData(props.substree)} onCheck={props.handCheck} />
  </aside>
  )
}

export default SubZone;
