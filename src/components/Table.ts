export function Table() {
  //get current state
  const tableDiv = document.createElement("div");
  tableDiv.className = "table-main";
  tableDiv.innerHTML = `
  <table>
    <thead>
      <tr><th>Company</th><th>Role</th><th>Job-Type</th><th>Location</th><th>Date</th><th>status</th><th>notes</th><th>Actions</th></tr>
    </thead>
    <tbody>
        <tr>
          <td>company name</td>
          <td>role</td>
          <td>job type</td>
          <td>location</td>
          <td>date</td>
          <td>status</td>
          <td>notes</td>
          <td >
            <button >Edit</button>
            <button >Delete</button>
          </td>
        </tr>
       </tbody>
     </table>
     `;

  return tableDiv;
}
