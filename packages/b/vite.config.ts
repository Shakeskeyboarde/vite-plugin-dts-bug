import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import checker from "vite-plugin-checker";

export default defineConfig({
  plugins: [
    dts({
      entryRoot: "src",
    }),
    checker({
      typescript: true,
    }),
  ],
  build: {
    outDir: "lib",
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: "[name]",
    },
    rollupOptions: {
      external: ["c"],
      output: {
        preserveModules: true,
      },
    },
  },
});
