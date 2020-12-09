Observe Element style change
============================

Dispatches custom ElementStyleChangeEvent when element styles change.

[Browsers supported](https://github.com/browserslist/browserslist): `defaults, > 0.1%`

When this could be useful?
--------------------------

When no attribute mutation can be observed but style definition change, e.g. on resize events when `@media` style declarations kick in and you need to react upon the change.

Changes are dispatched when styles change on these events:

- `load`
- `resize`

> *Tip:* Use [attitude/zoom-change.js](https://github.com/attitude/zoom-change.js) to dispatcch zoom change events.


API
---

```js
// @flow

(function(window: Window) {
  const element: HTMLElement = document.getElementById('comment-box');
  const listener: ElementStyleChangeEventListener = function (event: ElementStyleChangeEvent) {
    console.log(event.cssText)
  }

  window.observeElementStyleChange(element: HTMLElement, listener: ElementStyleChangeEventListener)
}(window))
```



TODO:
-----

- [ ] Keep previous `cssText` and dispatch event only when strings don't match
- [ ] disconenctElementStyleChange()

. . .

✨ Enjoy!

Martin
