interface CustomEventListener {
  (evt: CustomEvent): void,
}

// A window containing a DOM document; the document property points to the DOM document loaded in that window.
// (Taken from Typescript definitions)
declare interface Window extends EventTarget {
  addEventListener(type: string, listener: CustomEventListener, optionsOrUseCapture?: EventListenerOptionsOrUseCapture): void,
  addEventListener(type: ElementStyleChangeEventType, listener: ElementStyleChangeEventListener, optionsOrUseCapture?: EventListenerOptionsOrUseCapture): void,
  attachEvent?: (type: string, listener: CustomEventListener) => void,
  attachEvent?: (type: ElementStyleChangeEventType, listener: ElementStyleChangeEventListener) => void,
  detachEvent?: (type: string, listener: CustomEventListener) => void,
  detachEvent?: (type: ElementStyleChangeEventType, listener: ElementStyleChangeEventListener) => void,
  +document: Document,
  getComputedStyle(elt: Element, pseudoElt?: string | null): CSSStyleDeclaration,
  removeEventListener(type: string, listener: CustomEventListener, optionsOrUseCapture?: EventListenerOptionsOrUseCapture): void,
  removeEventListener(type: ElementStyleChangeEventType, listener: ElementStyleChangeEventListener, optionsOrUseCapture?: EventListenerOptionsOrUseCapture): void,
  [index: number]: Window,
}

declare var window: Window;
