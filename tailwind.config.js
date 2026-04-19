/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // "After Hours" — night studio
        night: '#0B0B10',       // near-black base
        shadow: '#14141C',      // slightly lifted dark panels
        bone: '#ECE8DB',        // warm off-white
        dim: '#6F6F7A',          // muted text
        rule: '#2A2A36',         // borders, rules

        // Signage accents — used sparingly
        lime: '#C7FF3A',         // phosphor / neon accent
        coral: '#FF4E38',        // highlight
        ice: '#7AE0FF',          // cold blue data
        amber: '#FFB547',        // warm accent
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        serif: ['"Fraunces"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        ticker: 'ticker 42s linear infinite',
        pulse: 'pulse 2.8s ease-in-out infinite',
        // Hard-step neon flicker — clearly visible on/off at irregular moments
        flicker: 'flicker 1.8s steps(1, end) infinite',
        drift: 'drift 24s ease-in-out infinite',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        // Irregular on/off flicker — evokes a bad neon-sign connection
        flicker: {
          '0%, 22%':  { opacity: '1' },
          '23%, 26%': { opacity: '0' },
          '27%, 48%': { opacity: '1' },
          '49%, 50%': { opacity: '0' },
          '51%, 72%': { opacity: '1' },
          '73%, 77%': { opacity: '0' },
          '78%, 100%': { opacity: '1' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '33%': { transform: 'translate(30px, -20px) rotate(6deg)' },
          '66%': { transform: 'translate(-20px, 30px) rotate(-4deg)' },
        },
      },
    },
  },
  plugins: [],
};
