import { getFormState } from "../app.state";

export function FormNew() {
  const formState = getFormState();
  const formDiv = document.createElement("div");
  formDiv.className = "main-form";
  const form = document.createElement("form");
  const newFormDiv = document.createElement("div");
  newFormDiv.id = "applicationForm";
  //
  //error handler
  const addValidation = (
    input: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
    error: HTMLSpanElement
  ) => {
    input.addEventListener("input", () => {
      if (!input.value.trim()) {
        input.style.borderColor = "red";
        error.style.display = "block";
      } else {
        input.style.borderColor = "";
        error.style.display = "none";
      }
    });
  };

  //creating separate blocks for input filed and there legends //

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
    required: boolean;
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
        selectElement.append(optionElement);
      });
      inputFieldElement = selectElement;
    } else if (type === "textarea") {
      const textElement = document.createElement(type);
      textElement.value = value;
      textElement.rows = 3;
      textElement.placeholder = placeholder;
      textElement.id = id;
      inputFieldElement = textElement;
    } else if (type === "input") {
      const inputElement = document.createElement(type);
      inputElement.value = value;
      inputElement.placeholder = placeholder;
      inputElement.id = id;
      inputFieldElement = inputElement;
    }
    //error span can be added here
    const errorSpan = document.createElement("span");
    errorSpan.className = "validation-error";
    errorSpan.id = `error-${id}`;
    errorSpan.textContent = `Enter ${lable.toLowerCase()}`;
    errorSpan.style.display = "none";

    //append field level, field input, field error span here
    newFormDiv.appendChild(lableElement);
    newFormDiv.appendChild(inputFieldElement);
    newFormDiv.appendChild(errorSpan);

    //attach validation after html-fields are added
    if (required) addValidation(inputFieldElement, errorSpan);
  };
  createFields({
    id: "company",
    lable: "company name",
    placeholder: "Enter company name",
    value: "",
    type: "input",
    required: true,
  });
  createFields({
    id: "notes",
    lable: "Notes",
    placeholder: "Enter notes",
    value: "",
    type: "textarea",
    required: false,
  });

  createFields({
    id: "jobType",
    lable: "Job Type",
    placeholder: "",
    value: "",
    type: "select",
    options: ["Remote", "Onsite", "Hybrid"],
    required: true,
  });

  form.appendChild(newFormDiv);
  formDiv.appendChild(form);
  return formDiv;
}
