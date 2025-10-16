import daisyui from "daisyui";
import type { Config } from "tailwindcss";
import timeslotColors from "./tailwind-plugins/timeslot-colors";

const config: Config = {
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#fcc041",
          secondary: "#fc9141",
          accent: "#2ab7ca",

          "base-100": "#fffdf1",
          neutral: "#281b1c",

          info: "#60a5fa",
          success: "#84cc16",
          warning: "#fde047",
          error: "#be123c",
        },
      },
    ],
  },

  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {},
    },
  },
  plugins: [daisyui, timeslotColors],
};
export default config;
