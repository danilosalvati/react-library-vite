import { type UserConfig, defineConfig } from "vite";

import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";

import { resolve } from "path";

const config: UserConfig = defineConfig({
  plugins: [react(), dts()],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "src/index.tsx"),
      name: "ReactLibraryTemplate",
      // the proper extensions will be added
      fileName: "react-library-template",
      formats: ["es"],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: "React",
          "react/jsx-runtime": "react/jsx-runtime",
        },
      },
    },
  },
});

export default config;
