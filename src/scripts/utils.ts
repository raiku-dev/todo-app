export function setErrDisplay(
	element: Element | null | undefined,
	message: string
): void {
	if (!element) return;

	if (message) {
		element.textContent = message;
		element.setAttribute('data-visible', '');
	} else {
		element.textContent = '';
		element.removeAttribute('data-visible');
	}
}
