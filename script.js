const submitBtn = document.getElementById("submit");
const btnText = submitBtn.innerText;
const inputField = document.getElementById("input-field");
const tableData = document.getElementById("table-data");

let dataArray = JSON.parse(localStorage.getItem("data")) || [];
let edit_id = null;

displayData();

submitBtn.addEventListener("click", () => {
  if (inputField.value === "") {
    errorMessage();
  } else {
    const data = inputField.value;
    if (edit_id != null) {
      dataArray.splice(edit_id, 1, { data: data });
      edit_id = null;
    } else {
      dataArray.push({ data: data });
    }
    showMessage();
  }

  saveData(dataArray);
  inputField.value = "";
});
function showMessage() {
  const addMessage = document.getElementById("add-message");

  addMessage.classList.add("show-message");

  setTimeout(function () {
    addMessage.classList.remove("show-message");
  }, 1500);
}
function errorMessage() {
  const overalay = document.getElementById("overlay");
  const error = document.getElementById("error-message");

  overalay.classList.add("show-overlay");
  error.classList.add("show-error");

  setTimeout(function () {
    overalay.classList.remove("show-overlay");
    error.classList.remove("show-error");
  }, 1500);
}
function saveData(dataArray) {
  localStorage.setItem("data", JSON.stringify(dataArray));
  displayData();
}

function displayData() {
  let userData = "";
  dataArray.forEach((data, index) => {
    userData += `
        <tr>
            <th>${index + 1}</th>
            <td>${data.data}</td>
            <td><div class="icon-wrapper"><i class="fa-solid fa-pen-to-square icon" id="edit-icon" onclick="editData(${index})"></i></div></td>
            <td><div class="icon-wrapper"><i class="fa-solid fa-trash-can icon" id="delete-icon" onclick="deleteData(${index})"></i></div></td>
        </tr>`;
  });
  tableData.innerHTML = userData;
  submitBtn.innerText = btnText;
}

function editData(id) {
  edit_id = id;
  inputField.value = dataArray[id].data;
  submitBtn.innerText = "Edit";
}

function deleteData(id) {
  dataArray.splice(id, 1);
  saveData(dataArray);
}

// ================ SEARCH FILTER ================ //

const tableRow = document.querySelectorAll(".table tr");
const searchInput = document.getElementById("search-input");

searchInput.addEventListener("input", (e) => {
  const searchData = e.target.value.toLowerCase();
  tableData.innerHTML = "";
  tableRow.forEach((row) => {
    tdInRow = row.querySelectorAll("td");

    if (tdInRow[0].innerText.toLowerCase().indexOf(searchData) > -1) {
      tableData.appendChild(row);
    }
  });
  if (tableData.innerHTML == "") {
    tableData.innerHTML = "No Records Found";
  }
});
