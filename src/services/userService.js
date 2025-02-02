import performAPICall from '../utils/performAPICall.js';

const USERS_URL = 'http://localhost:3000/posts';

const userService = {
  getUsersByEmail(email, setResponse) {
    performAPICall(USERS_URL, { email }, 'GET', null, setResponse);
  },
};

export default userService;
