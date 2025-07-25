import { getFormState, setForm, setFormStatus } from "../app.state";
import { renderApp } from "./App";

export function Form() {
  const formDiv = document.createElement("div");
  const formState = getFormState();
  formDiv.className = "main-form";
  const form = document.createElement("form");
  formDiv.appendChild(form);
  formDiv.innerHTML = `<form>
  <div id='applicationForm'>
      <label for="company">Company Name:</label>
      <input type="text" id="company" placeholder="Company name" value="${
        formState.company || ""
      }"  />
      <span class="validation-error" id="errorCompany">Enter company name</span>

      <label for="role">Role:</label>
      <input type="text" id="role" placeholder="Enter role" value="${
        formState.role || ""
      }" />
      <span class="validation-error" id="errorJobRole">Enter job role</span>

      <label for="jobType">Job Type:</label>
      <select id="jobType">
        <option value="" disabled ${
          !formState.jobType ? "selected" : ""
        }>Select job type</option>
        <option value="Remote" ${
          formState.jobType === "Remote" ? "selected" : ""
        }>Remote</option>
        <option value="Onsite" ${
          formState.jobType === "Onsite" ? "selected" : ""
        }>Onsite</option>
        <option value="Hybrid" ${
          formState.jobType === "Hybrid" ? "selected" : ""
        }>Hybrid</option>
      </select>
      <span class="validation-error" id="errorJobType">Select job type</span>

      <label for="location" id="locationLabel">Location:</label>
      <input type="text" id="location" placeholder="Enter location" value="${
        formState.location || ""
      }" />
      <span class="validation-error" id="errorLocation">Enter location</span>

      <label for="date">Application Date:</label>
      <input type="date" id="date" value="${formState.date || ""}" />
      <span class="validation-error" id="errorDate">Select date</span>

      <label for="status">Application Status:</label>
      <select id="status" class="form-control">
        <option value="" disabled ${
          !formState.status ? "selected" : ""
        }>Select status</option>
        <option value="Applied" ${
          formState.status === "Applied" ? "selected" : ""
        }>Applied</option>
        <option value="Interviewing" ${
          formState.status === "Interviewing" ? "selected" : ""
        }>Interviewing</option>
        <option value="Rejected" ${
          formState.status === "Rejected" ? "selected" : ""
        }>Rejected</option>
        <option value="Hired" ${
          formState.status === "Hired" ? "selected" : ""
        }>Hired</option>
      </select>
      <span class="validation-error" id="errorJobStatus">Select job status</span>

      <label for="notes">Notes:</label>
      <textarea id="notes" rows="3">${formState.notes || ""}</textarea>

      <button type="submit" id="submitBtn">
        ${formState.Id ? "Update" : "Submit"} Application
      </button>
    </div>
    </form>
    `;

  // Grab all DOM elements inside the form
  const company: HTMLInputElement | null = formDiv.querySelector("#company");
  const role: HTMLInputElement | null = formDiv.querySelector("#role");
  const jobType: HTMLInputElement | null = formDiv.querySelector("#jobType");
  const location: HTMLInputElement | null = formDiv.querySelector("#location");
  const locationLabel: HTMLInputElement | null =
    formDiv.querySelector("#locationLabel");
  const date: HTMLInputElement | null = formDiv.querySelector("#date");
  const status: HTMLSelectElement | null = formDiv.querySelector("#status");
  const notes: HTMLInputElement | null = formDiv.querySelector("#notes");

  const errorCompany: HTMLElement | null =
    formDiv.querySelector("#errorCompany");
  const errorJobRole: HTMLElement | null =
    formDiv.querySelector("#errorJobRole");
  const errorJobType: HTMLElement | null =
    formDiv.querySelector("#errorJobType");
  const errorLocation: HTMLElement | null =
    formDiv.querySelector("#errorLocation");
  const errorDate: HTMLElement | null = formDiv.querySelector("#errorDate");
  const errorJobStatus: HTMLElement | null =
    formDiv.querySelector("#errorJobStatus");

  const toggleLocationField = () => {
    const isRemote = jobType?.value === "Remote";
    if (location && locationLabel && errorLocation) {
      location.disabled = isRemote;
      location.value = isRemote ? "" : location.value;
      // locationLabel.style.display = isRemote ? "none" : "block";
      // errorLocation.style.display =
      //   isRemote || jobType?.value === "" ? "none" : "block";
    }
  };

  jobType?.addEventListener("change", toggleLocationField);
  toggleLocationField();
  if (errorLocation) {
    errorLocation.style.display = "none";
  }
  //update state here
  const updateState = () => {
    const formData = {
      Id: formState.Id || null,
      company: company?.value.trim() || "",
      role: role?.value.trim() || "",
      jobType: jobType?.value || "",
      location: jobType?.value === "Remote" ? "" : location?.value.trim() || "",
      date: date?.value || "",
      status: status?.value || "",
      notes: notes?.value.trim() || "",
    };
    const isDirty = Object.values(formData).some(
      (val) => val !== "" && val !== null
    );
    setFormStatus(isDirty);
  };
  updateState();
  //validation check function
  const vlidation = () => {
    let isValid = true;
    //validation check
    const showError = (input: HTMLInputElement, errorElement: HTMLElement) => {
      if (!input.value.trim()) {
        errorElement.style.display = "block";
        input.style.borderColor = "red";
        isValid = false;
      } else {
        errorElement.style.display = "none";
        input.style.borderColor = "";
      }
    };

    if (company && role && date && errorCompany && errorJobRole && errorDate) {
      showError(company, errorCompany);
      showError(role, errorJobRole);
      showError(date, errorDate);
    }
    if (!jobType?.value && errorJobType && jobType) {
      errorJobType.style.display = "block";
      jobType.style.borderColor = "red";
      isValid = false;
    } else {
      if (errorJobType && jobType) {
        errorJobType.style.display = "none";
        jobType.style.borderColor = "";
      }
    }
    //if not remote then only check location error
    if (jobType?.value !== "Remote" && location && errorLocation) {
      showError(location, errorLocation);
    }

    if (!status?.value && errorJobStatus && status) {
      errorJobStatus.style.display = "block";
      status.style.borderColor = "red";
      isValid = false;
    } else {
      if (errorJobStatus && status) {
        errorJobStatus!.style.display = "none";
        status.style.borderColor = "";
      }
    }
    return isValid;
  };

  //
  [company, role, jobType, location, date, status, notes].forEach((el) => {
    el?.addEventListener("change", updateState);
  });

  // Hide error spans innitially
  [
    errorCompany,
    errorJobRole,
    errorJobType,
    errorLocation,
    errorJobStatus,
    errorDate,
  ].forEach((el) => {
    if (el) {
      return (el.style.display = "none");
    }
  });

  //submit
  formDiv.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!vlidation()) return;
    // Prepare form
    const formData = {
      Id: formState.Id ? formState.Id : null,
      company: company?.value.trim() || "",
      role: role?.value.trim() || "",
      jobType: jobType?.value || "",
      location: jobType?.value === "Remote" ? "" : location?.value.trim() || "",
      date: date?.value || "",
      status: status?.value || "",
      notes: notes?.value.trim() || "",
    };

    setForm(formData);
    renderApp();
  });

  return formDiv;
}
