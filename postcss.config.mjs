const postcssConfig = {
  plugins: {
    // This is exactly what the Next.js 16 error is asking for
    '@tailwindcss/postcss': {},
  },
};

export default postcssConfig;