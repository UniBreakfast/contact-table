const table = document.getElementById("table");
const [addForm, editForm] = document.forms;
const cancelBtn = editForm.querySelector(".cancel");

const contacts = [];

table.onclick = handleClick;
addForm.onsubmit = handleAdd;
editForm.onsubmit = handleUpdate;
cancelBtn.onclick = disableEdit;

function handleClick(e) {
  const btn = e.target.closest("button");

  if (!btn) return;

  const row = btn.closest("tr");

  if (btn.matches(".delete")) {
    row.remove();
    updateIndices();

  } else if (btn.matches(".edit")) {
    enableEdit(row);
  }
}

function handleAdd(e) {
  e.preventDefault();

  const contact = Object.fromEntries(new FormData(addForm));
  
  addContact(contact);
}

function handleUpdate(e) {
  e.preventDefault();

  const contact = Object.fromEntries(new FormData(editForm));

  updateContact(contact);
}

function addContact(contact) {
  const row = table.insertRow();

  row.insertCell().append(row.rowIndex);
  row.insertCell().append(contact.name);
  row.insertCell().append(contact.phone);
  row.insertCell().append(contact.email);
  row.insertCell().innerHTML = `
    <button class="edit">Edit</button>
    <button class="delete">Delete</button>
  `;
}

function updateContact(contact) {
  const row = document.createElement("tr");

  table.rows[contact.index].replaceWith(row);

  for (const key in contact) {
    row.insertCell().append(contact[key]);
  }

  row.insertCell().innerHTML = `
    <button class="edit">Edit</button>
    <button class="delete">Delete</button>
  `;

  addForm.hidden = false;
  editForm.hidden = true;

  enableButtons();
}

function updateIndices() {
  for (const row of table.tBodies[0].rows) {
    row.cells[0].textContent = row.rowIndex;
  }
}

function enableEdit(row) {
  addForm.hidden = true;
  editForm.hidden = false;

  disableButtons();

  const contact = {
    index: row.cells[0].textContent,
    name: row.cells[1].textContent,
    phone: row.cells[2].textContent,
    email: row.cells[3].textContent,
  };
  
  for (const key in contact) {
    editForm[key].setAttribute("value", contact[key]);
  }
}

function disableEdit() {
  addForm.hidden = false;
  editForm.hidden = true;

  enableButtons();
}

function disableButtons() {
  for (const btn of table.querySelectorAll("button")) {
    btn.disabled = true;
  }
}

function enableButtons() {
  for (const btn of table.querySelectorAll("button")) {
    btn.disabled = false;
  }
}
