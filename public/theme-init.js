(function () {
  try {
    var theme = localStorage.getItem('atlas-theme')
    if (theme !== 'light' && theme !== 'dark') {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    document.documentElement.dataset.theme = theme
  } catch (error) {
    // Storage can be unavailable; ThemeProvider will apply its in-memory fallback.
  }
})()
