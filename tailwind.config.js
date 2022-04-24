module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
          wiggle: {
              '0%, 100%': {
                  transform: 'rotate(-5deg)'
              },
              '50%': {
                  transform: 'rotate(5deg)'
              },
          },

          wiggle2: {
            '0%, 100%': {
                transform: 'rotate(-3deg)'
            },
            '50%': {
                transform: 'rotate(3deg)'
            },
        },

        wiggle3: {
            '0%, 100%': {
                transform: 'rotate(-8deg)'
            },
            '50%': {
                transform: 'rotate(8deg)'
            },
        },


        bounce2: {
          '0%, 100%': {
              transform: 'translateY(-25%)',
          },
          '50%': {
              transform: 'translateY(0)'
          },
      },
      },
      animation: {
          wiggle: 'wiggle 2s ease-in-out infinite',
          wiggle2: 'wiggle2 2s ease-in-out infinite',
          wiggle3: 'wiggle3 3s ease-in-out infinite',
          bounce2: 'bounce2 5s ease-in-out infinite',
          bounce3: 'bounce2 3s ease-in-out infinite',
      },
      fontFamily: {
        serif: ['Inter', 'serif'],
        // serif: ['Spartan', 'serif'],
        // serif: ['Poppins', 'serif'],
      },
      colors: {
        'tahiti': {
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
        'vue': {
          50: '#D7F6E8',
          100: '#C6F2DE',
          200: '#A5EACB',
          300: '#84E2B8',
          400: '#63DBA5',
          500: '#42D392',
          600: '#2AB376',
          700: '#1F8658',
          800: '#15583A',
          900: '#0A2B1C',
        },
        'vue2': {  DEFAULT: '#42D392',  '50': '#D7F6E8',  '100': '#C6F2DE',  '200': '#A5EACB',  '300': '#84E2B8',  '400': '#63DBA5',  '500': '#42D392',  '600': '#2AB376',  '700': '#1F8658',  '800': '#15583A',  '900': '#0A2B1C'},
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
