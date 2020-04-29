import React from 'react';
import { Tree, Rate, Badge } from 'antd';


const { TreeNode } = Tree;

function SubTree(props) {

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
    props.setSelectedSubs(checkedSubs);
  };

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
      defaultExpandAll  //只在第一次渲染时有用.
      checkable
      // defaultExpandedKeys={[]}
      defaultSelectedKeys={[]}
      defaultCheckedKeys={[]}
      onSelect={onSelect}
      onCheck={handCheck}
    >
    {props.substree.map(data => (
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
      key: index.toString(),
      subs: item.subs.map((sub, idx) => {
        return {
          title: sub.sname,
          fpath: item.fpath,
          // icon: <Rate disabled defaultValue={parseInt(sub.rate)} />,
          // icon: <div style={{width: 240}}><Badge count={parseInt(sub.svote)} style={{ backgroundColor: '#52c41a' }} /><Rate disabled defaultValue={parseInt(sub.rate)} /></div>,
          svote: sub.svote,
          surl: sub.surl,
          rate: sub.rate,
          key: index.toString() + "-" + idx.toString(),
        };
      })
    };
  })
  console.debug('mapTreeDate result: ', result)
  return result;
};

function SubZone(props) {
  if(Array.isArray(props.substree) && props.substree.length ===0) {
    return (<aside></aside>);
  };
  
  return (
    <aside>
    <h4>视频文件列表</h4>
    <SubTree substree={mapTreeData(props.substree)} setSelectedSubs={props.setSelectedSubs} />
  </aside>
  )
}

export default SubZone;
