/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        blue_default: "#1057CD",
        dimgray: "#00000099",
        whitesmoke: {
          100: "#f1f2f5",
          200: "#e8eaed",
        },
        gray: {
          100: "#202124",
          200: "rgba(0, 0, 0, 0.8)",
          300: "#fefefe",
          400: "#212225",
          600: "rgba(254, 254, 254, 0.93)",
          700: "rgba(0, 0, 0, 0.08)",
        },
        gainsboro: {
          100: "#e6e6e6",
          200: "#dadce0",
          300: "#e0dbdb",
        },
        seagreen: {
          100: "#4c9e77",
          200: "#00a173",
          300: "#01875f",
          400: "#33855e",
          500: "#0E7B56",
          600: "#03875F",
        },
        lightcoral: "#ea726f",
        mintcream: "#e6f3ef",
        darkslategray: {
          100: "#2e624b",
          200: "#344767",
          300: "#424249",
          400: "#163a50",
        },
        // onexBlueLight: "#274F95",
        // onexBlue: "#264B8D",
        onexBlueLight: "#3371D5",
        darkgray: "#9aa0a6",
        steelblue: "#3f87cb",
        orange: "#fbbc04",
        royalblue: "#1a73e8",
        dodgerblue: "#4285f4",
        cornflowerblue: "#5c9eff",
        lightslategray: "#7b809a",
        indigo: "#4d2186",
        black: "#000",
        "overlay-2": "rgba(255, 255, 255, 0.16)",
        "button-primary": "#616161",
      },
      spacing: {},
      fontFamily: {
        roboto: "Roboto",
        "roboto-slab": "'Roboto Slab'",
        poppins: "Poppins",
        inter: "Inter",
        product_sans: "'Product Sans'",
      },
      borderRadius: {
        "9980xl": "9999px",
        "341xl": "360px",
        "29xl": "48px",
        "251xl": "270px",
        "10xs": "3px",
        "8xs": "5px",
      },
    },
    fontSize: {
      sm: "14px",
      "2xs": "11px",
      xs: "12px",
      smi: "13px",
      lg: "18px",
      base: "16px",
      "37xl": "56px",
      "5xl": "24px",
      "3xl": "22px",
      "2xs-5": "10.5px",
      lgi: "19px",
      mini: "15px",
      "10xl": "29px",
      "4xl": "23px",
      "28xl": "47px",
      "9xl": "28px",
      "19xl": "38px",
      xl: "20px",
      "3xs": "10px",
      "11xl": "30px",
      "15xl": "34px",
      "26xl": "45px",
      inherit: "inherit",
    },
    screens: {
      xl: {
        max: "1800px",
      },
      lg: {
        max: "1200px",
      },
      md: {
        max: "1024px",
      },

      mobileBlack: {
        min: "375px",
      },
      tabletBlack: {
        min: "600px",
      },
      desktopBlack: {
        min: "1100px",
      },
      mq1050: {
        raw: "screen and (max-width: 1050px)",
      },
      mq1000: {
        raw: "screen and (max-width: 1000px)",
      },
      mq750: {
        raw: "screen and (max-width: 750px)",
      },
      mq725: {
        raw: "screen and (max-width: 725px)",
      },
      mq600: {
        raw: "screen and (max-width: 600px)",
      },
      mq450: {
        raw: "screen and (max-width: 450px)",
      },
      mq128: {
        raw: "screen and (max-width: 128px)",
      },
    },
  },
  plugins: [],
};
