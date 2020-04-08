/* important link on inheritance in JS: https://javascript.info/prototype-inheritance
 NOTE THAT THIS ALWAYS REFERS TO THE OBJECT ON WHICH IT IS CALLED!!!
 Imagine setter that modifies the name in the user obj like so: set name(name) {this.name = name;}
 then we have admin which inherits from user. admin.name('...') would chage only the admin object
 */

 ///////////////////////
////// variables //////
///////////////////////
let myLibrary = [];
const main = document.getElementById('main');
const addBtn = document.getElementById('add');

///////////////////////
////// functions //////
///////////////////////

// constructor for book
function Book(title, author, pages, alreadyRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.alreadyRead = alreadyRead;
}
// each book has this method that returns all the information
Book.prototype.info = function() {
    if(this.alreadyRead) return `${this.title}, ${this.author}, ${this.pages}, you have read this book already!`;
    else return `${this.title}, ${this.author}, ${this.pages}, you haven't read this book so far!`;
}

// adding books
function addBook(title, author, pages) {
    const newBook = new Book(title, author, pages);
    myLibrary.push(newBook);
    return newBook;
}

function deleteBook (book) {
    for (let i = 0; i < myLibrary.length; i++) {
        const b = myLibrary[i];
        if(b.title == book.title && b.author == book.author) {
            myLibrary.splice(i,1);
        }
        populateLibrary();  
    }
}

function modifyBook(book, newTitle, newAuthor, newPages) {
    if (newTitle != "") book.title = newTitle;
    if (newAuthor != "")book.author = newAuthor;
    if (typeof(parseInt(newPages)) != "number") alert("pages must be a number");
    else if (newPages != "") book.pages = parseInt(newPages);
    // book.alreadyRead = newRead;
    populateLibrary();
}

function openForm(purpose, book) {
    let formDiv = document.createElement('div'); // outer container
    formDiv.className = "form-div";
    let form = document.createElement('form'); // input container
    form.className = "edit-form";
    let formBtn = document.createElement('div'); // input container
    formBtn.className = "form-btn";
    main.appendChild(formDiv);
    formDiv.appendChild(form);
    formDiv.appendChild(formBtn);

    // content on the form
    let formTitle = document.createElement('h1');
    formTitle.innerHTML = purpose + " book";
    form.appendChild(formTitle);
    // inputs boxes 
    // let titleBox = document.createElement('p'); // title
    // titleBox.textContent = "Title";
    // form.appendChild(titleBox);
    let titleInput = document.createElement("input");
    titleInput.className = "input-box";
    titleInput.placeholder = "New title";
    form.appendChild(titleInput);
    //
    // let authorBox = document.createElement('p'); // author
    // authorBox.textContent = "Author";
    // form.appendChild(authorBox);
    let authorInput = document.createElement("input");
    authorInput.className = "input-box";
    authorInput.placeholder = "New author";
    form.appendChild(authorInput);
    //
    // let pagesBox = document.createElement('p'); // pages
    // pagesBox.textContent = "Pages";
    // form.appendChild(pagesBox);
    let pagesInput = document.createElement("input");
    pagesInput.className = "input-box";
    pagesInput.placeholder = "New pages";
    form.appendChild(pagesInput);
    
    //buttons on the form
    // close button
    let closeBtn = document.createElement('button');
    closeBtn.className = "close-btn btn";
    closeBtn.textContent = "Close form";
    // on click I want the form to become transparent
    closeBtn.addEventListener('click', () => {
        formDiv.style.display = 'none';
    })
    formBtn.appendChild(closeBtn);

    // confirm button
    let confirmBtn = document.createElement('button');
    confirmBtn.className = "confirm-btn btn";
    confirmBtn.textContent = "Confirm form";
    // on click I call the function that modifies the book
    confirmBtn.addEventListener('click', () => {
        let newAuthor = authorInput.value;
        let newTitle = titleInput.value;
        let newPages = pagesInput.value;
        modifyBook(book, newTitle, newAuthor, newPages);
        });
    
    formBtn.appendChild(confirmBtn);    
}

function populateLibrary() {
    // refreshing the page
    main.innerHTML ='';

    for(let book of myLibrary) {
        // each book goes in a new div whose class is BOOK
        let newDiv = document.createElement('div');
        newDiv.className = "book";

            // inside a book div there are separate divs for each characteristics
            let title = document.createElement("p");
            title.className = "title";
            title.textContent = `Title: ${book.title}`;
            newDiv.appendChild(title);

            let author = document.createElement("p");
            author.className = "author";
            author.innerHTML = `Author:   ${book.author}`;
            newDiv.appendChild(author);

            let pages = document.createElement("p");
            pages.className = "pages";
            pages.textContent = `Pages: \t\t ${book.pages}`;
            newDiv.appendChild(pages);

            let hr = document.createElement('hr');
            newDiv.appendChild(hr);
            
            // buttons div
            let buttonsDiv = document.createElement("div");
            buttonsDiv.className = 'buttons-div';
            newDiv.appendChild(buttonsDiv);
                // delete button
                let deleteBtn = document.createElement("button");
                deleteBtn.className = "delete-btn btn";
                deleteBtn.textContent = "x";
                // in order to stop the code from running automatically once needs to say that on click it must execute a function and THEN call the function.
                deleteBtn.addEventListener('click', () => {
                    newDiv.innerHTML = '';
                    deleteBook(book);
                });
                buttonsDiv.appendChild(deleteBtn);
                
                // alreadyReadButton 
                let alreadyRead = document.createElement("button");
                alreadyRead.className = "read-btn btn";
                alreadyRead.textContent = "Already read?";
                alreadyRead.addEventListener('click', () => {
                    let status = alreadyRead.textContent;
                    if (status == "to read") {
                        alreadyRead.textContent = "";
                        alreadyRead.style.backgroundColor = "slategrey";
                        alreadyRead.style.display = "inline-block";
                        alreadyRead.className = "read-btn btn checked"
                    }
                    else {
                        alreadyRead.textContent = "to read";
                        alreadyRead.style.backgroundColor = "#f5cd79";
                        alreadyRead.className = "read-btn btn"
                    }
                })
                buttonsDiv.appendChild(alreadyRead);

                // edit button
                let editBtn = document.createElement("button");
                editBtn.className = "edit-btn btn";
                editBtn.textContent = "edit";
                buttonsDiv.appendChild(editBtn);
                editBtn.addEventListener('click', () => {
                    openForm("Modifying ", book);
                });

                
            

        main.appendChild(newDiv);
    }
}


///////////////////////
////// buttons  ///////
///////////////////////
addBtn.addEventListener('click', () => {
    let newBook = addBook('title','author', 500);
    openForm("Creating ", newBook);
});


///////////////////////
//////// test /////////
///////////////////////
addBook('I promessi sposi', 'Alessandro Manzoni', 720);
addBook('The lord of the rings', 'J. R. R. Tolkien', 2000);
addBook('IT', 'Stephen King', 1138 );
populateLibrary();