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

export function getAllFormItems() {
  return state.forms;
}
export function formEdidMood() {}
export function setForm(form: formInterface) {
  if (form.Id != null) {
    //update
    const index = state.forms.find((item) => item.Id == form.Id);
    console.log(index);
  } else {
    //add
    form.Id = generateId();
    state.forms.push(form);
  }
  saveToStorage();
  console.log(state);
}
