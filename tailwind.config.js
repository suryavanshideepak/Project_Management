/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow:{
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3), 0 10px 20px -10px rgba(128, 0, 128, 0.3)',
      }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'purple': '#7c3aed',
      'midnight': '#a78bfa',
      'metal': '#dc2626',
      'tahiti': '#3ab7bf',
      'light': '#ddd6fe',
      'bermuda': '#ddd6fe',
      'green': '#22c55e',  
      'red': '#dc2626',      
      'green-light': '#4ade80', 
      'red-dark': '#9b1c1c',   
    }
  },
  plugins: [],
}

