import { getFormState, setForm, setFormStatus } from "../app.state";

export function Form() {
  const formState = getFormState();
  const formDiv = document.createElement("div");
  formDiv.className = "main-form";
  const form = document.createElement("form");
  form.setAttribute("aria-label", "Job Application Form");
  const newFormDiv = document.createElement("div");
  newFormDiv.id = "applicationForm";
  //form value
  const checkDirty = () => {
    const currentFormValues = {
      company:
        (document.getElementById("company") as HTMLInputElement)?.value || "",
      role: (document.getElementById("role") as HTMLInputElement)?.value || "",
      jobType:
        (document.getElementById("jobType") as HTMLSelectElement)?.value || "",
      location:
        (document.getElementById("location") as HTMLInputElement)?.value || "",
      date: (document.getElementById("date") as HTMLInputElement)?.value || "",
      notes:
        (document.getElementById("notes") as HTMLTextAreaElement)?.value || "",
    };

    return Object.entries(currentFormValues).some(
      ([key, val]) => (formState[key as keyof typeof formState] || "") !== val
    );
  };
  //
  setFormStatus(checkDirty());
  //error handler
  type ValidationItem = {
    input: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    error: HTMLSpanElement;
  };
  let validationObject: ValidationItem[] = [];
  const addValidation = (
    input: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
    error: HTMLSpanElement
  ) => {
    validationObject.push({ input, error });
    input.addEventListener("input", () => {
      if (!input.value.trim()) {
        input.style.borderColor = "red";
        error.style.display = "block";
      } else {
        input.style.borderColor = "";
        error.style.display = "none";
      }
      checkDirty();
    });
  };

  //creating separate blocks for input filed and there legends  using creteElement();//
  const createFields = ({
    id,
    lable,
    placeholder = "",
    value = "",
    type = "",
    required = true,
    options = [],
  }: {
    id: string;
    lable: string;
    placeholder?: string;
    value: string;
    type: string;
    required?: boolean;
    options?: string[];
  }) => {
    //here we can create labels
    const lableElement = document.createElement("label");
    lableElement.setAttribute("for", id);

    lableElement.textContent = lable;
    //create field here
    let inputFieldElement!:
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement;

    //distinguish there input type here and give value
    if (type === "select" && options.length > 0) {
      const selectElement = document.createElement(type);
      selectElement.id = id;
      selectElement.name = id;
      const placeholder = document.createElement("option");
      placeholder.textContent = `Select ${lable}`;
      placeholder.value = "";
      placeholder.selected = !value;
      placeholder.disabled = true;
      selectElement.append(placeholder);

      //add option for selection
      options.forEach((option) => {
        const optionElement = document.createElement("option");
        optionElement.textContent = option;
        optionElement.value = option;
        if (option === value) optionElement.selected = true;
        //condition for location dissable based on job type selection
        selectElement.append(optionElement);
      });
      inputFieldElement = selectElement;
    } else if (type === "textarea") {
      const textElement = document.createElement(type);
      textElement.value = value;
      textElement.rows = 3;
      textElement.placeholder = placeholder;
      textElement.id = id;
      textElement.name = id;
      inputFieldElement = textElement;
    } else if (type === "input") {
      const inputElement = document.createElement(type);
      inputElement.value = value;
      inputElement.placeholder = placeholder;
      inputElement.id = id;
      inputElement.name = id;
      inputFieldElement = inputElement;
    } else if (type === "date") {
      const dateElement = document.createElement("input");
      dateElement.type = type;
      dateElement.value = value;
      dateElement.id = id;
      dateElement.name = id;
      dateElement.placeholder = placeholder;
      inputFieldElement = dateElement;
    }
    //error span can be added here
    const errorSpan = document.createElement("span");
    errorSpan.className = "validation-error";
    errorSpan.id = `error-${id}`;
    errorSpan.textContent = `Enter ${lable.toLowerCase()}`;
    errorSpan.style.display = "none";
    errorSpan.setAttribute("role", "alert");

    //append field level, field input, field error span here
    newFormDiv.appendChild(lableElement);
    newFormDiv.appendChild(inputFieldElement);
    newFormDiv.appendChild(errorSpan);

    //add some aria
    inputFieldElement.setAttribute("aria-label", lable);
    //attach validation after html-fields are added
    if (required) {
      inputFieldElement.setAttribute("aria-required", "true");
      inputFieldElement.setAttribute("aria-describedby", `error-${id}`);
      addValidation(inputFieldElement, errorSpan);
    }
  };
  //call custome function for field creation
  createFields({
    id: "company",
    lable: "Company Name",
    placeholder: "Enter company name",
    value: formState.company,
    type: "input",
    required: true,
  });
  createFields({
    id: "role",
    lable: "Role",
    placeholder: "Enter Role",
    value: formState.role,
    type: "input",
    required: true,
  });
  createFields({
    id: "jobType",
    lable: "Job Type",
    placeholder: "",
    value: formState.jobType,
    type: "select",
    options: ["Remote", "Onsite", "Hybrid"],
    required: true,
  });
  createFields({
    id: "Location",
    lable: "Location",
    placeholder: "Enter location",
    value: formState.location,
    type: "input",
    required: false,
  });
  createFields({
    id: "date",
    lable: "Application Date",
    placeholder: "",
    value: formState.date,
    type: "date",
    required: true,
  });
  createFields({
    id: "status",
    lable: "Application Status",
    placeholder: "",
    value: formState.status,
    type: "select",
    required: true,
    options: ["Applied", "Interviewing", "Rejected", "Hired"],
  });
  createFields({
    id: "notes",
    lable: "Notes",
    placeholder: "Enter notes",
    value: formState.notes,
    type: "textarea",
    required: false,
  });
  //submit button
  const submitBtn = document.createElement("button");
  submitBtn.type = "button";
  submitBtn.id = "submitBtn";
  submitBtn.textContent = formState.Id ? "Update" : "Submit";

  //
  //submit
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // Prepare form
    let isValid = true;
    validationObject.forEach(({ input, error }) => {
      if (!input.value.trim()) {
        input.style.borderColor = "red";
        error.style.display = "block";
        isValid = false;
      }
    });
    if (!isValid) return;
    const formData = {
      Id: formState.Id ? formState.Id : null,
      company: (
        document.getElementById("company") as HTMLInputElement
      )?.value.trim(),
      role: (document.getElementById("role") as HTMLInputElement)?.value.trim(),
      jobType: (document.getElementById("jobType") as HTMLSelectElement)?.value,
      location: (
        document.getElementById("Location") as HTMLInputElement
      )?.value.trim(),
      date: (document.getElementById("date") as HTMLInputElement)?.value,
      status: (document.getElementById("status") as HTMLSelectElement)?.value,
      notes: (
        document.getElementById("notes") as HTMLTextAreaElement
      )?.value.trim(),
    };
    setForm(formData);
    //renderApp();
  });

  form.appendChild(newFormDiv);
  //after attaching form to dom add event listener
  const jobTypeInput = form.querySelector("#jobType") as HTMLSelectElement;
  const locationInput = form.querySelector("#Location") as HTMLInputElement;
  const locationError = form.querySelector(
    "#error-Location"
  ) as HTMLSpanElement;

  const toggleLocation = () => {
    const jobType = jobTypeInput.value;
    if (!locationInput || !locationError) return;

    if (jobType === "Remote") {
      locationInput.disabled = true;
      locationInput.value = "";
      locationInput.style.borderColor = "";
      locationError.style.display = "none";

      // Remove from validationObject if it exists
      validationObject = validationObject.filter(
        (v) => v.input.id !== locationInput.id
      );
    } else {
      locationInput.disabled = false;

      // Add back to validationObject if required and not already present
      const alreadyExists = validationObject.some(
        (v) => v.input.id === locationInput.id
      );
      if (!alreadyExists) {
        addValidation(locationInput, locationError);
      }
    }
  };

  toggleLocation();
  jobTypeInput.addEventListener("change", toggleLocation);

  newFormDiv.appendChild(submitBtn);
  formDiv.appendChild(form);

  return formDiv;
}
