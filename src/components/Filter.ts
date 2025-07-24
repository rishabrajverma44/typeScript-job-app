import { clearSearch, searchState, setSearch } from "../app.state";
import { renderApp } from "./App";

export function Search() {
  const searchBox = document.createElement("form");
  //get current search state
  const searchValue = searchState();
  searchBox.innerHTML = `
    <div class='search'>
       <input id="searchBox" placeholder="Search" value="${searchValue}"/>
       <button type="button" id="search">Search</button>
       <button type="button" id="cancel">X</button>
    </div>
  `;

  const input: HTMLInputElement | null = searchBox.querySelector("#searchBox");
  const cancelBtn: HTMLButtonElement | null =
    searchBox.querySelector("#cancel");
  const searchBtn = searchBox.querySelector("#search");
  //search
  const handleSearch = () => {
    const searchQuery = input?.value.toLowerCase().trim();
    if (searchQuery !== "" && typeof searchQuery === "string") {
      setSearch(searchQuery);
      renderApp();
    } else {
      alert("Please enter somthing !");
    }
  };
  //cancel
  const handleCancel = () => {
    if (input != null) {
      input.value = "";
      clearSearch();
    }
    renderApp();
  };
  //control all events here
  searchBtn?.addEventListener("click", handleSearch);
  cancelBtn?.addEventListener("click", handleCancel);

  return searchBox;
}
