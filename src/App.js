import React from "react";
import { Button } from 'antd';
import logo from "./logo.svg";
import "./App.css";
import DraggerItem from "./components/DraggerItem.js";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          选择视频文件或者文件夹，如果选择文件夹，会下载所有子目录下视频文件的字幕
        </p>

      </header>
          <DraggerItem />
          <Button type="primary">Button</Button>
    </div>
  );
}

export default App;
