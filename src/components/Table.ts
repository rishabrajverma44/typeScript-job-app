import { getAllFormItems } from "../app.state";

export function Table() {
  //get current state
  const tableDiv = document.createElement("div");
  const formDatas = getAllFormItems();
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
          <td>${form.location}</td>
          <td>${form.date}</td>
          <td>${form.status}</td>
          <td>${form.notes}</td>
          <td >
            <button >Edit</button>
            <button >Delete</button>
          </td>
        </tr>`
          )
          .join("")}
       </tbody>
     </table>
     `;

  return tableDiv;
}
