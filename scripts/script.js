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
function Book(title, author, pages, cover) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.cover = cover;
}
// each book has this method that returns all the information
Book.prototype.info = function() {
    if(this.alreadyRead) return `${this.title}, ${this.author}, ${this.pages}, you have read this book already!`;
    else return `${this.title}, ${this.author}, ${this.pages}, you haven't read this book so far!`;
}

// adding books
function addBook(title, author, pages, cover) {
    if (typeof cover == 'undefined') cover = "https://image.freepik.com/free-vector/blank-book-cover-template-with-pages-front-side-standing_47649-397.jpg";
    const newBook = new Book(title, author, pages, cover);
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

function modifyBook(book, newTitle, newAuthor, newPages, newCover) {
    if (newTitle != "") book.title = newTitle;
    if (newAuthor != "")book.author = newAuthor;
    if (!isNaN(newPages) && newPages != "") book.pages = newPages;
    if (newCover != "") book.cover = newCover;
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

    // title box
    let titleInput = document.createElement("input");
    titleInput.className = "input-box";
    titleInput.placeholder = "New title";
    form.appendChild(titleInput);
    // autrhor box
    let authorInput = document.createElement("input");
    authorInput.className = "input-box";
    authorInput.placeholder = "New author";
    form.appendChild(authorInput);
    //
    // pages box
    let pagesInput = document.createElement("input");
    pagesInput.className = "input-box";
    pagesInput.placeholder = "New pages";
    form.appendChild(pagesInput);
    //
    // cover box
    let coverInput = document.createElement("input");
    coverInput.className = "input-box";
    coverInput.placeholder = "New cover url";
    form.appendChild(coverInput);

    
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
        let newCover = coverInput.value;
        modifyBook(book, newTitle, newAuthor, newPages, newCover);
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
            //cover
            let cover = document.createElement("img");
            cover.className = "cover center";
            if(book.cover != "" || typeof book.cover === undefined || book.cover == null){
                cover.src = book.cover;
                cover.alt = "";
            }
            let coverLink = document.createElement('a');
            coverLink.href = "";
            coverLink.addEventListener('click', () =>{
                window.open(book.cover, "-blank");
            })
            coverLink.appendChild(cover);
            newDiv.appendChild(coverLink);
            //title
            let title = document.createElement("p");
            title.className = "title";
            title.textContent = `Title: ${book.title}`;
            newDiv.appendChild(title);
            //author
            let author = document.createElement("p");
            author.className = "author";
            author.innerHTML = `Author:   ${book.author}`;
            newDiv.appendChild(author);
            //pages
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
addBook('I promessi sposi', 'Alessandro Manzoni', 720, "https://iicstoccarda.esteri.it/iic_stoccarda/resource/img/2019/01/manzonipromessisposi.jpg");
addBook('The lord of the rings', 'J. R. R. Tolkien', 2000, "https://vignette.wikia.nocookie.net/lotr/images/d/db/51eq24cRtRL._SX331_BO1%2C204%2C203%2C200_.jpg/revision/latest?cb=20190723164240");
addBook('IT', 'Stephen King', 1138, "https://i.pinimg.com/originals/11/c1/8f/11c18fbb50b3abe089e5f519cc1988cb.png" );
populateLibrary();