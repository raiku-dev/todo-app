// Using arrays for users and sessiosn
// due to being most similar to a db in this mockup
//
// Real DB operations could always fail and the methods in
// this file would throw an error or return null if this happened.

const MOCKUSERS = [
	{
		id: 1,
		email: 'admin@example.org',
		password: 'Admin123'
	}
];

export class AuthService {
	/** 
	 * Login in the user and create a sessionToken
	 * 
	 * @param {string} email - The user email
	 * @param {string} password - The password
	 * 
	 * @returns the sessionTokenObject or null if failed
	 */
	static login(email: string, password: string): object | null {
		if (!email || !password) {
			console.error('Email or password missing.');
			return null;
		}

		// Get user from DB using parameterized or sanitized query
		const user = MOCKUSERS.find(user => user.email === email);

		// Check if pw hashes match, I like to use bcrypt for pw hashing.
		if (user?.password !== password) {
			console.error('User tried to log in with the wrong password.');
			return null;
		}

		return this.createSessionToken(user.id);
	}

	/**
	* Create a sessionToken for a user
	*
	* @param {number} userId - The ID of the user to create the sessionToken for
	*
	* @returns the newly created sessionTokenObject
	*/
	static createSessionToken(userId: number): object {
		// create some kind of session token and write to DB,
		// usually I use crypto.randomUUID() for IDs and some kinds of tokens.
		const token = 'secureToken123';
		const expires = new Date(
			Date.now() + 1000 * 60 * 60 * 24
		).toISOString();

		const sessionTokenObject = {
			sessionToken: token,
			expires,
			userId
		}

		return sessionTokenObject;
	}

	/**
	* Validates an existing sessionToken
	*
	* @param {string} sessionTokenJson - The stringified sessionTokenObject to validate
	* @returns true if successful, otherwise false
	*/
	static validateSessionToken(sessionTokenJson: string): boolean {
		let parsedToken;
		try {
			parsedToken = JSON.parse(sessionTokenJson);
		} catch {
			parsedToken = false;
		}

		if (!parsedToken || parsedToken.expires < new Date().toISOString()) {
			console.error('Could not find valid SessionToken.');
			return false;
		}

		return true;
	}

	// Usually I'd have a refreshToken functionality
}
