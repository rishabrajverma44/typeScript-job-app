import { Form } from "./Form";

export function renderApp() {
  const root = document.getElementById("app");
  const app = document.createElement("div");
  app.className = "my-app";
  //insert elements in seperate div with class name my-app
  app.appendChild(Form());
  root?.append(app);
}
