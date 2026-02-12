const Library = []

function Book(author, title, pages,read){
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.id = crypto.randomUUID();
    this.author=author;
    this.title=title;
    this.pages=pages;
    this.read=read;
}

function addBook(){
    let author="Me", title="Hello", pages=100, read=false;
    let newBook = new Book(author,title,pages,read);
    Library.push(newBook);
}

function displayBook() {
  
  bookList.innerHTML = ""; // clear before re-render

  Library.forEach(book => {
    bookList.innerHTML += `
      <div class="book">
        <h3>${book.title}</h3>
        <p>${book.author}</p>
        <p>${book.pages}</p>
        <div class="${book.read ? "read-complete" : "read-not"}">
          ${book.read ? "Read" : "Yet to Read"}
        </div>
      </div>
    `;
  });
}

function createButton(){
  const addButton=document.createElement("button");
  addButton.setAttribute("id","add-book-button");
  addButton.setAttribute("class","add-book-button");

  buttonArea.appendChild(addButton);
  return addButton;
}

function handleButton(){
  if (Library.length>30){
    alert("No more books can be added due to finiteness of space!");
    return;
  }
  
}


//html rendering
const bookList = document.getElementById("book-list");
const buttonArea = document.getElementById("button-area")


const addBookButton = createButton();
for(let i=0;i<10;i++) addBook();
displayBook();

addBookButton.addEventListener("click", handleButton);