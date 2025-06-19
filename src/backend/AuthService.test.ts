import { describe, it, expect } from 'vitest';
import { AuthService } from './AuthService';

describe('AuthService', () => {
	it('should login with valid credentials', () => {
		const token = AuthService.login('admin@example.org', 'Admin123');
		expect(token).not.toBeNull();
		expect(token).toHaveProperty('sessionToken');
		expect(token).toHaveProperty('expires');
		expect(token?.userId).toBe(1);
	});

	it('should fail login with wrong password', () => {
		const token = AuthService.login('admin@example.org', 'wrongPass');
		expect(token).toBeNull();
	});

	it('should fail login with unknown email', () => {
		const token = AuthService.login('nonexistent@example.org', 'password');
		expect(token).toBeNull();
	});

	it('should fail login with empty credentials', () => {
		expect(AuthService.login('', '')).toBeNull();
		// @ts-expect-error
		expect(AuthService.login(undefined, undefined)).toBeNull();
	});

	it('should validate a valid sessionToken', () => {
		const token = AuthService.login('admin@example.org', 'Admin123');
		expect(token).not.toBeNull();
		const json = JSON.stringify(token);
		expect(AuthService.validateSessionToken(json)).toBe(true);
	});

	it('should deny an invalid sessionToken', () => {
		expect(AuthService.validateSessionToken('not-json')).toBe(false);
	});

	it('should deny an expired sessionToken', () => {
		const expiredToken = {
			sessionToken: 'expired',
			expires: new Date(Date.now() - 1000 * 10).toISOString(),
			userId: 1
		};
		const json = JSON.stringify(expiredToken);
		expect(AuthService.validateSessionToken(json)).toBe(false);
	});
});
