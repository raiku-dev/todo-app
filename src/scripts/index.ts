import { AuthService } from "../backend/AuthService";

const form = document.querySelector('form');
const errDisplay = form?.querySelector('.err');

form?.addEventListener('submit', (e) => {
	e.preventDefault();

	const { email, password } = Object.fromEntries(new FormData(form));

	if (typeof email !== "string" || typeof password !== "string") {
		throw new Error("Invalid form data");
	}

	const sessionTokenObject = AuthService.login(email, password);

	if (sessionTokenObject === null) {
		if (errDisplay) {
			errDisplay.textContent = 'Wrong E-mail or password.'
			errDisplay.setAttribute('data-visible', '');
		}
		return;
	}

	localStorage.setItem('todo_app_sessionToken', JSON.stringify(sessionTokenObject))
	window.location.href = '/dashboard';
});

form?.addEventListener('input', () => {
	if (errDisplay?.hasAttribute('data-visible')) {
		errDisplay.removeAttribute('data-visible');
	}
})
