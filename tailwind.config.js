const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: [
        './**/*.html',
        './**/styles.json',
        './themes/default.json'
    ], 
    theme: {
        screens: {
            'xs': '300px',
            ...defaultTheme.screens,
        },
        extend: {},
    },
    darkMode: 'class',
    plugins: [               
        require("@tailwindcss/typography"),
        require("flyonui"),
        require("flyonui/plugin") 
    ],
    flyonui: {
        themes: [
            {
                "saas": {
                    ...require("flyonui/src/theming/themes")["light"],
                    primary: "#0284c7" // sky-600
                } 
            }
        ], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "soft"]
        darkTheme: "dark", // name of one of the included themes for dark mode
        base: false, // applies background color and foreground color for root element by default
        styled: true, // include FlyonUI colors and design decisions for all components
        utils: true, // adds responsive and modifier utility classes
        vendors: false, // default is false when true add customize css for apexChart, editor.js, flatpickr, fullcalendar, notyf, raty-js
        logs: true, // Shows info about FlyonUI version and used config in the console when building your CSS
        themeRoot: ":root" // The element that receives theme color CSS variables
    },
    corePlugins: {    
        preflight: false  
    }
}
