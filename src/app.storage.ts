import { state } from "./app.state.js";

export function loadFromStorage() {
  const storageData = localStorage.getItem("jobTracker_applications_ts");
  const searchString = localStorage.getItem(
    "jobTracker_applications_search_ts"
  );
  if (storageData && searchString) {
    const data = JSON.parse(storageData);
    state.forms = data;
    state.searchQuery = JSON.parse(searchString);
  }
}

export function saveToStorage() {
  localStorage.setItem(
    "jobTracker_applications_ts",
    JSON.stringify(state.forms)
  );
}
export function saveSearchString() {
  //save searched string as well as
  localStorage.setItem(
    "jobTracker_applications_search_ts",
    JSON.stringify(state.searchQuery)
  );
}
