let Library = []

function Book(title,author, pages,read){
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.id = crypto.randomUUID();
    this.author=author;
    this.title=title;
    this.pages=pages;
    this.read=read;
}

function addBook(book){
    // let author="Me", title="Hello", pages=100, read=false;
    // let newBook = new Book(author,title,pages,read);
    Library.push(book);
}

function displayBook() {
  
  bookList.innerHTML = ""; // clear before re-render
  if (Library.length === 0) {
    bookList.innerHTML = "<h2>No books in the library.</h2>";
    return;
  }

  Library.forEach(book => {
    bookList.innerHTML += `
      <div class="book" id="${book.id}">
        <h3>${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>pages: ${book.pages}</p>
        <div class="${book.read ? "read-complete" : "read-not"}">
          ${book.read ? "Read" : "Yet to Read"}
        </div>
        <button class="remove-button" id="remove-${book.id}">Remove</button>
      </div>
    `;
  });

  const books = document.querySelectorAll(".book");
  // console.log(books);
  
  books.forEach(book => {
    const removeButton = book.querySelector(".remove-button");
    const haveRead = book.querySelector(".read-complete, .read-not");
    // console.log(removeButton);
    removeButton.addEventListener("click", () => {
      Library = Library.filter(b => b.id !== book.id);
      console.log("removed "+book.id);
      displayBook();
    });

    haveRead.addEventListener("click", () => {
      const bookInLibrary = Library.find(b => b.id === book.id);
      if (bookInLibrary) {
        console.log(`toggled read status of ${book}`);
        bookInLibrary.read = !bookInLibrary.read;
        displayBook();
      }else{
        console.error("Error toggling read status; dont know if this could happen");
      }
    });
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
  const formArea = createDialog();
  formArea.showModal();
}

function createDialog() {
  const dialog = document.createElement("dialog");
  dialog.innerHTML = `
    <form id="book-form">
      <label class="book-form-label">
        Enter Name of book
      </label>
      <input name="title" required />
      <label class="book-form-label">
        Enter Name of author
      </label>
      <input name="author" required />
      <label class="book-form-label">
        Enter number of pages
      </label>
      <input name="pages" type="number" required />
      <label>
        <input name="read" type="checkbox" />
        Read
      </label>
      <button type="submit">Add</button>
    </form>
  `;
  
  document.body.appendChild(dialog);

  const bookForm = dialog.querySelector("form");

  dialog.addEventListener('cancel', () => {
    console.log('Dialog dismissed via Escape key');
  });

  bookForm.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("submitted");
      const formData = new FormData(bookForm);
      const title = formData.get("title");
      const author = formData.get("author");
      const pages = formData.get("pages");
      const read = formData.get("read") === "on";
      const book = new Book(title,author,pages,read);
      addBook(book);
      displayBook();
      console.log(`Dialog closed via button`);
      
      dialog.close(); 
      console.log(`Library:${Library}`);
    });

    
    return dialog;
}



//html rendering
const bookList = document.getElementById("book-list");
const buttonArea = document.getElementById("button-area")


const addBookButton = createButton();
// for(let i=0;i<1;i++) addBook();
addBook(new Book("The Great Gatsby","F. Scott Fitzgerald",180,true));
displayBook();

addBookButton.addEventListener("click",handleButton);
addBookButton.addEventListener("click",()=>console.log(`clicked ${addBookButton.id}`));

