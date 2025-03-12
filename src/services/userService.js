import getResourceAsync from '../utils/getResouceAsync.js';

const USERS_URL = 'http://localhost:3000/users';

const userService = {
  async getUsersByFieldsAsync(fields) {
    return await getResourceAsync(USERS_URL, fields);
  },

  async createUser(email, password) {
    const response = await fetch(USERS_URL, {
      method: 'POST',
      body: JSON.stringify({ email, password, favorites: [] }),

      headers: { 'Content-Type': 'application/json' },
    });

    return await response.json();
  },
};

export default userService;
