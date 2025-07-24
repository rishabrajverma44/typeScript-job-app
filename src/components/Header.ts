export function Header() {
  const Header = document.createElement("div");
  Header.className = "counter";
  //header :
  const total = 5;
  const applied = 7;
  const interviewing = 3;
  const hired = 2;
  const rejected = 6;
  Header.innerHTML = `
     <div class="header">
       <h2>Job Application Tracker</h2>
         <p>
           <span>Job Application : ${total}</span> 
           <span>Applied : ${applied}</span> 
           <span>Interviewing : ${interviewing}</span> 
           <span>Hired : ${hired}</span> 
           <span>Rejected : ${rejected}</span>
        </p>
     </div>`;

  return Header;
}
