/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins-Regular'],
        'poppins-thin': ['Poppins-Thin'],
        'poppins-extralight': ['Poppins-ExtraLight'],
        'poppins-light': ['Poppins-Light'],
        'poppins-medium': ['Poppins-Medium'],
        'poppins-semibold': ['Poppins-SemiBold'],
        'poppins-bold': ['Poppins-Bold'],
        'poppins-extrabold': ['Poppins-ExtraBold'],
        'poppins-black': ['Poppins-Black'],
        'poppins-italic': ['Poppins-Italic'],
        'poppins-thin-italic': ['Poppins-ThinItalic'],
        'poppins-extralight-italic': ['Poppins-ExtraLightItalic'],
        'poppins-light-italic': ['Poppins-LightItalic'],
        'poppins-medium-italic': ['Poppins-MediumItalic'],
        'poppins-semibold-italic': ['Poppins-SemiBoldItalic'],
        'poppins-bold-italic': ['Poppins-BoldItalic'],
        'poppins-extrabold-italic': ['Poppins-ExtraBoldItalic'],
        'poppins-black-italic': ['Poppins-BlackItalic'],
      },
    },
  },
  plugins: [],
}