import { loadFromStorage } from "./app.storage.js";
import { renderApp } from "./components/App.js";

document.addEventListener("DOMContentLoaded", () => {
  loadFromStorage(); //load form data first
  renderApp(); // Initial render
});
