import { state } from "./app.state.js";

export function loadFromStorage() {
  const storageData = localStorage.getItem("formDatas");
  if (storageData) {
    const data = JSON.parse(storageData);
    state.forms = data;
  }
}

export function saveToStorage() {
  localStorage.setItem("formDatas", JSON.stringify(state.forms));
}
