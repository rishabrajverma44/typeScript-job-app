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

  // Create a debounced version of the search function
  const handleChange = (e: any) => {
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
  inputSearch?.addEventListener("change", (e) => handleChange(e));
  //inputSearch?.addEventListener("keyup", (e) => handleSearch(e));
  cancelBtn?.addEventListener("click", handleCancel);

  return searchBox;
}
