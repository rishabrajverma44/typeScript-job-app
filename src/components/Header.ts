import { getStatus } from "../app.state";

export function Header() {
  const Header = document.createElement("div");
  Header.className = "counter";
  //header :
  const status = getStatus();
  Header.innerHTML = `
     <div class="header">
       <h2>Job Application Tracker</h2>
         <p>
           <span>Job Application : ${status.Total}</span> 
           <span>Applied : ${status.Applied}</span> 
           <span>Interviewing : ${status.Interviewing}</span> 
           <span>Hired : ${status.Hired}</span> 
           <span>Rejected : ${status.Rejected}</span>
        </p>
     </div>`;

  return Header;
}
