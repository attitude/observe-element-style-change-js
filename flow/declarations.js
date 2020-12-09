type ElementStyleChangeEventType = 'elementtypestylechange'

declare class ElementStyleChangeEvent extends Event {
  constructor(type: ElementStyleChangeEventType, eventInitDict?: CustomEvent$Init): void,
  detail: { cssText: ?string },
}

type ElementStyleChangeEventHandler = (event: ElementStyleChangeEvent) => mixed
type ElementStyleChangeEventListener = { handleEvent: ElementStyleChangeEventHandler, ... } | ElementStyleChangeEventHandler

type ObserveElementStyleChange = (element: ?HTMLElement, listener: ?ElementStyleChangeEventListener) => void
type DisconnectElementStyleChange = (element: ?HTMLElement, listener: ?ElementStyleChangeEventListener) => void

declare var observeElementStyleChange: ObserveElementStyleChange
declare var disconnectElementStyleChange: DisconnectElementStyleChange
