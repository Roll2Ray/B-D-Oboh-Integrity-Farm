/** Tailwind config — same theme the page used via the CDN. */
module.exports = {
  content: ['./index.html', './js/**/*.js'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        forest: { 50: '#f0f7f1', 100: '#dcebdf', 200: '#b9d8c0', 300: '#8dbf9a', 400: '#5da072', 500: '#3d8556', 600: '#2d6a43', 700: '#25553a', 800: '#1f4430', 900: '#14321f', 950: '#0b1f13' },
        leaf: { 400: '#7bc74d', 500: '#5eb13a', 600: '#4a9429' },
        earth: { 500: '#8b5e34', 600: '#6f4a28' },
        cream: { 50: '#fdfbf5', 100: '#f8f2e2', 200: '#efe4c8' },
        charcoal: '#1f2421'
      }
    }
  }
};
