export const THEME_COOKIE_NAME = 'fisio-theme';

export const THEME_SCRIPT = `(function() {
  try {
    var match = document.cookie.match(/(?:^|; )fisio-theme=([^;]*)/);
    var theme = match ? decodeURIComponent(match[1]) : null;
    var valid = ['lavanda', 'oceano', 'menta', 'rosa', 'oscuro'];
    if (theme && valid.indexOf(theme) !== -1) {
      document.documentElement.setAttribute('data-theme', theme);
    } else {
      document.documentElement.setAttribute('data-theme', 'lavanda');
    }
  } catch (e) {}
})();`;
