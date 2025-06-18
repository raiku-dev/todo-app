import { AuthService } from "../backend/AuthService";

const form = document.querySelector('form');

form?.addEventListener('submit', (e) => {
	e.preventDefault();

	const { email, password } = Object.fromEntries(new FormData(form));

	if (typeof email !== "string" || typeof password !== "string") {
		throw new Error("Invalid form data");
	}

	const sessionTokenObject = AuthService.login(email, password);

	if (sessionTokenObject === null) {
		alert('An error occured while trying to log in.')
		return;
	}

	localStorage.setItem('todo_app_sessionToken', JSON.stringify(sessionTokenObject))
	window.location.href = '/dashboard';
});
