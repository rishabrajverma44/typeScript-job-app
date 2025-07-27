import {
  deleteById,
  formEdidMood,
  getAllFormItems,
  getFormStatus,
  searchState,
} from "../app.state";

export function Table() {
  //get current state
  const formDatas = getAllFormItems();
  const tableDiv = document.createElement("div");
  const model = document.createElement("div");
  const modelDelete = document.createElement("div");
  tableDiv.className = "table-main";
  console.log(formDatas);
  tableDiv.innerHTML = `
  <table>
    <thead>
      <tr><th>Company</th><th>Role</th><th>Job-Type</th><th>Location</th><th>Date</th><th>status</th><th>notes</th><th>Actions</th></tr>
    </thead>
    <tbody>
        ${formDatas
          .map(
            (form) => `<tr role="row">
          <td role="cell">${form.company}</td>
          <td role="cell">${form.role}</td>
          <td role="cell">${form.jobType}</td>
          <td role="cell">${form.location === "" ? "N/A" : form.location}</td>
          <td role="cell">${form.date}</td>
          <td role="cell" style="color:${
            form.status === "Rejected"
              ? "red"
              : form.status === "Hired"
              ? "green"
              : ""
          }">${form.status}</td>
          <td role="cell" class="notes">${form.notes}</td>
          <td role="cell" class="action" >
            <button class="edit-btn" data-id=${form.Id}>Edit</button>
            <button class="delete-btn" data-id=${form.Id}>Delete</button>
          </td>
        </tr>`
          )
          .join("")}
       </tbody>
     </table>
     `;

  // Model form state saving,
  model.innerHTML = `
  <div role="alert" id="mainModel" style="display : none">
     <div id="customeModel" class="model">
      <div class="modal-container">
         <p>Please save unsaved data !</p>
         <button id="closeModalBtn">X</button>
      </div>
  </div>
  </div>
`;
  // Model for deleting form,
  modelDelete.innerHTML = `
  <div role="alert" id="mainModelDelete" style="display : none">
     <div id="customeModel" class="model">
      <div class="modal-container">
         <p>Are you sure want to delete ?</p>
          <button id="closeModalBtn1">no</button>
          <button id="confirmModalBtn">yes</button>
      </div>
  </div>
  </div>
`;

  tableDiv.appendChild(model);
  tableDiv.appendChild(modelDelete);
  if (formDatas.length === 0 && searchState() !== "") {
    tableDiv.innerHTML = `<table><h1 class="not-found"> No  search result result found !</h1></table>`;
  }
  if (formDatas.length === 0 && searchState() === "") {
    tableDiv.innerHTML = `<h1 class="not-found"> No form found !</h1>`;
  }

  //model
  const closeBtn = tableDiv.querySelector("#closeModalBtn");
  closeBtn?.addEventListener("click", () => {
    document.getElementById("mainModel")!.style.display = "none";
  });

  //close model delete
  const closeBtnDelete = tableDiv.querySelector("#closeModalBtn1");
  closeBtnDelete?.addEventListener("click", () => {
    document.getElementById("mainModelDelete")!.style.display = "none";
  });

  //delete
  tableDiv
    .querySelectorAll(".delete-btn")
    .forEach((deleteBtn: HTMLButtonElement | any) => {
      deleteBtn.addEventListener("click", () => {
        if (getFormStatus()) {
          const openModel = document.getElementById("mainModel");
          openModel!.style.display = "block";
        } else {
          const openModel = document.getElementById("mainModelDelete");
          openModel!.style.display = "block";
        }
        document
          .getElementById("confirmModalBtn")
          ?.addEventListener("click", () => {
            const id = deleteBtn.dataset.id;
            deleteById(id);
            // renderApp();
          });
      });
    });

  //edit
  tableDiv
    .querySelectorAll(".edit-btn")
    .forEach((editBtn: HTMLButtonElement | any) => {
      editBtn.addEventListener("click", () => {
        if (getFormStatus()) {
          const openModel = document.getElementById("mainModel");
          openModel!.style.display = "block";
        } else {
          const id = editBtn.dataset.id;
          formEdidMood(id);
          // renderApp();
        }
      });
    });

  return tableDiv;
}
