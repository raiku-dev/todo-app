import { AuthService } from '../backend/AuthService';
import { setErrDisplay } from './utils';

const form = document.querySelector('form');
const errDisplay = form?.querySelector('.err');

form?.addEventListener('submit', e => {
	e.preventDefault();

	const formData = new FormData(form);
	const email = formData.get('email');
	const password = formData.get('password');

	if (typeof email !== 'string' || typeof password !== 'string') {
		setErrDisplay(errDisplay, 'Invalid data');
		return;
	}

	const sessionTokenObject = AuthService.login(email, password);

	if (sessionTokenObject === null) {
		setErrDisplay(errDisplay, 'Wrong E-mail or password.');
		return;
	}

	localStorage.setItem(
		'todo_app_sessionToken',
		JSON.stringify(sessionTokenObject)
	);
	window.location.href = '/dashboard';
});

form?.addEventListener('input', () => {
	if (errDisplay?.hasAttribute('data-visible')) {
		setErrDisplay(errDisplay, '');
	}
});
