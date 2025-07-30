import { clearSearch, searchState, setSearch } from "../app.state";

export function Search() {
  const searchBox = document.createElement("div");
  const filterModel = document.createElement("div");
  //get current search state
  const searchValue = searchState();
  searchBox.innerHTML = `
    <div class='search'>
       <input id="searchBox" placeholder="Search" value="${searchValue}"/>
       <button type="button" id="cancel">X</button>
    </div>
  `;
  //append
  searchBox.appendChild(filterModel);
  const inputSearch: HTMLInputElement | null =
    searchBox.querySelector("#searchBox");
  const cancelBtn: HTMLButtonElement | null =
    searchBox.querySelector("#cancel");
  // Function to be debounce
  function search(query: string) {
    setSearch(query);
  }

  const handleSearch = (e: KeyboardEvent) => {
    if (e.key === "Enter") return e.preventDefault();
    const query = inputSearch?.value.toLowerCase().trim() || "";
    search(query);
  };
  //cancel
  const handleCancel = () => {
    if (inputSearch != null) {
      clearSearch();
      search("");
    }
  };

  //control all events here
  window.addEventListener("load", () => setSearch(searchValue));
  inputSearch?.addEventListener("keyup", (e) => handleSearch(e));
  cancelBtn?.addEventListener("click", handleCancel);

  return searchBox;
}
