import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://moreal.github.io", // Change this to your actual site URL
  base: "/hackerspub-astro-template",
  output: "static",
  integrations: [react(), tailwind(), sitemap()],
});
