import type {Config} from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'red': {
                    '50': '#fff2f1',
                    '100': '#ffe1df',
                    '200': '#ffc7c4',
                    '300': '#ffa09b',
                    '400': '#ff6961',
                    '500': '#ff3a30',
                    '600': '#f11c11',
                    '700': '#cb140a',
                    '800': '#ae150d',
                    '900': '#8a1812',
                    '950': '#4c0703',
                },
                'green': {
                    '50': '#f4f9ec',
                    '100': '#e5f2d5',
                    '200': '#cde6b0',
                    '300': '#add482',
                    '400': '#8fc15a',
                    '500': '#70a63c',
                    '600': '#56842c',
                    '700': '#436526',
                    '800': '#3d5926',
                    '900': '#314621',
                    '950': '#17250e',
                },
                'orange': {
                    '50': '#fffbec',
                    '100': '#fff7d3',
                    '200': '#ffeba5',
                    '300': '#ffdb6d',
                    '400': '#ffbf32',
                    '500': '#ffa80a',
                    '600': '#fc8f00',
                    '700': '#cc6a02',
                    '800': '#a1520b',
                    '900': '#82450c',
                    '950': '#462104',
                },
            },
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        color: '#333',
                        a: {
                            color: theme('colors.red.800'),
                            '&:hover': {
                                'text-decoration': 'none',
                                color: theme('colors.red.900'),
                            },
                        },
                    },
                },
            }),
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
    ],
} satisfies Config;
