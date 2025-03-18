import localStorageService from './localStorageService';

const themeService = {
  applyCurrentTheme(user) {
    let theme = localStorageService.getItemForUser(user, 'theme');

    if (!theme) {
      theme = matchMedia('(prefers-color-scheme:light)') ? 'light' : 'dark';
      localStorageService.setItemForUser(user, 'theme', theme);
    }

    document.documentElement.classList.toggle('dark', theme === 'dark');
  },

  toggleTheme(user) {
    const targetTheme =
      localStorageService.getItemForUser(user, 'theme') === 'light'
        ? 'dark'
        : 'light';

    localStorageService.setItemForUser(user, targetTheme);

    document.documentElement.classList.toggle('dark', targetTheme === 'dark');
  },
};

export default themeService;
