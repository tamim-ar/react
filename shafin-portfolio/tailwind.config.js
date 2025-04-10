module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#ffffff',
          dark: '#0a192f',
        },
        secondary: {
          light: '#3b82f6',
          dark: '#60a5fa'
        },
        accent: {
          light: '#2563eb',
          dark: '#3b82f6'
        },
        text: {
          light: '#1f2937',
          dark: '#e2e8f0'
        },
        muted: {
          light: '#64748b',
          dark: '#94a3b8'
        },
        surface: {
          light: '#f8fafc',
          dark: '#1e293b'
        }
      },
      spacing: {
        'section': '8rem',
      },
      maxWidth: {
        'content': '1100px'
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
