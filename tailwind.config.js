/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                navy: '#0D1B3E',
                'navy-mid': '#1B2A5E',
                'navy-light': '#253570',
                blue: '#1E5FD4',
                cyan: '#00C2CB',
                'cyan-light': '#00E5EE',
                'off-white': '#F5F7FA',
                'grey-100': '#EEF1F6',
                'grey-200': '#D6DCE8',
                'grey-400': '#8A96B0',
                'grey-600': '#4A5568',
                'grey-800': '#1A202C',
                'green-wa': '#25D366',
            },
            fontFamily: {
                inter: ['var(--font-inter)', 'sans-serif'],
                'plus-jakarta': ['var(--font-plus-jakarta)', 'sans-serif'],
            },
        },
    },
    plugins: [],
}