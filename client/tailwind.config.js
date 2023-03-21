/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-gray": "#868e96",
        "preview-gray": "#495057",
        "import-color": "#5856D6",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
