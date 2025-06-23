function showApp() {
  document.getElementById("main").innerHTML = `
    <div class="page-content">
      <h1>Home Page</h1>
      <p>Select an option from the sidebar.</p>
    </div>
  `;
}

function navigate(section) {
  document.getElementById("main").innerHTML = `
    <div class="page-content">
      <h1>${section.replace('-', ' ').toUpperCase()}</h1>
      <p>Welcome to the ${section} section.</p>
    </div>
  `;
}


const customers = [
  {
    name: "Arun Arora",
    email: "arun5454@gmail.com",
    team: "Demo",
    phone: "+918799521454",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Bryan Bizlem",
    email: "bryan@bizlemdigital.com",
    team: "Demo",
    phone: "+918799521454",
    avatar: "https://randomuser.me/api/portraits/men/33.jpg"
  },
  {
    name: "Amit Ajmera",
    email: "amit.ajmera@larsentoubro.com",
    team: "Demo",
    phone: "+918799521454",
    avatar: "https://randomuser.me/api/portraits/men/34.jpg"
  },
  {
    name: "Nikhil Sharma",
    email: "nikhilsharma2@larsentoubro.com",
    team: "Demo",
    phone: "+918799521454",
    avatar: "https://randomuser.me/api/portraits/men/35.jpg"
  }
];

let currentPage = 1;
const rowsPerPage = 2;

function renderTable() {
  const tbody = document.getElementById('customerTable');
  tbody.innerHTML = "";
  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const currentData = customers.slice(start, end);

  currentData.forEach(c => {
    const row = `
      <tr>
        <td><img src="${c.avatar}">${c.name}</td>
        <td>${c.email}</td>
        <td>${c.team}</td>
        <td>${c.phone}</td>
        <td>
          <i class="fas fa-eye"></i>
          <i class="fas fa-edit"></i>
          <i class="fas fa-trash"></i>
        </td>
      </tr>`;
    tbody.insertAdjacentHTML("beforeend", row);
  });

  renderPagination();
}

function renderPagination() {
  const totalPages = Math.ceil(customers.length / rowsPerPage);
  const pageContainer = document.getElementById('pages');
  pageContainer.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const page = document.createElement("button");
    page.textContent = i;
    page.style.padding = "4px 8px";
    page.style.margin = "0 3px";
    if (i === currentPage) page.style.background = "#9333ea";
    page.onclick = () => {
      currentPage = i;
      renderTable();
    };
    pageContainer.appendChild(page);
  }
}

document.getElementById("prevBtn").onclick = () => {
  if (currentPage > 1) {
    currentPage--;
    renderTable();
  }
};

document.getElementById("nextBtn").onclick = () => {
  if (currentPage < Math.ceil(customers.length / rowsPerPage)) {
    currentPage++;
    renderTable();
  }
};

document.getElementById("searchInput").addEventListener("input", e => {
  const val = e.target.value.toLowerCase();
  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(val) ||
    c.email.toLowerCase().includes(val)
  );
  renderTable(filtered);
});

renderTable();



