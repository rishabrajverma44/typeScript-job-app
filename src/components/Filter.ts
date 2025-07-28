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

  //search debounce function
  function debounce(func: any, delay: number) {
    let timeout: number;
    return function (...args: any[]) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

  // function debounce() {
  //   setTimeout(() => {
  //     const searchQuery = inputSearch?.value.toLowerCase().trim();
  //     if (searchQuery !== "" && typeof searchQuery === "string") {
  //       setSearch(searchQuery);
  //     }
  //   }, 1000);
  // }

  // Function to be debounce
  function search(query: string) {
    setSearch(query);
  }

  // Create a debounced version of the search function
  const dSearch = debounce(search, 1000);

  const handleSearch = (e: KeyboardEvent) => {
    if (e.key === "Enter") return e.preventDefault();
    const query = inputSearch?.value.toLowerCase().trim() || "";
    dSearch(query);
  };
  //cancel
  const handleCancel = () => {
    if (inputSearch != null) {
      clearSearch();
      dSearch("");
    }
  };

  //control all events here
  window.addEventListener("load", () => setSearch(searchValue));
  inputSearch?.addEventListener("keyup", (e) => handleSearch(e));
  cancelBtn?.addEventListener("click", handleCancel);

  return searchBox;
}
