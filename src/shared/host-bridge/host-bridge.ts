type HostEvent =
	| { type: 'WIDGET_READY'; version: string }
	| { type: 'WIDGET_NAVIGATED'; hash: string }

export function postToHost(event: HostEvent, targetOrigin = '*') {
	if (window.parent !== window) window.parent.postMessage(event, targetOrigin)
}
