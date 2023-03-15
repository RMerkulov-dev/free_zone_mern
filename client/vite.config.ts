export default {
  build: {
    rollupOptions: {
      input: {
        main: "src/index.tsx",
        nested: "src/nested/index.html",
      },
    },
  },
};
