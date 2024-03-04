/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        navBarBg: 'var(--navBarBg)',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primaryBootstrap: 'var(--primaryBootstrap)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        cyan: 'var(--cyan)',
        footerCyan: 'var(--footerCyan)',
        paleBlack: 'var(--paleBlack)',
        paleWhite: 'var(--paleWhite)',
        leftNavbar: 'var(--leftNavbar)',
        darkPurple: 'var(--darkPurple)',
        purple: 'var(--purple)',
        lightGray: 'var(--lightGray)',
        secondaryDark: 'var(--secondaryDark)',
        secondaryDarker: 'var(--secondaryDarker)',
        lightPurple: 'var(--lightPurple)',

        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(varnp(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      boxShadow: {
        buddha:
          'rgba(67, 97, 238, 0.25) 0px 54px 55px, rgba(72, 149, 239, 0.22) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(72, 12, 168, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
        blockQuote:
          'rgba(58, 12, 163, 0.25) 0px 45px 45px, rgba(58, 12, 163, 0.22) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(72, 12, 168, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
      },
      backgroundImage: {
        heroBelt: 'var(--heroBelt)',
        buddhaSection: 'var(--buddhaSection)',
      },
      gridTemplateColumns: {
        16: 'repeat(16, minmax(0, 1fr))',
      },
      fontFamily: {
        sans: ['Roboto'],
        rajdhani: 'Rajdhani, serif',
        rubik: 'Rubik, serif',
      },
      letterSpacing: {
        tightest: '-.075em',
        normal: '0',
        wider: '.05em',
        widest: '.25em',
      },

      height: {
        navHeight: 'var(--navHeight)',
      },
      padding: {
        navHeight: 'var(--navHeight)',
        leftNavWidth: 'var(--leftNavWidth)',
      },
      width: {
        leftNavWidth: 'var(--leftNavWidth)',
        112: '28rem',
      },

      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
