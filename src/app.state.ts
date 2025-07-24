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
//export for table data
export function getAllFormItems() {
  return state.forms;
}
//export current state of form
export function getFormState() {
  return state.form;
}
export function deleteById(id: string) {
  console.log(id);
  const filterForm = state.forms.filter((item) => item.Id !== id);
  state.forms = filterForm;
  saveToStorage();
}
export function formEdidMood(id: string) {
  if (id) {
    const currentForm: formInterface | any = state.forms.find(
      (form) => form.Id === id
    );
    state.form = currentForm;
  }
}
export function setForm(form: formInterface) {
  if (form.Id != null) {
    //update
    const index = state.forms.findIndex((item) => item.Id == form.Id);
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
