import { loadFromStorage, saveToStorage } from "./app.storage";
import { generateId } from "./utils/id";

export interface formInterface {
  Id: string | null;
  company: string;
  role: string;
  jobType: string;
  location: string;
  date: string;
  status: string;
  notes: string;
}

interface stateInterface {
  forms: formInterface[];
  form: formInterface;
  searchQuery: string;
  formstatus: boolean;
}
export const state: stateInterface = {
  forms: [],
  form: {
    Id: null,
    company: "",
    role: "",
    jobType: "",
    location: "",
    date: "",
    status: "",
    notes: "",
  },
  searchQuery: "",
  formstatus: false,
};
// for table data
export function getAllFormItems() {
  return state.forms;
}
// current state of single form
export function getFormState() {
  return state.form;
}

export function setFormStatus(result: boolean) {
  state.formstatus = result;
}
export function getFormStatus() {
  return state.formstatus;
}
// delete by id
export function deleteById(id: string) {
  const filterForm = state.forms.filter((form) => form.Id !== id);
  state.forms = filterForm;
  saveToStorage();
}
// set edit form by id
export function formEdidMood(id: string) {
  if (id) {
    const currentForm: formInterface | any = state.forms.find(
      (form) => form.Id === id
    );
    state.form = currentForm;
  }
}
// update and add new form
export function setForm(form: formInterface) {
  if (form.Id != null) {
    //update
    const currentID = form.Id;
    const index = state.forms.findIndex((form) => form.Id === currentID);
    if (index !== -1) {
      state.forms[index] = form;
    }
  } else {
    //add
    form.Id = generateId();
    state.forms.push(form);
  }
  state.form = {
    Id: null,
    company: "",
    role: "",
    jobType: "",
    location: "",
    date: "",
    status: "",
    notes: "",
  };
  state.formstatus = false;
  saveToStorage();
}
// export header object for showing nubers
export function getStatus() {
  const status = {
    Total: state.forms.length,
    Applied: state.forms.filter((form) => form.status === "Applied").length,
    Interviewing: state.forms.filter((form) => form.status === "Interviewing")
      .length,
    Hired: state.forms.filter((form) => form.status === "Hired").length,
    Rejected: state.forms.filter((form) => form.status === "Rejected").length,
  };
  return status;
}

//search filter
export function setSearch(search: string) {
  const searchQuery = search.trim().toLowerCase();
  const filteredForms = state.forms.filter((form) => {
    return (
      form.company.toLowerCase().includes(searchQuery) ||
      form.role.toLowerCase().includes(searchQuery) ||
      form.jobType.toLowerCase().includes(searchQuery) ||
      form.location.toLowerCase().includes(searchQuery) ||
      form.status.toLowerCase().includes(searchQuery) ||
      form.notes.toLowerCase().includes(searchQuery)
    );
  });
  state.searchQuery = search;
  state.forms = filteredForms;
}
//export search state
export function searchState() {
  return state.searchQuery;
}
//clear
export function clearSearch() {
  state.searchQuery = "";
  loadFromStorage();
}
