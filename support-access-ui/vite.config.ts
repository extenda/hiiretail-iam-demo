import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  base: "https://raw.githack.com/extenda/hiiretail-iam-demo/feat/HII-10108-poc-support-ui/support-access-ui/dist/",
  plugins: [solid(), nodePolyfills({ include: ["crypto", "util", "stream"] })],
});
