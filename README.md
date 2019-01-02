<h1 align="center">ReactRouletteSlot</h1>
<center>基于React的轮盘抽奖程序</center>
<div align="center">

[![](https://travis-ci.org/wZi/ReactRouletteSlot.svg?branch=master)](https://travis-ci.org/wZi/ReactRouletteSlot) [![codecov](https://codecov.io/gh/wZi/ReactRouletteSlot/branch/master/graph/badge.svg)](https://codecov.io/gh/wZi/ReactRouletteSlot)
[![Known Vulnerabilities](https://snyk.io/test/github/wZi/ReactRouletteSlot/badge.svg?targetFile=package.json)](https://snyk.io/test/github/wZi/ReactRouletteSlot?targetFile=package.json)
[![DEPENDENCIES](https://img.shields.io/david/wzi/ReactRouletteSlot.svg)](https://david-dm.org/wzi/ReactRouletteSlot)
[![DEVDEPENDENCIES](https://img.shields.io/david/dev/wzi/ReactRouletteSlot.svg)](https://david-dm.org/wzi/ReactRouletteSlot?type=dev)
[![npm package](https://img.shields.io/npm/v/react-roulette-slot.svg?style=flat-square)](https://www.npmjs.com/package/react-roulette-slot)
[![npm download](https://img.shields.io/npm/dt/react-roulette-slot.svg)](https://www.npmjs.com/package/react-roulette-slot)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/wZi/ReactRouletteSlot.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/wZi/ReactRouletteSlot/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/wZi/ReactRouletteSlot.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/wZi/ReactRouletteSlot/context:javascript)
[![size](https://img.badgesize.io/wZi/ReactRouletteSlot/master/dist/ReactRouletteSlot.min.js.svg?compression=gzip)](https://www.npmjs.com/package/react-roulette-slot)
[![](https://img.shields.io/npm/l/react-roulette-slot.svg?registry_uri=https%3A%2F%2Fregistry.npmjs.com)](https://www.npmjs.com/package/react-roulette-slot)
</div>
<center><img  width="250" src="https://raw.githubusercontent.com/wZi/wZi/gh-pages/images/demo.png" /></center>

---

## 项目介绍

## 📦 安装

```bash
npm install react-roulette-slot --save
yarn add react-roulette-slot --save
```

## 🔨 示例

```tsx
import APP from 'react-roulette-slot';
ReactDOM.render(<APP />, mountNode);
```

```tsx
const action = (cb) => {
    // 发出请求, 请求成功后,调cb.
    cb({ data: 1000 });
};
const data = const data = [
    { id: 1000, img: 'http://dummyimage.com/30x30', label: 'Larry' },
    { id: 1001, img: 'http://dummyimage.com/30x30', label: 'Joseph' },
    { id: 1003, img: 'http://dummyimage.com/30x30', label: 'Paul' },
    { id: 1004, img: 'http://dummyimage.com/30x30', label: 'Ronald' },
    { id: 1005, img: 'http://dummyimage.com/30x30', label: 'Helen' },
    { id: 1006, img: 'http://dummyimage.com/30x30', label: 'Maria' },
    { id: 1007, img: 'http://dummyimage.com/30x30', label: 'Mark' },
    { id: 1008, img: 'http://dummyimage.com/30x30', label: 'Mark' },
    { id: 1009, img: 'http://dummyimage.com/30x30', label: 'Carol' },
    { id: 1010, img: 'http://dummyimage.com/30x30', label: 'Ronald' },
    { id: 1011, img: 'http://dummyimage.com/30x30', label: 'Nancy' },
    { id: 1012, img: 'http://dummyimage.com/30x30', label: 'Michelle' },
];
const App = () => {
    return (
    <ReactRouletteSlot
        data={data}
        action={action}
        size={300}
    />
}
```

## ⌨️ 本地开发

```bash
$ git clone git@github.com:wZi/ReactRouletteSlot.git
$ cd ReactRouletteSlot
$ yarn
$ yarn dev
```

## 🔨 测试

```bash
$ yarn test
$ yarn test:w   ## 监听变化
$ yarn open     ## 查看代码覆盖率
```

## 💡 Props

```typescript
type ReactRouletteSlotProps = {
    // 抽奖数据
    data: ReactRouletteSlot.RouletteSlotData;
    // 每行个数
    row?: number;
    action: ActionType;
    // 宽跟高
    size?: number;
};
```

### data: ReactRouletteSlot.RouletteSlotData

抽奖数据,长度必须为偶数, 建议 12 个.

-   label: 名称或者 ReactElement
-   img: 图片地址
-   id: 商品 id

```jsx
// 数据格式
interface RouletteSlotDataItem {
    // 名称
    label: string | JSX.Element;
    // 图片
    img: string;
    // 商品 ID
    id: number;
}
type RouletteSlotData = RouletteSlotDataItem[];
```

### row: number

每行个数, 默认为 4

### action: ActionType

点击抽奖的触发的方法,  不在组件内限制请求方式.

-   data 为抽奖结果的 id
-   isWin 为是否中奖的标识符, 默认为 true

```typescript
type ActionType = (
    cb: ({ data, isWin }: { data: number | string; isWin?: boolean }) => void
) => void;
```
