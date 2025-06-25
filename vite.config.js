import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // ... (any other server options you might have)
    allowedHosts: [
      "vh5drr-5173.csb.app", // <-- Add your specific host here
      // You can add more hosts if needed, e.g., 'your-other-dev-domain.com'
    ],
  },
});
