export function Form() {
  const formDiv = document.createElement("div");
  formDiv.className = "main-form";
  formDiv.innerHTML = `
   <div id='applicationForm'>
      <label for="company">Company Name:</label>
      <input type="text" id="company" placeholder="Company name" />

      <label for="role">Role:</label>
      <input type="text" id="role" placeholder="Enter role"/>

      <label for="jobType">Job Type:</label>
      <select id="jobType">
        <option value="" disabled >Select job type</option>
        <option value="Remote">Remote</option>
        <option value="Onsite">Onsite</option>
        <option value="Hybrid">Hybrid</option>
      </select>

      <label for="location" id="locationLabel">Location:</label>
      <input type="text" id="location" placeholder="Enter location" />

      <label for="date">Application Date:</label>
      <input type="date" id="date" />

      <label for="status">Application Status:</label>
      <select id="status" class="form-control">
        <option value="" disabled>Select status</option>
        <option value="Applied">Applied</option>
        <option value="Interviewing">Interviewing</option>
        <option value="Rejected">Rejected</option>
        <option value="Hired">Hired</option>
      </select>

      <label for="notes">Notes:</label>
      <textarea id="notes" rows="3"></textarea>
      <button type="submit" id="submitBtn">
       Add Application
      </button>
    </div>
    `;

  //submit
  formDiv.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("submit btn trrigered");
  });

  return formDiv;
}
