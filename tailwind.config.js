const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: [
        './**/*.html',
        './**/styles.json',
        './themes/default.json',
        '../../components/tailwind/**/*.html',
        '../../components/tailwind/**/*.json'
    ], 
    theme: {
        screens: {
            'xs': '300px',
            ...defaultTheme.screens,
        },
        extend: {},
    },
    variants: {
        extend: {
            backgroundColor: ({ after }) => after(['disabled'])
        },
    },
    darkMode: 'class',
    plugins: [               
        require("@tailwindcss/typography")
    ],
    corePlugins: {    
        preflight: false  
    }
}
