import getResourceAsync from '../utils/getResouceAsync.js';

const USERS_URL = 'http://localhost:3000/users';

const userService = {
  async getUsersByFieldsAsync(fields) {
    return await getResourceAsync(USERS_URL, fields);
  },
};

export default userService;
