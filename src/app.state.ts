interface formInterface {
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

export function getAllFormItems() {}
export function formEdidMood() {}
export function setForm() {}
