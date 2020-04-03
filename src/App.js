import React from "react";
import logo from "./logo.svg";
import "./App.css";
import DraggerZone from "./components/DraggerZone.js";
import { Button } from "antd";
import { DownloadOutlined } from '@ant-design/icons';


function App() {
  return (
    <div className="App">
          <Header />
          <DraggerZone substree={subsTree} />
          <DownloadBtn />
          <Footer />
    </div>
  );
}

function Header() {
  return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          选择视频文件或者文件夹，如果选择文件夹，会下载所有子目录下视频文件的字幕
        </p>

      </header>
  )
}

function DownloadBtn() {
  return (
    <Button type="primary" icon={<DownloadOutlined />} size={"large"} block>下载</Button>
  )
}

function Footer() {
  return (
    <footer></footer>
  )
}
// const Files = [
//   {name: '寄生虫.Parasite.2019.KORAEN.1080p.BluRay.x264.mkv', path: '/home/cail/d/迅雷下载\寄生虫.Parasite.2019.KORAEN.1080p.BluRay.x264.mkv', size: 1111111},
// ]

const subsTree = [
    { 
      // eslint-disable-next-line
      "name": '寄生虫.Parasite.2019.KORAEN.1080p.BluRay.x264.mkv', path: '/home/cail/d/迅雷下载\寄生虫.Parasite.2019.KORAEN.1080p.BluRay.x264.mkv', 
      "size": 1111111,
      "message": "search success",
      "subs": [
        {
          "language": "未知语言",
          "rate": "3",
          "roffset": 6439746936,
          "scid": "DC0892FE42C95635562369A8B194D0B01FF763D4",
          "sname": "Parasite.2019.WEB-DLRip.2.18Gb.MegaPeer.srt",
          "surl": "http://subtitle.v.geilijiasu.com/DC/08/DC0892FE42C95635562369A8B194D0B01FF763D4.srt",
          "svote": 948
        },
        {
          "language": "未知语言",
          "rate": "1",
          "roffset": 6439746936,
          "scid": "DA5219F551B7F823F9C4B752CF59A3C7B771B959",
          "sname": "Parasite.2019.1080p.HDRip.X264.AC3-EVO.srt",
          "surl": "http://subtitle.v.geilijiasu.com/DA/52/DA5219F551B7F823F9C4B752CF59A3C7B771B959.srt",
          "svote": 7
        },
        {
          "language": "未知语言",
          "rate": "0",
          "roffset": 6439746936,
          "scid": "A30068F3164BDE0F8BC9CA75FACE889CF6F2DA92",
          "sname": "C%3A%5C%EC%98%81%ED%99%94%5C%E7%9B%97%E6%A2%A6%E7%A9%BA%E9%97%B4.Inception.2010.BD1080P.%E8%8B%B1%E5%9B%BD%E5%8F%8C%E8%AF%AD%E4%B8%AD%E8%8B%B1%E5%8F%8C%E5%AD%97.BTDX8%5CInception.2010_kor.smi",
          "surl": "http://subtitle.v.geilijiasu.com/A3/00/A30068F3164BDE0F8BC9CA75FACE889CF6F2DA92.smi",
          "svote": 2
        },
        {
          "language": "未知语言",
          "rate": "0",
          "roffset": 6439746936,
          "scid": "77AC34BF24C1E50BDDD7302643FCF69A646616B3",
          "sname": "Parasite.2019.KOREAN.1080p.BluRay.x264.DTS-HD.MA.7.1-FGT.srt",
          "surl": "http://subtitle.v.geilijiasu.com/77/AC/77AC34BF24C1E50BDDD7302643FCF69A646616B3.srt",
          "svote": 7
        },
        {
          "language": "�?体",
          "rate": "0",
          "roffset": 6439746936,
          "scid": "BF6AD0B41866DDEC4072BC96966439F98B04E58E",
          "sname": "寄生兽.srt",
          "surl": "http://subtitle.v.geilijiasu.com/BF/6A/BF6AD0B41866DDEC4072BC96966439F98B04E58E.srt",
          "svote": 7
        },
        {
          "language": "未知语言",
          "rate": "0",
          "roffset": 6439746936,
          "scid": "9DB8FFABDFFF715F3D8553D355163FFDF8E34A83",
          "sname": "F%3A%5C%5B%E9%9F%A9%E5%9B%BD%5D%20%E4%B8%AD%E5%9B%BD%E5%9F%8E%20%5B%E9%9F%A9%E8%AF%AD%E4%B8%AD%E5%AD%97%5DCoin.Locker.Girl.2015.KOREAN.1080p.WEBRip.x264-VXT%5B2.1GB%5Dmp4%5CCoin.Locker.Girl.2015.KOREAN.1080p.WEBRip.x264-VXT.chs.srt",
          "surl": "http://subtitle.v.geilijiasu.com/9D/B8/9DB8FFABDFFF715F3D8553D355163FFDF8E34A83.srt",
          "svote": 5
        },
        {
          "language": "未知语言",
          "rate": "0",
          "roffset": 6439746936,
          "scid": "CFE5726755878A86C4652525FB76648622DDEA5E",
          "sname": "Parasite.2019.WEB.srt",
          "surl": "http://subtitle.v.geilijiasu.com/CF/E5/CFE5726755878A86C4652525FB76648622DDEA5E.srt",
          "svote": 4
        }
      ]
    }
]

export default App;
