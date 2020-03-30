import React from 'react';
import { Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const DraggerItem = () => {

  const { Dragger } = Upload;
  
  const props = {
    name: "file",
    multiple: true,
    action: "",
    onChange(info) {
      console.log('onChange info:', info);
    },
    beforeUpload(file){
      console.log('beforeUpload', file.name);
    },
    // onStart: (file) => {
    //   console.log('onStart', file.name);
    //   // this.refs.inner.abort(file);
    // },
    onSuccess(ret, file) {
      console.log('onSuccess', ret, file.name);
    },
    onProgress(step, file) {
      console.log('onProgress', Math.round(step.percent), file.name);
    },
    onError(err) {
      console.log('onError', err);
    },
    customRequest({
      action,
      data,
      file,
      filename,
      headers,
      onError,
      onProgress,
      onSuccess,
      withCredentials,
    }) {
      console.log('customRequest');
    }
  };

  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">支持单文件和多文件拖拽</p>
    </Dragger>
  );
}

export default DraggerItem;