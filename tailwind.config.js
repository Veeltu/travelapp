/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [require("daisyui")],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    styled: true,
    themes: ["light" , "dark", "garden", "coffee", "cyberpunk", "aqua"],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "cupcake",
  },
};
