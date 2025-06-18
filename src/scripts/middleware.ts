import { AuthService } from "../backend/AuthService";

const sessionTokenObject = localStorage.getItem('todo_app_sessionToken');

if (sessionTokenObject) {
	const sessionTokenValid = AuthService.validateSessionToken(sessionTokenObject);

	if (!sessionTokenValid && window.location.pathname !== '/') {
		window.location.href = '/';
	}
	if (window.location.pathname === '/' && sessionTokenValid) {
		window.location.href = '/dashboard'
	}
} else if (window.location.pathname !== '/') {
	window.location.href = '/'
}
