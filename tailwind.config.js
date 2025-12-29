/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf8f8',
          100: '#f9e8e8',
          200: '#f2d0d0',
          300: '#e6a8a8',
          400: '#d47575',
          500: '#5D1A1A',
          600: '#501616',
          700: '#431212',
          800: '#360e0e',
          900: '#290a0a',
        },
        maroon: {
          50: '#fdf8f8',
          100: '#f9e8e8',
          200: '#f2d0d0',
          300: '#e6a8a8',
          400: '#d47575',
          500: '#5D1A1A',
          600: '#501616',
          700: '#431212',
          800: '#360e0e',
          900: '#290a0a',
          950: '#1a0505',
        },
        gold: {
          50: '#fffdf5',
          100: '#fff9e0',
          200: '#fff0b8',
          300: '#ffe485',
          400: '#ffd452',
          500: '#D4AF37',
          600: '#b8942d',
          700: '#967623',
          800: '#745a1a',
          900: '#523f12',
        },
        cream: {
          50: '#FFFDF8',
          100: '#FFF9E8',
          200: '#FFF3D0',
          300: '#FFEAB8',
          400: '#FFE0A0',
        }
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Poppins', 'sans-serif'],
        'script': ['Dancing Script', 'cursive'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-maroon': 'linear-gradient(135deg, #5D1A1A 0%, #360e0e 50%, #1a0505 100%)',
        'gradient-gold': 'linear-gradient(135deg, #D4AF37 0%, #b8942d 100%)',
      },
      boxShadow: {
        'gold': '0 4px 20px rgba(212, 175, 55, 0.3)',
        'gold-lg': '0 10px 40px rgba(212, 175, 55, 0.4)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(212, 175, 55, 0.6)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
