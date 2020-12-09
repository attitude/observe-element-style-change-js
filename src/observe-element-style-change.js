/**
 * @Author: Martin Adamko <martinadamko.sk@gmail.com>
 * @Date: 2020-11-28T22:11:70+01:00
 * @Copyright: Martin Adamko
 * @flow
**/

/* eslint-disable no-console */

const elementStyleChangeEventType = 'elementtypestylechange'

// eslint-disable-next-line no-unused-vars
let observeElementStyleChange: ObserveElementStyleChange = function ObserveElementStyleChangeNoop (element: *, listener: *) { '' }
// eslint-disable-next-line no-unused-vars
let disconnectElementStyleChange: DisconnectElementStyleChange = function DisconnectElementStyleChangeNoop (element: *, listener: *) { '' };

(function () {
  const anonymousElement = window.document.createElement('div')

  anonymousElement.style.left = '-9999px'
  anonymousElement.style.position = 'absolute'
  anonymousElement.style.top = '-9999px'

  if (!anonymousElement || !window.document.body) {
    return
  }

  window.document.body.appendChild(anonymousElement)

  // Source: https://bugzilla.mozilla.org/show_bug.cgi?id=137687#c7
  function getComputedStyleCssText (cssStyleDeclaration: CSSStyleDeclaration): string {
    let cssText

    if (cssStyleDeclaration.cssText !== '') {
      return cssStyleDeclaration.cssText
    }

    cssText = ''

    for (let i = 0; i < cssStyleDeclaration.length; i++) {
      cssText += cssStyleDeclaration[i] + ': ' + cssStyleDeclaration.getPropertyValue(cssStyleDeclaration[i]) + '; '
    }

    return cssText
  }

  function getElementComputedStyleCSSText (element: HTMLElement): ?string {
    if (!anonymousElement.contains(element)) {
      anonymousElement.appendChild(element)
    }

    const cssStyleDeclaration = getComputedStyle(element)
    const cssText = getComputedStyleCssText(cssStyleDeclaration)

    return cssText.replace(/;\s+/g, ';\n')
  }

  const watches: HTMLElement[] = []

  function dispatchElementStyleChange (element: HTMLElement) {
    const event = new CustomEvent(elementStyleChangeEventType, {
      bubbles: true,
      cancelable: false,
      detail: { cssText: getElementComputedStyleCSSText(element) },
    })

    element.dispatchEvent(event)
  }

  observeElementStyleChange = function observeElementStyleChange (element: *, listener: *) {
    if (!element || !listener) {
      return
    }

    watches.push(element)

    window.addEventListener(elementStyleChangeEventType, listener)
  }

  disconnectElementStyleChange = function disconnectElementStyleChange (element: *, listener: *) {
    // TODO:
    console.error('Not implemented')
  }

  window.addEventListener('resize', (event: Event) => {
    watches.forEach((element: *) => {
      dispatchElementStyleChange(element)
    })
  })

  window.addEventListener('load', (event: Event) => {
    watches.forEach((element: *) => {
      dispatchElementStyleChange(element)
    })
  })
}())
