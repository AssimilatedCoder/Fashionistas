/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dressed Brand Colors
        ivory: '#FDFDFB',
        warmBeige: '#F5F0EB',
        softTaupe: '#E8E3DD',
        stoneGray: '#9B9690',
        charcoal: '#2C2926',
        terracotta: '#D4715A',
        sage: '#8FA887',
        dustyRose: '#C9968F',
        burntSienna: '#A85741',
        success: '#6B9A63',
        warning: '#D4A574',
        error: '#C87B7B',
        info: '#7B9DB8',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '20px',
        '4xl': '24px',
      },
      boxShadow: {
        'soft': '0 1px 3px rgba(44, 41, 38, 0.06)',
        'medium': '0 4px 12px rgba(44, 41, 38, 0.08)',
        'strong': '0 4px 16px rgba(44, 41, 38, 0.1)',
        'elevated': '0 20px 40px rgba(44, 41, 38, 0.2)',
        'terracotta': '0 2px 8px rgba(212, 113, 90, 0.2)',
        'terracotta-hover': '0 4px 12px rgba(212, 113, 90, 0.3)',
      },
      animation: {
        'fade-slide-up': 'fadeSlideUp 0.4s cubic-bezier(0.33, 1, 0.68, 1)',
        'pulse-soft': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 0.6s ease-in-out',
      },
      keyframes: {
        fadeSlideUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
}