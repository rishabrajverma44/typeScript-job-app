import { state } from "./app.state.js";

export function loadFromStorage() {
  const storageData = localStorage.getItem("formData");
  if (storageData) {
    const data = JSON.parse(storageData);
    state.items = data;
  }
}

export function saveToStorage() {
  localStorage.setItem("formData", JSON.stringify(state.items));
}
