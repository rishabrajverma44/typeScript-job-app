export function renderApp() {
  const root = document.getElementById("app");
  const app = document.createElement("div");
  app.className = "my-app";
  app.innerHTML = "<h1>app file</h1>";
  //insert elements in seperate div with class name my-app

  root?.append(app);
}
