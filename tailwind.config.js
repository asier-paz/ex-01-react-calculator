module.exports = {
    content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                transparent: "transparent",
                white: "#ffffff",
                gray: {
                    light: "#484848",
                    dark: "#000000",
                    DEFAULT: "#212121",
                },
            },
        },
    },
    plugins: [],
};
