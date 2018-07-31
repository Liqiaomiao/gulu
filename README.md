# gulu 一个Vue UI组件
[![Build Status](https://travis-ci.org/Liqiaomiao/gulu.svg?branch=master)](https://travis-ci.org/Liqiaomiao/gulu)

## 介绍
这是我在学习vue过程中做的一个ui框架，希望对你有用

## 开始使用
1. 安装

使用本框架前，请在css中开启border-box

```
*,*::before,*::after{box-sizeing:border-box;}
```
IE8 及以上浏览器都支持此样式

你还需要设置默认颜色等变量（后续会改为 scss 变量）
```
<style>
    :root {
        --button-height: 32px;
        --button-bg: white;
        --button-active-bg: #eee;
        --font-size: 14px;
        --border-radius: 4px;
        --color: #999;
        --border-color:#d9d9d9;
        --border-color-hover: #666;
    }
</style>
```
IE 15 及以上浏览器都支持此样式
2. 安装 gulu
 ```
 npm i -S gulu-test-1
  ```
3.引入gulu
```
import {Button,ButtonGroup,Icon} from 'gulu-test-1'
import 'gulu-test-1/dist/index.css'
export default {
  name: 'app',
  components: {
    HelloWorld,
      'g-button':Button
  }
}
```

## 文档

## 提问

## 变更记录

## 联系方式

## 贡献代码



