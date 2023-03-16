/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [require("daisyui")],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "cupcake",
  },
  // theme: {
  //   extend: {
  //     backgroundImage: {
  //       // 'hero': "url('./components/images/PlaneTravel.jpg')",
  //     }
  //   },
  //   colors: {
  //     DarkBlue: "hsl(209, 23%, 22%)" /*(Dark Mode Elements)*/,
  //     BackgroundDarkBlue: "hsl(207, 26%, 17%)" /*(Dark Mode Background)*/,
  //     VeryDarkBlue: "hsl(200, 15%, 8%)" /*(Light Mode Text)*/,
  //     DarkGray: "hsl(0, 0%, 52%)" /*(Light Mode Input)*/,
  //     VeryLightGray: "hsl(0, 0%, 98%)" /*(Light Mode Background)*/,
  //     White: "hsl(0, 0%, 100%)" /*(Dark Mode Text & Light Mode Elements)*/,
  //   },
  // },
  // plugins: [],

  // darkMode: "class",
};
