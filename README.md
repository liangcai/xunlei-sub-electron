使用create-react-app 和 flask开发的electron程序

字幕下载程序，字幕下载功能利用了 https://github.com/weaming/thunder-subtitle

界面
![运行截图](https://raw.githubusercontent.com/liangcai/xunlei-sub-electron/master/screenshot.png)

## Available Scripts
In the project directory, you can run:

### Use in dev  
1. python and pip requirement
```
python -m venv .venv
source .venv/bin/activate       # win: .venv\Scripts\activate.cmd
pip install -r requirement.txt
```

2. node and  npm requirement
```
npm install         # win: npm install -no-optional
npm start           
```

3. electron
```
npm i -g electron 
npm run dev
```


### package  打包
#### windows
```
npm run package:win
```
#### mac
```
npm run package:mac
```
#### linux
```
npm run package:linux
```