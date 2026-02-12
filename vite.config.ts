import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import svg from "@neodx/svg/vite";
import react from "@vitejs/plugin-react";
import { loadEnv, defineConfig } from "vite";
import vike from "vike/plugin";
import tsconfigPaths from "vite-tsconfig-paths";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
const config = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    ssr: { noExternal: ["effector-factorio"] },
    build: { 
      sourcemap: true,
      minify: false 
    },
    resolve: {
      alias: {
        "~/renderer": resolve(__dirname, "renderer"),
        "~": resolve(__dirname, "src"),
        "@": resolve(__dirname, "src"),
      },
    },
    plugins: [
      react({
        babel: { 
          babelrc: true,
          plugins: ["@babel/plugin-syntax-import-attributes"]
        },
      }),
      vike(),
      tsconfigPaths(),
      svg({
        root: "src/shared/ui/assets/icons",
        output: "public/sprites",
        fileName: "{name}.{hash:8}.svg",
        metadata: {
          path: "src/shared/ui/atoms/icon/sprites.generated.ts",
          runtime: {
            size: true,
            viewBox: true,
          },
        },
        group: false,
        resetColors: {
          replaceUnknown: "currentColor",
        },
      }),
    ],
    define: {},
  };
});

export default config;
