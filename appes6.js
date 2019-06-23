// ES6 version of the script

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById('book-list');

    // create tr element
    const row = document.createElement('tr');

    // Insert col
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X</a></td>
    `
    list.appendChild(row);

  }

  deleteBook(target) {
    if(target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  showAlert(message, className) {
    // create div
    const div = document.createElement('div');
    // add class 
    div.className = `alert ${className}`;
    // add text
    div.appendChild(document.createTextNode(message));
    // insert into dom, get parent
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    // insert alert
    container.insertBefore(div, form);
    // timeout after 3 seconds
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000);
  }

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

// Event listener - Adding a book
document.getElementById('book-form').addEventListener('submit', function(e) {

  // 1) Get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;

  // 2) Instantiate book constructor/object
  const book = new Book(title, author, isbn);

  // 3) Instantiate UI object
  const ui = new UI();

  // VALIDATE
  if(title === '' || author === '' || isbn === '') {
      // Error alert
      ui.showAlert('Please fill in all fields', 'error');

  }else{

    // 4) Add book to list
    ui.addBookToList(book);
    
    // Show success
    ui.showAlert('Book Added!', 'success');

    // 5) Clear fields
    ui.clearFields();

  }

  e.preventDefault();
});

// Event listener - Deleting a book
document.getElementById('book-list').addEventListener('click', function(e) {

  // Instantiate UI
  const ui = new UI();

  ui.deleteBook(e.target);

  // Show message
  ui.showAlert('Book Removed', 'success');

  e.preventDefault();
});
