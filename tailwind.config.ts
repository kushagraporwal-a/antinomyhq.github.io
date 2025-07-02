/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,md,mdx}", "./docs/**/*.{md,mdx}", "./docusaurus.config.ts"],
  theme: {
    extend: {
      colors: {
        tailCall: {
          border: {
            light: {
              100: "#f3f4f7",
              200: "#e4e4e4",
              300: "#e5e5e5",
              400: "#e7e7e7",
              500: "#cececf",
              600: "#b6b6b7",
            },
            dark: {
              100: "#121315",
              200: "#323335",
              300: "#2c2c2c",
              400: "#545556",
              700: "#000000",
              800: "#BDBDBD",
              900: "#343335",
              1000: "#23222D",
              1100: "#999999",
              1200: "#5d5d5d4d",
            },
          },
          light: {
            100: "#FFFFFF",
            200: "#F3F3F3",
            300: "#E7E7E7",
            400: "#CECECF",
            500: "#B6B6B7",
            600: "#858586",
            700: "#B4B4B4",
            800: "#A1A1A1",
            900: "#F1F1F1",
          },
          dark: {
            100: "#545556",
            200: "#323335",
            300: "#232426",
            400: "#1C1D1F",
            500: "#121315",
            600: "#121212",
            700: "#000000",
            800: "#0F0F13",
            900: "#4D4D4D",
            1000: "#D9D9D9",
            1100: "#161616",
            1200: "#18171A",
          },
          yellow: "#FDEA2E",
          gray: "#343335",
          lightGray: "#3B3B3B",
          darkGray: "#858585",
          cyan: "#30EDE6",
          white: "#f5f3eb",
          text: {
            gray: {
              100: "#737373",
              200: "#454545",
            },
            cyan: "#00A6A6",
            green: "#1B8783"
          }
        },
      },
      spacing: {
        SPACE_01: "4px",
        SPACE_02: "8px",
        SPACE_03: "12px",
        SPACE_04: "16px",
        SPACE_05: "20px",
        SPACE_06: "24px",
        SPACE_07: "28px",
        SPACE_08: "32px",
        SPACE_09: "36px",
        SPACE_10: "40px",
        SPACE_11: "44px",
        SPACE_12: "48px",
        SPACE_13: "52px",
        SPACE_14: "56px",
        SPACE_15: "60px",
        SPACE_16: "64px",
        SPACE_17: "68px",
        SPACE_18: "72px",
        SPACE_19: "76px",
        SPACE_20: "80px",
        SPACE_21: "160px",
      },
      screens: {
        "3xl": "2200px",
      },
      maxWidth: {
        fill: "-webkit-fill-available",
      },
      backgroundImage: {
        "custom-radial": "radial-gradient(58.31% 58.31% at 50% 100%, #30EDE6 0%, rgba(0, 0, 0, 0.40) 100%)",
        "card-border-gradient":
          "linear-gradient(180deg, rgba(60, 227, 221, 1) 0%, rgba(77, 77, 77, 1) 86%, rgba(26, 82, 81, 1) 100%)",
        "radial-gradient": "linear-gradient(136deg,rgba(0, 0, 0, 1) 0%, rgba(60, 227, 221, 1) 100%)",
        "custom-radial-gradient": "radial-gradient(97.79% 94.15% at 15.05% 0%, #FFF 0%, #2A2A2A 100%)",
        "gradient-315": "linear-gradient(315deg,rgba(0, 0, 0, 1) 80%, rgba(48, 237, 230, 1) 100%);",
        "header-radial-gradient": "radial-gradient(400.27% 43.55% at 150% 100%, rgba(48, 237, 230, 0.5) 0%, rgba(0,0,0,0) 100%),"
      },
    },
    fontFamily: {
      bebas: ['"Bebas Neue"', "sans-serif"],
      kanit: ['"Kanit"', "sans-serif"],
      space: ['"Space Mono"', "sans-serif"],
    },
    fontSize: {
      "display-large": [
        "96px",
        {
          lineHeight: "105.6px",
          fontWeight: "700",
          letterSpacing: "-3px",
        },
      ],
      "display-medium": [
        "64px",
        {
          lineHeight: "70.4px",
          fontWeight: "700",
          letterSpacing: "-2px",
        },
      ],
      "display-small": [
        "56px",
        {
          lineHeight: "67.2px",
          fontWeight: "700",
          letterSpacing: "-2px",
        },
      ],
      "display-tiny": [
        "40px",
        {
          lineHeight: "48px",
          fontWeight: "700",
          letterSpacing: "-2px",
        },
      ],
      "title-large": [
        "32px",
        {
          lineHeight: "41.6px",
          fontWeight: "700",
          letterSpacing: "-1px",
        },
      ],
      "title-semi-large": [
        "28px",
        {
          lineHeight: "36.4px",
          fontWeight: "700",
          letterSpacing: "-4%",
        },
      ],
      "title-medium": [
        "24px",
        {
          lineHeight: "33.6px",
          fontWeight: "700",
          letterSpacing: "-1px",
        },
      ],
      "title-small": [
        "20px",
        {
          lineHeight: "26px",
          fontWeight: "700",
          letterSpacing: "0px",
        },
      ],
      "title-tiny": [
        "18px",
        {
          lineHeight: "22.8px",
          fontWeight: "700",
          letterSpacing: "0px",
        },
      ],
      "content-large": [
        "24px",
        {
          lineHeight: "36px",
          fontWeight: "400",
          letterSpacing: "-2%",
        },
      ],
      "content-medium": [
        "20px",
        {
          lineHeight: "32px",
          fontWeight: "400",
          letterSpacing: "-2%",
        },
      ],
      "content-small": [
        "16px",
        {
          lineHeight: "24px",
          fontWeight: "400",
          letterSpacing: "-2%",
        },
      ],
      "content-tiny": [
        "14px",
        {
          lineHeight: "20.73px",
          fontWeight: "400",
          letterSpacing: "-4%",
        },
      ],
      "content-mini": [
        "12px",
        {
          lineHeight: "16px",
          fontWeight: "400",
          letterSpacing: "-2%",
        },
      ],
    },
  },
  plugins: [],
  darkMode: 'class',
  corePlugins: {
    preflight: false,
  },
  blocklist: ["container"],
}
