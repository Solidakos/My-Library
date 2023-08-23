window.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("color-mode");
  const theme = document.querySelector("data-bs-theme");

  function changeColor() {
    if (document.documentElement.getAttribute("data-bs-theme") === "light") {
      document.documentElement.setAttribute("data-bs-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-bs-theme", "light");
    }
  }
  button.addEventListener("click", changeColor);
});

let myLibrary = [];
const list = document.getElementById("myLibrary");
const modal = new bootstrap.Modal(document.getElementById("new-book-modal"));
const form = document.getElementById("book-form");
let myButton = document.getElementById("new-book");
let displayButton = document.getElementById("display");
let addBtn = document.getElementById("add-book");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return title + " by " + author + ", " + pages + " pages";
  };
}

function addBook(book) {
  myLibrary.push(book);
  displayBooks();
}

function displayBooks() {
  let li = document.createElement("li");
  li.dataset.index = myLibrary.length - 1;
  let div = document.createElement("class");
  let h5 = document.createElement("h5");
  let h6 = document.createElement("h6");
  let p = document.createElement("p");
  li.className = "card";
  div.className = "card-body";
  h5.className = "book-title";
  h6.className = "author";
  p.className = "pages";
  li.appendChild(div);
  div.appendChild(h5);
  div.appendChild(h6);
  div.appendChild(p);
  h5.innerText = myLibrary[myLibrary.length - 1].title;
  h6.innerText = myLibrary[myLibrary.length - 1].author;
  p.innerText = myLibrary[myLibrary.length - 1].pages + " pages";

  let readDiv = document.createElement("div");
  readDiv.className = "form-check";
  let readStatus = document.createElement("input");
  readStatus.className = "form-check-input";
  readStatus.type = "checkbox";
  readStatus.id = "read-check"
  let label = document.createElement("label");
  label.className = "form-check-label";
  label.htmlFor = "read-check"
  label.innerHTML = "Read";
  if(myLibrary[myLibrary.length-1].read == true){
    readStatus.checked = true;
  }

  readDiv.appendChild(readStatus);
  readDiv.appendChild(label);
  div.appendChild(readDiv);

  let deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-close position-absolute top-0 end-0";
  deleteBtn.ariaLabel = "Close";
  deleteBtn.id = "closeBtn";
  deleteBtn.style.margin = "8px";
  div.appendChild(deleteBtn);
  deleteBtn.addEventListener(
    "click",
    function () {
      deleteBook(li.dataset.index);
    },
    false
  );

  list.appendChild(li);
}

addBtn.onclick = (event) => {
  event.preventDefault();
  const title = form.elements[0].value;
  const author = form.elements[1].value;
  const pages = form.elements[2].value;
  const read = form.elements[3].checked;
  console.log(read);
  if (title.length === 0 || author.length === 0 || pages == 0) {
    document.getElementById("alert").innerHTML = "Please fill out all the fields!";
  } else {
    const newBook = new Book(title, author, pages, read);
    addBook(newBook);
    modal.hide();
    form.reset();
    document.getElementById("alert").innerHTML = "";
  }
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function deleteBook(x) {
  let book = document.querySelectorAll("[data-index]");
  book.forEach((element) => {
    if (element.dataset.index == x) {
      element.remove();
      delete myLibrary[x];
    }
  });
}
