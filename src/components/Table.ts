import { deleteById, formEdidMood, getAllFormItems } from "../app.state";
import { renderApp } from "./App";

export function Table() {
  //get current state
  const formDatas = getAllFormItems();
  const tableDiv = document.createElement("div");
  tableDiv.className = "table-main";
  tableDiv.innerHTML = `
  <table>
    <thead>
      <tr><th>Company</th><th>Role</th><th>Job-Type</th><th>Location</th><th>Date</th><th>status</th><th>notes</th><th>Actions</th></tr>
    </thead>
    <tbody>
        ${formDatas
          .map(
            (form) => `<tr>
          <td>${form.company}</td>
          <td>${form.role}</td>
          <td>${form.jobType}</td>
          <td>${form.location === "" ? "####" : form.location}</td>
          <td>${form.date}</td>
          <td style="color:${
            form.status === "Rejected"
              ? "red"
              : form.status === "Hired"
              ? "green"
              : ""
          }">${form.status}</td>
          <td>${form.notes}</td>
          <td class="action" >
            <button class="edit-btn" data-id=${form.Id}>Edit</button>
            <button class="delete-btn" data-id=${form.Id}>Delete</button>
          </td>
        </tr>`
          )
          .join("")}
       </tbody>
     </table>
     `;
  if (formDatas.length === 0) {
    tableDiv.style.display = "none";
  }
  //delete
  tableDiv
    .querySelectorAll(".delete-btn")
    .forEach((deleteBtn: HTMLButtonElement | any) => {
      deleteBtn.addEventListener("click", () => {
        if (confirm("Do you want to delete ?")) {
          const id = deleteBtn.dataset.id;
          deleteById(id);
          renderApp();
        }
      });
    });

  //edit
  tableDiv
    .querySelectorAll(".edit-btn")
    .forEach((editBtn: HTMLBRElement | any) => {
      editBtn.addEventListener("click", () => {
        const id = editBtn.dataset.id;
        formEdidMood(id);
        renderApp();
      });
    });

  return tableDiv;
}
