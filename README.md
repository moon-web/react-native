项目初始化
SVN导出项目后，使用编辑器打开 
首先是安装依赖包
npm install 
运行羡慕
react-native run-android

图片适配

开发一款应用少不了的需要用到图标。无论是Android还是iOS，现在不同分辨率的设备越来越多，我们希望这些图标能够适配不同分辨率的设备。为此我们需要为每个图标提供1x、2x、3x三种大小的尺寸，React Native会根据屏幕的分辨率来动态的选择显示不同尺寸的图片。比如：在img目录下有如下三种尺寸的check.png

└── img
    ├── check.png
    ├── check@2x.png
    └── check@3x.png

那么我们就可以通过下面的方式来使用check.png：
<Image source={require('./img/check.png')} />

提示：我们在使用具有不同分辨率的图标时，一定要引用标准分辨率的图片如require('./img/check.png')，如果我们这样写require('./img/check@2x.png')，那么应用在不同分辨率的设备上都只会显示check@2x.png图片，也就无法达到图片自适配的效果。