/* important link on inheritance in JS: https://javascript.info/prototype-inheritance
 NOTE THAT THIS ALWAYS REFERS TO THE OBJECT ON WHICH IT IS CALLED!!!
 Imagine setter that modifies the name in the user obj like so: set name(name) {this.name = name;}
 then we have admin which inherits from user. admin.name('...') would chage only the admin object
 */

 ///////////////////////
////// variables //////
///////////////////////
const main = document.getElementById('main');
const addBtn = document.getElementById('add');
const colorBtn = document.getElementById('color');
const root = document.documentElement;


///////////////////////
////// functions //////
///////////////////////

// constructor for book
function Book(title, author, pages, cover, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.cover = cover;
    this.readStatus = readStatus;

}

// adding books
function addBook(title, author, pages, cover, readStatus) {
    
    if (typeof cover == 'undefined' || cover == "") cover = "https://image.freepik.com/free-vector/blank-book-cover-template-with-pages-front-side-standing_47649-397.jpg";
    if(typeof readStatus == 'undefined') readStatus = false;
    const newBookObj = {title: title, author: author, pages: pages, cover : cover, readStatus : readStatus};
    // key used to ideintify the object, is the title w/o spaces
    const bookObjKey = title.trim().replace(/ /g, "");
    // saving the objcet
    window.localStorage.setItem(bookObjKey, JSON.stringify(newBookObj));
    // I need to return the object in order to call openForm (line 245)

    console.log("Creating: ");
    console.log(newBookObj);
    return newBookObj;
}

function deleteBook (book) {
    console.log("Deleting: ");
    console.log(book);
    for (let i = 0; i < localStorage.length; i++) {
        // checking for each book in my local store if it's property title correspond to the one I want to delete
        const b = JSON.parse(localStorage.getItem(localStorage.key(i)));
        if(b.title == book.title && b.author == book.author && b.page == book.page && b.cover == book.cover && b.readStatus == book.readStatus) {
            // removing that item from the saved books
            window.localStorage.removeItem(b.title.trim().replace(/ /g, ""));
        }
        // redrawing the page
        populateLibrary();  
    }
}

function modifyBook(book, newTitle, newAuthor, newPages, newCover, newReadStatus) {
    // getting the obj from the saved books that corresponds to the one we want to modify
    console.log("Modifying: ");
    console.log(book);
    // then we delete it and create a new one with the new properties
    deleteBook(book);
    if (newTitle == "") newTitle = book.title;
    if (newAuthor == "") newAuthor = book.author;
    // if (!isNaN(newPages) || newPages != book.pages ) newPages = book.pages ;
    if (""+newPages == "") newPages = ""+book.pages;
    if (newCover == "") newCover = book.cover;
    // we add the newly created book to our file
    addBook(newTitle, newAuthor, newPages, newCover, newReadStatus);

    // redraw the page
    populateLibrary();
}

function openForm(purpose, book) {
    // this could have been done in HTML changing only the display property through JS but I wanted to get practice with creating and manipulating HTML in JS
    let formDiv = document.createElement('div'); // outer container
    formDiv.className = "form-div";
    let form = document.createElement('form'); // input container
    form.className = "edit-form";
    let formBtn = document.createElement('div'); // input container
    formBtn.className = "form-btn";
    document.body.appendChild(formDiv);
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
    closeBtn.textContent = "Close";
    // on click I want the form to become transparent
    closeBtn.addEventListener('click', () => {
        formDiv.style.display = 'none';
    })
    formBtn.appendChild(closeBtn);

    // confirm button
    let confirmBtn = document.createElement('button');
    confirmBtn.className = "confirm-btn btn";
    confirmBtn.textContent = "Submit";
    // on click I call the function that modifies the book
    confirmBtn.addEventListener('click', () => {
        let newAuthor = authorInput.value;
        let newTitle = titleInput.value;
        let newPages = pagesInput.value;
        let newCover = coverInput.value;
        modifyBook(book, newTitle, newAuthor, newPages, newCover, book.readStatus);
        formDiv.style.display = "none";
        });
    
    formBtn.appendChild(confirmBtn);    
}

function populateLibrary() {
    // refreshing the page
    main.innerHTML ='';
    // looping over the books saved in my file
    for (let z = 0; z < localStorage.length; z++) {
 
        let book = JSON.parse(localStorage.getItem(localStorage.key(z)));
        // each book goes in a new div whose class is BOOK
        let newDiv = document.createElement('div');
        newDiv.className = "book";

            // inside a book div there are separate divs for each characteristics
            //cover
            let cover = document.createElement("img");
            cover.className = "cover center";
            if(book.cover != "" || typeof book.cover == 'undefined'){
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
                deleteBtn.textContent = "X";
                // in order to stop the code from running automatically once needs to say that on click it must execute a function and THEN call the function.
                deleteBtn.addEventListener('click', () => {
                    newDiv.innerHTML = '';
                    deleteBook(book);
                });
                buttonsDiv.appendChild(deleteBtn);
                
                // alreadyReadButton 
                let alreadyRead = document.createElement("button");
                alreadyRead.className = "read-btn btn";
                // coloring the buttons when retrieving the information
                if (book.readStatus == true) {
                    alreadyRead.textContent = "";
                    alreadyRead.style.backgroundColor = "slategrey";
                    alreadyRead.style.display = "inline-block";
                    alreadyRead.className = "read-btn btn checked"
                }
                else if (book.readStatus == false) {
                    alreadyRead.textContent = "to read";
                    alreadyRead.style.backgroundColor = "#f5cd79";
                    alreadyRead.className = "read-btn btn"
                }
                // click function
                alreadyRead.addEventListener('click', () => {
                    if (book.readStatus == true) {
                        book.readStatus = false;
                        alreadyRead.textContent = "";
                        alreadyRead.style.backgroundColor = "slategrey";
                        alreadyRead.style.display = "inline-block";
                        alreadyRead.className = "read-btn btn checked"
                    }
                    else {
                        book.readStatus = true;
                        alreadyRead.textContent = "to read";
                        alreadyRead.style.backgroundColor = "#f5cd79";
                        alreadyRead.className = "read-btn btn"
                    }
                    modifyBook(book, book.title, book.author, book.pages, book.cover, book.readStatus);
                });
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

function randomColor () {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
}

///////////////////////
////// buttons  ///////
///////////////////////
addBtn.addEventListener('click', () => {
    let newBook = addBook('title','author', "0", "", false);
    openForm("Creating ", newBook);
});

colorBtn.addEventListener('click', () => {
    root.style.setProperty("--main-color", randomColor());
});




///////////////////////
//////// test /////////
///////////////////////

// localStorage.clear();
// addBook('I promessi sposi', 'Alessandro Manzoni', 720, "https://iicstoccarda.esteri.it/iic_stoccarda/resource/img/2019/01/manzonipromessisposi.jpg");
// addBook('The lord of the rings', 'J. R. R. Tolkien', 2000, "https://vignette.wikia.nocookie.net/lotr/images/d/db/51eq24cRtRL._SX331_BO1%2C204%2C203%2C200_.jpg/revision/latest?cb=20190723164240");
// addBook('IT', 'Stephen King', 1138, "https://i.pinimg.com/originals/11/c1/8f/11c18fbb50b3abe089e5f519cc1988cb.png" );
populateLibrary();