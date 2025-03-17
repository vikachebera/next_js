import type {Config} from 'tailwindcss';

const config: Config = {
    content: [

        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {

        screens: {
            'xs': '320px',
            'sm': '576px',
            'md': '768px',
            'lg': '992px',
            'xl': '1200px',
            '2xl': '1400px',
        },
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            white: '#ffffff',
            black: '#000000',
            dark: '#1e1d1d',
            blue: {
                100: '#edf2ff',
                200: '#c7d5fe',
                300: '#a5b9fc',
                400: '#818cf8',
                500: '#6366f1',
                600: '#4f46e5',
                700: '#4338ca',
                800: '#3730a3',
                900: '#312e81',
            },
            gray: {
                100: '#f5f5f5',
                200: '#e5e5e5',
                300: '#d4d4d4',
                400: '#a3a3a3',
                500: '#737373',
                600: '#525252',
                700: '#404040',
                800: '#262626',
                900: '#171717',
            },
        },
        extend: {
            borderRadius: {
                'custom': '10px',
            },
            spacing: {
                'custom-1': '1.25rem',
                'custom-2': '2.5rem',
                'custom-3': '3.75rem',
            },
            fontFamily: {
                'sans': ['Arial', 'Helvetica', 'sans-serif'],
            },
        },
    },
    plugins: [],
}

export default config;
