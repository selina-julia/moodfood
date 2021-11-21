module.exports = {
  mode: 'jit',
  purge: {
    content: ['./src/**/*.html', './src/app/**/*.ts'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {},
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
}
