import { state } from "./app.state.js";

export function loadFromStorage() {
  const storageData = localStorage.getItem("jobTracker_applications_ts");
  if (storageData) {
    const data = JSON.parse(storageData);
    state.forms = data;
  }
}

export function saveToStorage() {
  localStorage.setItem(
    "jobTracker_applications_ts",
    JSON.stringify(state.forms)
  );
}
