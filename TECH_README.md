# 技术文档

## 代码优化方案

```js
module.exports ={
  optimization:{
    splitChunks:{
      //按需加载时最大并行数
      maxAsyncRequest:[number],
      // entry point最大并行数
      maxInitialRequest:[number],
      // 代码拆分前必须共享的chunks数量
      minChunks:[number],
      // 拆分代码的最小bytes
      minSize:[number],
      // webpack尽量将代码拆成最小块，但不一定成功
      maxSize:[number],
   
      cacheGroups:{
      //cacheGroup的配置是对上一级的配置但是test, priority， reuseExistingChunk则只能
      // 在这一级配置
        priority:[number], //
        reuseExistingChunk:[boolean],
        type:["function/RegExp/string"],
        test:["function (module, chunk) => boolean RegExp string"],
        filename:"string/function",
        enforce:[boolean],
        idHint:["string"]
      },
    }
  }
}
```

### 首屏渲染的优化方案

提到前端应用，很多客户就觉得这玩意不就是一个写页面的吗？能有多难，感觉就是没有人工智能、区块链听着有技术含量。我通常告诉对方好的前端和差的前端无论是技术难度、应用交互还是和代码质量都是天壤之别。某某客户就说了，你就直接告诉我差在哪了？我举了日常案例，比如你去某某餐厅吃饭是不是经常遇到一种情形。你肚子都快饿坏了，服务员让你去扫桌上的二维码点餐，手机白屏了半天等了很久，终于出现了一个卡壳的小程序。这就是非常典型的没有做首屏渲染的烂前端。且不说交互体验、用户粘性，网速要是差点，能不能打的开页面还两说。对于一个前端工程师出身的人来说，那种饿着肚子看进度条的感觉，真的，服务员你还是放我回去debug吧。

为什么会出现这种情况呢？第一，目前业内流行SPA开发单页应用，但是如果不做首屏渲染优化就会导致所有的代码一起加载，即使做了代码压缩大小也在2~3M起步。第二，代码没有做压缩，也就是说如果我们第一步那个搓架构光代码加载就是4~6M。第三，应用层通信协议仍然是HTTP1.1协议。由于HTTP/1.1对TCP管道支持数最大是6~8个，超过这个数，那剩下的静态资源就只能在后面排队。如果是餐饮业这种大量餐单图片加载的，那自然就会看到一张张图片慢慢加载进来咯。传统的做法是买CDN服务，但是你想想那些小餐厅谁会掏钱买CDN？显然，把传销币卖给他们的成功率会更高。

很多企业在被SPA坑过之后转回了传统的服务端渲染，比如JSP老爷叔党和JavaScript React、Vue、Angular服务端框架。之前我们也是采取了这种方案，但是在实践过程中发现了一个问题那就是目前所有的服务端框架都太重，在打包时非常的不友好。如果是自己的git私有服务器打包时间往往超过5分钟，如果是dockerhub、jinkins这种墙外的服务，往往打包半个小时，能不能成功还得看祖上显灵。这个对于DevOps敏捷开发来说是非常糟糕的结果。所以除非是有强烈的SEO需求的应用，基本上不会再去做服务端渲染技术选型。

我们前端应用开发遵循的原则是前端就干前端的事，无论出于安全性还是代码的轻量性考虑，重量型业务逻辑代码不准放到前端去做，觉得自己牛逼滚去撸node.js去。剩下的无论是并发问题、性能瓶颈问题。还是安全防护问题，那是后端和运维的锅，越俎代庖的结果就是什么事都干不好。

既然知道了病因所在，那么如何对症下药就是体现一个工程师价值的地方了。

### Entry Point优化
由于现代化SPA应用都会通过使用到所谓前端三大框架以及周边生态库，之后使用打包工具进行打包，我们以webpack为例，如果我们指定了entry point为index.js, 如果我们在index.js 中直接编写代码或者，import 某个库，如：

```js
import * as React from "react";
import * as ReactDOM from "react-dom";
import App from './app';

ReactDOM.render(
  <App />,document.getElementById("root")
);
```

恭喜您，后面的优化你都不用看了，您的代码直接被大规模加载进来了。因为这在首屏渲染时加载的不仅是`React`、`ReactDOM`两个库，还有`node_modules`里面所有相关的库类代码。所以`entry point`文件里面要避免编写任何代码，而是通过动态导入的方式引入相关文件，比如，我们可以将上面的代码放入，`reactinit.js`文件中，然后在`entry point`中：

```js
import('./reactinit.js');
```

### JS代码的切割
### CSS代码的切割




