import { Search } from "./Filter";
import { Form } from "./Form";
import { Header } from "./Header";
import { Table } from "./Table";

export function renderApp() {
  const root = document.getElementById("app");
  if (root) {
    root.innerHTML = "";
  }

  const app = document.createElement("div");
  app.className = "my-app";

  //insert elements in seperate div with class name my-app
  app.appendChild(Header());

  const mainDiv = document.createElement("div");
  mainDiv.className = "main-div";

  const formDiv = document.createElement("div");
  formDiv.className = "form-div";

  formDiv.appendChild(Search());
  formDiv.appendChild(Table());

  mainDiv.appendChild(Form());
  mainDiv.appendChild(formDiv);

  app.appendChild(mainDiv);

  root?.append(app);
}
