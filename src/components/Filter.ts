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
  //   // Model form filter warrning ,
  //   filterModel.innerHTML = `
  //   <div id="mainModelSearch" style="display : none">
  //      <div id="customeModel" class="model">
  //       <div class="modal-container">
  //          <p>Please enter somthing !</p>
  //          <button id="closeModalBtn">Close</button>
  //       </div>
  //   </div>
  //   </div>
  // `;
  searchBox.appendChild(filterModel);
  //model CLOse
  // const closeBtn = filterModel.querySelector("#closeModalBtn");
  // closeBtn?.addEventListener("click", () => {
  //   document.getElementById("mainModelSearch")!.style.display = "none";
  // });

  const inputSearch: HTMLInputElement | null =
    searchBox.querySelector("#searchBox");
  const cancelBtn: HTMLButtonElement | null =
    searchBox.querySelector("#cancel");
  const inputValue = "";

  //search
  function debounce() {
    setTimeout(() => {
      const searchQuery = inputSearch?.value.toLowerCase().trim();
      if (searchQuery !== "" && typeof searchQuery === "string") {
        setSearch(searchQuery);
        // renderApp();
      } else {
        // const openModel = document.getElementById("mainModelSearch");
        // openModel!.style.display = "block";
        // if (inputSearch != null) {
        //   inputSearch.value = "";
        // }
      }
    }, 1000);
  }
  //setSearch(searchValue);
  const handleSearch = (e: any) => {
    if (e.key == "Enter") return e.preventDefault();
    debounce();
  };
  //cancel
  const handleCancel = () => {
    if (inputSearch != null) {
      clearSearch();
    }
  };

  //control all events here
  window.addEventListener("load", () => setSearch(searchValue));
  inputSearch?.addEventListener("keyup", (e) => handleSearch(e));
  cancelBtn?.addEventListener("click", handleCancel);

  return searchBox;
}
