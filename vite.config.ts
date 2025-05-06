// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
// import path from "path";
// import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

// export default defineConfig({
//   plugins: [
//     react(),
//     runtimeErrorOverlay(),
//     themePlugin(),
//     ...(process.env.NODE_ENV !== "production" &&
//     process.env.REPL_ID !== undefined
//       ? [
//           await import("@replit/vite-plugin-cartographer").then((m) =>
//             m.cartographer(),
//           ),
//         ]
//       : []),
//   ],
//   resolve: {
//     alias: {
//       "@": path.resolve(import.meta.dirname, "client", "src"),
//       "@shared": path.resolve(import.meta.dirname, "shared"),
//       "@assets": path.resolve(import.meta.dirname, "attached_assets"),
//     },
//   },
//   root: path.resolve(import.meta.dirname, "client"),
//   build: {
//     outDir: path.resolve(import.meta.dirname, "dist/public"),
//     emptyOutDir: true,
//   },
// });
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import fs from 'fs-extra';

// Dynamically import cartographer plugin for dev mode
const cartographerPlugin =
  process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined
    ? [
        await import("@replit/vite-plugin-cartographer").then((m) =>
          m.cartographer()
        ),
      ]
    : [];

// Plugin to copy Vercel config files
const copyVercelConfigPlugin = () => {
  return {
    name: 'copy-vercel-config',
    closeBundle: async () => {
      // Copy vercel.json to the dist folder for deployment
      if (fs.existsSync(path.resolve(__dirname, 'vercel.json'))) {
        await fs.copy(
          path.resolve(__dirname, 'vercel.json'),
          path.resolve(__dirname, 'dist/vercel.json')
        );
        console.log('✅ Copied vercel.json to dist folder');
      }
      
      // Create _redirects file for Netlify
      await fs.outputFile(
        path.resolve(__dirname, 'dist/public/_redirects'),
        '/* /index.html 200'
      );
      console.log('✅ Created _redirects file in dist/public folder');
      
      // Copy 404.html to handle direct route access
      if (fs.existsSync(path.resolve(__dirname, 'client/public/404.html'))) {
        await fs.copy(
          path.resolve(__dirname, 'client/public/404.html'),
          path.resolve(__dirname, 'dist/public/404.html')
        );
        console.log('✅ Copied 404.html to dist/public folder');
      }
      
      // Create a web.config file for IIS hosting (Microsoft servers)
      await fs.outputFile(
        path.resolve(__dirname, 'dist/public/web.config'),
        `<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="React Routes" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="/" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>`
      );
      console.log('✅ Created web.config file for IIS hosting');
    }
  };
};

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...cartographerPlugin,
    copyVercelConfigPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"), // Correctly resolve client/src directory
      "@shared": path.resolve(__dirname, "shared"), // Resolve shared directory
      "@assets": path.resolve(__dirname, "attached_assets"), // Resolve attached_assets directory
    },
  },
  root: path.resolve(__dirname, "client"), // Set the root directory to the client folder
  build: {
    outDir: path.resolve(__dirname, "dist/public"), // Build output directory
    emptyOutDir: true, // Clean output directory before building
  },
  base: process.env.VITE_BASE_PATH || "/",
});
