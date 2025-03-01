const localStorageService = {
  setItemForUser(user, key, value) {
    user = user || 'anonymous';

    const userData = localStorage.getItem('userData')
      ? JSON.parse(localStorage.getItem('userData'))
      : {};

    if (!userData[user]) {
      userData[user] = {};
    }

    userData[user][key] = value;

    localStorage.setItem('userData', JSON.stringify(userData));
  },

  getItemForUser(user, key) {
    user = user || 'anonymous';

    const userData = localStorage.getItem('userData');

    if (!userData) {
      return undefined;
    }

    return JSON.parse(userData)?.[user]?.[key];
  },
};

export default localStorageService;
