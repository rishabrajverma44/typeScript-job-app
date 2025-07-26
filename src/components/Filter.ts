import { clearSearch, searchState, setSearch } from "../app.state";
import { renderApp } from "./App";

export function Search() {
  const searchBox = document.createElement("form");
  const filterModel = document.createElement("div");
  //get current search state
  const searchValue = searchState();
  searchBox.innerHTML = `
    <div class='search'>
       <input id="searchBox" placeholder="Search" value="${searchValue}"/>
       <button type="button" id="search">Search</button>
       <button type="button" id="cancel">X</button>
    </div>
  `;
  // Model form filter warrning ,
  filterModel.innerHTML = `
  <div id="mainModelSearch" style="display : none">
     <div id="customeModel" class="model">
      <div class="modal-container">
         <p>Please enter somthing !</p>
         <button id="closeModalBtn">X</button>
      </div>
  </div>
  </div>
`;
  searchBox.appendChild(filterModel);
  //model CLOse
  const closeBtn = filterModel.querySelector("#closeModalBtn");
  closeBtn?.addEventListener("click", () => {
    document.getElementById("mainModelSearch")!.style.display = "none";
  });

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
      const openModel = document.getElementById("mainModelSearch");
      openModel!.style.display = "block";
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
