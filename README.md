# dom-lib [![Travis][build-badge]][build] [![npm][npm-badge]][npm]

DOM helper library

## 安装

```
npm install dom-lib --save
```

## 示例

```js
import { addClass } from 'dom-lib';
```

## API

Class

```typescript
hasClass: (node: HTMLElement, className: string) => boolean;
addClass: (node: HTMLElement, className: string) => HTMLElement;
removeClass: (node: HTMLElement, className: string) => HTMLElement;
toggleClass: (node: HTMLElement, className: string) => HTMLElement;
```

Style

```typescript
getStyle: (node: HTMLElement, property: string) => string;
getStyle: (node: HTMLElement) => Object;

removeStyle: (node: HTMLElement, property: string) => void;
removeStyle: (node: HTMLElement, propertys: Array<string>) => void;

addStyle: (node: HTMLElement, property: string, value: string) => void;
addStyle: (node: HTMLElement, style: Object) => void;
```

Events

```typescript
on: (target: HTMLElement, eventName: string, listener: Function, capture: boolean = false) => {
  off: Function;
};
off: (target: HTMLElement, eventName: string, listener: Function, capture: boolean = false) =>
  void;
```

Query

```typescript
activeElement: () => HTMLElement;
getHeight: (node: HTMLElement, client: HTMLElement) => number;
getWidth: (node: HTMLElement, client: HTMLElement) => number;
getOffset: (node: HTMLElement) => Object;
getOffsetParent: (node: HTMLElement) => Object;
getPosition: (node: HTMLElement, offsetParent) => Object;
getWindow: (node: HTMLElement) => String;
nodeName: (node: HTMLElement) => String;
ownerDocument: (node: HTMLElement) => Object;
ownerWindow: (node: HTMLElement) => Object;
contains: (context: HTMLElement, node: HTMLElement) => boolean;
scrollLeft: (node: HTMLElement) => number;
scrollTop: (node: HTMLElement) => number;
```

Utils

```typescript
scrollLeft: (node: HTMLElement, val: number) => void;
scrollTop: (node: HTMLElement, val: number) => void;
```

[build-badge]: https://travis-ci.org/rsuite/dom-lib.svg?branch=master
[build]: https://travis-ci.org/rsuite/dom-lib
[npm-badge]: https://badge.fury.io/js/dom-lib.svg
[npm]: http://badge.fury.io/js/dom-lib
