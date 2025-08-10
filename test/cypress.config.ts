import { defineConfig } from "cypress";
import "dotenv/config";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      config.env = config.env || {};
      // you could extract only specific variables and rename them if necessary
      config.env.FRONTEND_URL =
        process.env.FRONTEND_URL || "http://localhost:4000";
      config.env.BACKEND_URL =
        process.env.BACKEND_URL || "http://localhost:3000";
      console.log("Extended config.env with process.env");
      return config;
    },
  },
});
