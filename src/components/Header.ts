import { getStatus } from "../app.state";

export function Header() {
  const status = getStatus();

  const headerContainer = document.createElement("div");
  headerContainer.className = "counter";

  const headerElement = document.createElement("header");
  headerElement.className = "header";
  headerElement.setAttribute("role", "banner");
  headerElement.setAttribute("aria-label", "Job Application Tracker Header");

  const title = document.createElement("h2");
  title.textContent = "Job Application Tracker";

  const statusParagraph = document.createElement("p");
  statusParagraph.setAttribute("aria-label", "Job application status summary");

  const spanTotal = document.createElement("span");
  spanTotal.textContent = `Job Applications: ${status.Total}`;
  spanTotal.setAttribute(
    "aria-label",
    `Total job applications: ${status.Total}`
  );

  const spanApplied = document.createElement("span");
  spanApplied.textContent = `Applied: ${status.Applied}`;
  spanApplied.setAttribute("aria-label", `Applied jobs: ${status.Applied}`);

  const spanInterviewing = document.createElement("span");
  spanInterviewing.textContent = `Interviewing: ${status.Interviewing}`;
  spanInterviewing.setAttribute(
    "aria-label",
    `Jobs in interview stage: ${status.Interviewing}`
  );

  const spanHired = document.createElement("span");
  spanHired.textContent = `Hired: ${status.Hired}`;
  spanHired.setAttribute(
    "aria-label",
    `Jobs you got hired for: ${status.Hired}`
  );

  const spanRejected = document.createElement("span");
  spanRejected.textContent = `Rejected: ${status.Rejected}`;
  spanRejected.setAttribute(
    "aria-label",
    `Rejected applications: ${status.Rejected}`
  );

  // append app spn here
  statusParagraph.appendChild(spanTotal);
  statusParagraph.appendChild(document.createTextNode(" "));
  statusParagraph.appendChild(spanApplied);
  statusParagraph.appendChild(document.createTextNode(" "));
  statusParagraph.appendChild(spanInterviewing);
  statusParagraph.appendChild(document.createTextNode(" "));
  statusParagraph.appendChild(spanHired);
  statusParagraph.appendChild(document.createTextNode(" "));
  statusParagraph.appendChild(spanRejected);

  // tittle and paragraph append to header
  headerElement.appendChild(title);
  headerElement.appendChild(statusParagraph);
  headerContainer.appendChild(headerElement);

  return headerContainer;
}
