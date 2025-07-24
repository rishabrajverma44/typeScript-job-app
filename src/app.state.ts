import { saveToStorage } from "./app.storage";
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
};
// for table data
export function getAllFormItems() {
  return state.forms;
}
// current state of single form
export function getFormState() {
  return state.form;
}
// delete by id
export function deleteById(id: string) {
  console.log(id);
  const filterForm = state.forms.filter((form) => form.Id !== id);
  state.forms = filterForm;
  saveToStorage();
}
// edit by id
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
