const { colors } = require("tailwindcss/defaultTheme");

module.exports = {
  plugins: [require("tailwindcss-dark-mode")()],
  theme: {
    extend: {
      colors: {
        primary: {
          100: `var(--color-primary-100, ${colors.blue["100"]})`,
          200: `var(--color-primary-200, ${colors.blue["200"]})`,
          300: `var(--color-primary-300, ${colors.blue["300"]})`,
          400: `var(--color-primary-400, ${colors.blue["400"]})`,
          500: `var(--color-primary-500, ${colors.blue["500"]})`,
          600: `var(--color-primary-600, ${colors.blue["600"]})`,
          700: `var(--color-primary-700, ${colors.blue["700"]})`,
          800: `var(--color-primary-800, ${colors.blue["800"]})`,
          900: `var(--color-primary-900, ${colors.blue["900"]})`,
        },

        gray: {
          100: `var(--color-gray-100, ${colors.gray["100"]})`,
          200: `var(--color-gray-200, ${colors.gray["200"]})`,
          300: `var(--color-gray-300, ${colors.gray["300"]})`,
          400: `var(--color-gray-400, ${colors.gray["400"]})`,
          500: `var(--color-gray-500, ${colors.gray["500"]})`,
          600: `var(--color-gray-600, ${colors.gray["600"]})`,
          700: `var(--color-gray-700, ${colors.gray["700"]})`,
          800: `var(--color-gray-800, ${colors.gray["800"]})`,
          900: `var(--color-gray-900, ${colors.gray["900"]})`,
          1000: `var(--color-gray-1000, #11151d)`,
        },
      },
    },
  },
  variants: {
    backgroundColor: ["hover", "focus", "dark", "dark-focus", "dark-hover"],
    fontWeight: ["hover", "focus", "dark", "dark-hover"],
    borderColor: ["hover", "focus", "dark", "dark-focus", "dark-hover"],
    textColor: ["hover", "focus", "dark", "dark-focus", "dark-hover"],
  },
};
