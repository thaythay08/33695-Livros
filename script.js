// Arquivo de script encurtado por questão de tamanho
const books = JSON.parse(localStorage.getItem('books')) || [];

function toggleCategory(id) {
  const sections = document.querySelectorAll('.category-books');
  sections.forEach(section => {
    if (section.id !== id) {
      section.style.display = 'none';
    }
  });

  const section = document.getElementById(id);
  const isHidden = window.getComputedStyle(section).display === 'none';
  section.style.display = isHidden ? 'block' : 'none';
}

function renderBooks() {
  const bookList = document.getElementById('book-list');
  const searchQuery = document.getElementById('searchBar').value.toLowerCase();
  const authorQuery = document.getElementById('authorFilter').value.toLowerCase();
  const sortOption = document.getElementById('sortOption').value;
  bookList.innerHTML = '';

  const categories = ['Romance', 'Fantasia', 'Distopia', 'Autoajuda', 'Não ficção'];

  categories.forEach(category => {
    let filteredBooks = books.filter(book =>
      book.category.toLowerCase() === category.toLowerCase() &&
      book.title.toLowerCase().includes(searchQuery) &&
      book.author.toLowerCase().includes(authorQuery)
    );

    if (sortOption === 'title') {
      filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'author') {
      filteredBooks.sort((a, b) => a.author.localeCompare(b.author));
    }

    const section = document.createElement('div');
    section.className = 'category-section';

    const header = document.createElement('div');
    header.className = 'category-header';
    header.textContent = category;
    header.onclick = () => toggleCategory(`cat-${category}`);

    const content = document.createElement('div');
    content.className = 'category-books';
    content.id = `cat-${category}`;

    filteredBooks.slice(0, 6).forEach(book => {
      const card = document.createElement('div');
      card.className = 'book-card';
      card.innerHTML = `
        <div class="book-title">${book.title}</div>
        <div class="book-author">${book.author}</div>
        <div class="book-description">${book.description}</div>
        <div class="book-category">Categoria: ${book.category}</div>
      `;
      content.appendChild(card);
    });

    section.appendChild(header);
    section.appendChild(content);
    bookList.appendChild(section);
  });
}

function addBook() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const description = document.getElementById('description').value;
  const category = document.getElementById('category').value;

  if (title && author && description && category) {
    const newBook = {
      title,
      author,
      description,
      category,
      image: '',
      full: description
    };
    books.push(newBook);
    localStorage.setItem('books', JSON.stringify(books));
    renderBooks();

    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('description').value = '';
    document.getElementById('category').value = 'Romance';
  } else {
    alert('Por favor, preencha todos os campos.');
  }
}

renderBooks();
