const THEME_STORAGE_KEY = 'theme';
const THEME_BLACK_VAL = 'black';
const THEME_LIGHT_VAL = 'light';
const THEME_BLACK_CLASS = 'theme-black';
const THEME_TOGGLE_BTN_CLASS = 'theme-toggle-btn';
const PREFERS_COLOR_SCHEME_MEDIA = 'prefers-color-scheme';

function useTheme() {
  let storageTheme = localStorage.getItem(THEME_STORAGE_KEY);

  if (!storageTheme) {
    let defaultTheme = matchMedia(
      `(${PREFERS_COLOR_SCHEME_MEDIA}:${THEME_BLACK_VAL})`,
    ).matches
      ? THEME_BLACK_VAL
      : THEME_LIGHT_VAL;

    localStorage.setItem(THEME_STORAGE_KEY, defaultTheme);
    storageTheme = defaultTheme;
  }

  document.documentElement.classList.toggle(
    THEME_BLACK_CLASS,
    storageTheme === THEME_BLACK_VAL,
  );

  document
    .querySelector(`.${THEME_TOGGLE_BTN_CLASS}`)
    .addEventListener('click', () => {
      document.documentElement.classList.toggle(THEME_TOGGLE_BTN_CLASS);
      const currentTheme = localStorage.getItem(THEME_STORAGE_KEY);
      const newTheme =
        currentTheme === THEME_BLACK_VAL ? THEME_LIGHT_VAL : THEME_BLACK_VAL;
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    });
}

export { useTheme };
