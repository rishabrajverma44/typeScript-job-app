import { clearSearch, searchState, setSearch } from "../app.state";

export function Search() {
  const searchBox = document.createElement("div");
  const filterModel = document.createElement("div");
  //get current search state
  const searchValue = searchState();
  searchBox.innerHTML = `
    <div class='search'>
       <input id="searchBox" placeholder="Search" type ="text" value="${searchValue}"/>
       <button type="button" id="cancel">X</button>
       <button type="button" id="search">Search</button>
    </div>
  `;
  //append
  searchBox.appendChild(filterModel);
  const inputSearch: HTMLInputElement | null =
    searchBox.querySelector("#searchBox");
  const cancelBtn: HTMLButtonElement | null =
    searchBox.querySelector("#cancel");
  const btnInput: HTMLInputElement | null = searchBox.querySelector("#search");

  // Create a debounced version of the search function
  const handleSearch = function (e: any) {
    console.log(e);
    const query = inputSearch?.value.toLowerCase().trim() || "";
    setSearch(query);
  };

  //cancel
  const handleCancel = () => {
    if (inputSearch != null) {
      clearSearch();
      setSearch("");
    }
  };

  //control all events here
  window.addEventListener("load", () => setSearch(searchValue));
  btnInput?.addEventListener("click", handleSearch);
  cancelBtn?.addEventListener("click", handleCancel);

  return searchBox;
}
