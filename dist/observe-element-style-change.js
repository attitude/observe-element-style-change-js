"use strict";

/**
 * @Author: Martin Adamko <martinadamko.sk@gmail.com>
 * @Date: 2020-11-28T22:11:70+01:00
 * @Copyright: Martin Adamko
 * 
**/

/* eslint-disable no-console */
var elementStyleChangeEventType = 'elementtypestylechange'; // eslint-disable-next-line no-unused-vars

var observeElementStyleChange = function ObserveElementStyleChangeNoop(element, listener) {
  '';
}; // eslint-disable-next-line no-unused-vars


var disconnectElementStyleChange = function DisconnectElementStyleChangeNoop(element, listener) {
  '';
};

(function () {
  var anonymousElement = window.document.createElement('div');
  anonymousElement.style.left = '-9999px';
  anonymousElement.style.position = 'absolute';
  anonymousElement.style.top = '-9999px';

  if (!anonymousElement || !window.document.body) {
    return;
  }

  window.document.body.appendChild(anonymousElement); // Source: https://bugzilla.mozilla.org/show_bug.cgi?id=137687#c7

  function getComputedStyleCssText(cssStyleDeclaration) {
    var cssText;

    if (cssStyleDeclaration.cssText !== '') {
      return cssStyleDeclaration.cssText;
    }

    cssText = '';

    for (var i = 0; i < cssStyleDeclaration.length; i++) {
      cssText += cssStyleDeclaration[i] + ': ' + cssStyleDeclaration.getPropertyValue(cssStyleDeclaration[i]) + '; ';
    }

    return cssText;
  }

  function getElementComputedStyleCSSText(element) {
    if (!anonymousElement.contains(element)) {
      anonymousElement.appendChild(element);
    }

    var cssStyleDeclaration = getComputedStyle(element);
    var cssText = getComputedStyleCssText(cssStyleDeclaration);
    return cssText.replace(/;\s+/g, ';\n');
  }

  var watches = [];

  function dispatchElementStyleChange(element) {
    var event = new CustomEvent(elementStyleChangeEventType, {
      bubbles: true,
      cancelable: false,
      detail: {
        cssText: getElementComputedStyleCSSText(element)
      }
    });
    element.dispatchEvent(event);
  }

  observeElementStyleChange = function observeElementStyleChange(element, listener) {
    if (!element || !listener) {
      return;
    }

    watches.push(element);
    window.addEventListener(elementStyleChangeEventType, listener);
  };

  disconnectElementStyleChange = function disconnectElementStyleChange(element, listener) {
    // TODO:
    console.error('Not implemented');
  };

  window.addEventListener('resize', function (event) {
    watches.forEach(function (element) {
      dispatchElementStyleChange(element);
    });
  });
  window.addEventListener('load', function (event) {
    watches.forEach(function (element) {
      dispatchElementStyleChange(element);
    });
  });
})();
