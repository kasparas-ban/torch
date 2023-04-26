/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        appear: 'appear .1s ease-out'
      },
      keyframes: {
        appear: {
          '0%': {
            opacity: '0%',
            transform: "translateY(100px)"
          },
          '100%': {
            opacity: '100%',
            transform: "translateY(0)"
          }
        }
      }
    }
  },
  plugins: []
}
