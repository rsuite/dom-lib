# dom-lib   [![Travis][build-badge]][build] [![npm][npm-badge]][npm]

DOM helper library

## Install

```
npm install dom-lib --save
```

Example

```js
import { addClass } from 'dom-lib';

```

## Documnets

Class

```js
hasClass(node,className)
addClass(node,className)
removeClass(node,className)
```

Events

```js
on()
off()
onFocus()
```

Query

```js
canUseDOM
activeElement()
contains(context, node)
getContainer(container, defaultContainer)
getHeight(node, client)
getOffset(node)
getOffsetParent(node)
getPosition(node, offsetParent)
getScrollbarSize(recalc)
getWidth(node, client)
getWindow(node)
isOverflowing(container)
nodeName(node)
ownerDocument(componentOrElement)
ownerWindow(componentOrElement)
scrollLeft(node, val)
scrollTop(node, val)
```
Style

```js
getStyle(node, property)
removeStyle(node, property)
addStyle(node, property, value)
```


[build-badge]: https://travis-ci.org/rsuite/dom-lib.svg?branch=master
[build]: https://travis-ci.org/rsuite/dom-lib

[npm-badge]: https://badge.fury.io/js/dom-lib.svg
[npm]: http://badge.fury.io/js/dom-lib
