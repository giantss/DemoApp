# DemoApp
### 一个快速浏览极光推送、第三方授权登陆分享、统计的react native demo

## 使用的依赖版本
    "jcore-react-native": "^1.2.2",
    "jpush-react-native": "^2.1.3",
    "janalytics-react-native": "^1.1.0",
    "jshare-react-native": "^1.1.0",

## demo效果图
# 图一
  ![图1](https://github.com/giantss/DemoApp/blob/master/res/res/IMG_2843.PNG)
# 图二
  ![图2](https://github.com/giantss/DemoApp/blob/master/res/res/IMG_2844.PNG)
# 图三
  ![图3](https://github.com/giantss/DemoApp/blob/master/res/res/IMG_2846.PNG)
## 使用注意事项
- 使用前提是你已经在极光申请了应用并获取到了AppKey。
- 替换项目中极光到AppKey为自己申请到AppKey。
- 关于分享授权登陆和分享需要去对应到平台申请AppKey，然后参考[点我查看文档](https://github.com/jpush/jshare-react-native)替换掉DemoApp中的一下第三方的配置信息。
- ios android两个平台的api所有不同，具体的请参考官方文档。

# 使用步骤
- `git clone https://github.com/giantss/DemoApp.git`
- `cd DemoApp/`
- `npm install`
- `react-native run-ios/run-android`

