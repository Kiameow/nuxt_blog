---
title: "webpack runtime 对 cjs 模块的打包原理"
description: "你是否好奇require和module.exports是如何工作的？"
date: "2023-04-23"
banner:
  src: "/images/default.jpg"
  alt: "image description"
  caption: ""
categories:
  - "工具"
  - "教程"
keywords:
  - "前端工程化"
---

## 过程复现
在正式讲解原理之前，你可以先在本地尝试打包几个简单的 cjs 模块，并观察打包后的结果。

首先，我们创建两个模块文件，内容如下：

```javascript
// console.js
exports.myConsole = function console(x) {
    console.log(x);
}

exports.myWarn = function myWarn(x) {
    console.warn(x);
}
```

```javascript
// sum.js
const { myWarn, console } = require('./console');

module.exports = function sum(a, b) {
    myConsole(a + b);
    myWarn(a + b);
}
```

接着，创建一个入口文件，内容如下：

```javascript
// index.js
const sum = require('./sum');
const sum2 = require('./sum');

sum(2, 3);
sum2(1, 8);
```

你可能会觉得这些模块的写法比较凌乱，但其实是为了后续打包的结果能够展示尽可能多的情况。最后，创建一个打包脚本，内容如下：

```javascript
// 需要先安装webpack依赖(`npm install webpack`)
const { webpack } = require("webpack");

const w = webpack({
        entry: "./index.js",
        mode: "none",
        output: {
            iife: false,
            pathinfo: 'verbose'
        },
    })

w.run((err, stats) => {})
```

ok, 现在执行 `node build.js`， 你可以看见产生了一个dist目录，里面包含了打包后的文件（名字通常为`main.js`） 

打开`main.js`，你会看到如下内容：

```javascript
/******/ var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/*!****************!*\
  !*** ./sum.js ***!
  \****************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 3:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { myWarn, console } = __webpack_require__(/*! ./console */ 2);

module.exports = function sum(a, b) {
    myConsole(a + b);
    myWarn(a + b);
}

/***/ }),
/* 2 */
/*!********************!*\
  !*** ./console.js ***!
  \********************/
/*! default exports */
/*! export console [provided] [no usage info] [missing usage info prevents renaming] */
/*! export myWarn [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

exports.console = function myConsole(x) {
    console.log(x);
}

exports.myWarn = function myWarn(x) {
    console.warn(x);
}

/***/ })
/******/ ]);
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__ */
const sum = __webpack_require__(/*! ./sum */ 1);
const sum2 = __webpack_require__(/*! ./sum */ 1);

sum(2, 3);
sum2(1, 8);

```

## 原理解析

不需要感到恐慌，我们一一来拆解其中的内容。

1. 首先，webpack会将所有模块都打包到一个名为`__webpack_modules__`的数组中，数组的下标就是模块的id（0下标没有被使用）, 数组的每一项都是一个副作用函数。你会发现，函数的内容其实就是每个模块文件中的内容，只是像`require`这样的关键字被替换成了`__webpack_require__`。

让我们再来观察函数的参数，参数的数量似乎不是统一的，但最多的情况下，函数的第一个参数是`module`（或者带有`__unused`前缀），第二个参数是`module.exports`（或者带有`__unused`前缀），第三个参数是`__webpack_require__`。

为什么数量不一呢，因为webpack在打包的时候会进行优化，如果模块没有使用到相应的关键字，就会剔除其对应的参数。比如`console.js`中没有用到`require`，webpack便会将第三个参数`__webpack_require__`移除。

至于`__unused`前缀，则完全是js位置参数的原因，必须要有一个占位符。

2. `__webpack_module_cache__`是一个对象，用于缓存模块，当模块被多次引入时，webpack会直接从缓存中取出模块的导出对象，而不是重新执行模块。

3. `__webpack_require__`也就是`require`函数的webpack实现，它接收模块的id作为参数，然后返回模块的导出对象。过程很简单，先检查缓存，如果缓存中没有该模块的导出对象，则创建一个新的模块对象，这里的新建对象比较有意思，`var module = __webpack_module_cache__[moduleId] = {	exports: {}}`是一个连等的形式，这在模块化系统中很常见，由于js中的对象赋值是引用传递，这样的形式使得`module`和`__webpack_module_cache__[moduleId]`缓存对象指向同一个对象。  

后续`__webpack_modules__[moduleId](module, module.exports, __webpack_require__);`执行了模块函数，`module`被传入了，模块函数的副作用便是将模块的导出对象赋值给`module.exports`， 那么与此同时，缓存对象的exports属性也被赋值了，因为它们指向相同的对象。

最后，返回`module.exports`，也就是模块中导出的函数、值、对象等等。

`const sum = __webpack_require__(/*! ./sum */ 1); ` 

此处`sum`接收了导出的函数

```javascript
function sum(a, b) {
    myConsole(a + b);
    myWarn(a + b);
}
```

这就是所有的流程啦！

## 彩蛋
我们发现，模块一旦导出，就会被缓存下来，那么也就是说，如果你导出了一个对象，那么你在所有文件中使用的该对象都是同一个对象，这也就意味着，如果你修改了这个对象，那么其他文件中也会受到影响。

可以尝试新增一个`obj.js`模块，其中导出了一个对象：

```javascript
exports.obj = {
    data: 1
}
```

然后在`sum.js`和`index.js`中引入该模块，并修改`obj`的属性：

```javascript
// sum.js
const { myWarn, myConsole } = require('./console');
const { obj } = require('./obj');

module.exports = function sum(a, b) {
    myConsole(a + b);
    myWarn(a + b);
    obj.data = a + b;
}
```

```javascript
// index.js
const sum = require('./sum');
const sum2 = require('./sum');
const { obj } = require('./obj');

console.log(obj);
sum(2, 3);
console.log(obj);
sum2(1, 8);
console.log(obj);
```

其实，webpack中的模块实现和node中的基本一致，所以为了快速验证，你可以直接在node中运行`index.js`，然后观察输出结果。   
![输出结果](/images/2401-01.png)

可以看到，当`obj`的属性在`sum`模块中被修改后，index.js中的`obj`也被修改了。也就是说`obj`的状态是全局的。




