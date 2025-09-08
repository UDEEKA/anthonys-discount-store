import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Initialize theme before rendering
(function initializeTheme() {
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'dark' || savedTheme === 'light') {
    root.classList.add(savedTheme);
  } else {
    // Default to system preference
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? 'dark' 
      : 'light';
    root.classList.add(systemTheme);
  }
})();

createRoot(document.getElementById("root")!).render(<App />);