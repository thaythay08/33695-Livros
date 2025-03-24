const books = JSON.parse(localStorage.getItem('books')) || [
  {
    title: "Orgulho e Preconceito",
    author: "Jane Austen",
    description: "Um romance sobre amor e orgulho na sociedade inglesa do século XIX.",
    category: "Romance"
  },
  {
    title: "Como Eu Era Antes de Você",
    author: "Jojo Moyes",
    description: "Louisa Clark começa a trabalhar como cuidadora de Will Traynor e suas vidas mudam para sempre.",
    category: "Romance"
  },
  {
    title: "Harry Potter e a Pedra Filosofal",
    author: "J.K. Rowling",
    description: "Harry descobre que é um bruxo e vai estudar em Hogwarts, onde vive aventuras incríveis.",
    category: "Fantasia"
    
  },
  {
    title: "O Hobbit",
    author: "J.R.R. Tolkien",
    description: "Bilbo Bolseiro parte em uma grande aventura, enfrentando dragões e descobrindo a coragem.",
    category: "Fantasia"
  },
  {
    title: "Eragon",
    author: "Christopher Paolini",
    description: "Um jovem encontra um ovo de dragão e seu destino muda.",
    category: "Fantasia"
  },
  {
    title: "Percy Jackson e o Ladrão de Raios",
    author: "Rick Riordan",
    description: "Um semideus em missão para salvar o mundo.",
    category: "Fantasia"
  },
  {
    title: "A Rainha Vermelha",
    author: "Victoria Aveyard",
    description: "Mare descobre um poder escondido que pode mudar o destino.",
    category: "Fantasia"
  },
  {
    title: "A Menina que Roubava Livros",
    author: "Markus Zusak",
    description: "Uma história comovente durante a Segunda Guerra Mundial.",
    category: "Fantasia"
  },
  {
    title: "1984",
    author: "George Orwell",
    description: "Uma sociedade totalitária e opressora.",
    category: "Distopia"
  },
  {
    title: "Admirável Mundo Novo",
    author: "Aldous Huxley",
    description: "Uma sociedade onde tudo é controlado e programado.",
    category: "Distopia"
  },
  {
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    description: "Livros são proibidos e queimados.",
    category: "Distopia"
  },
  {
    title: "Jogos Vorazes",
    author: "Suzanne Collins",
    description: "Luta pela sobrevivência em uma arena mortal.",
    category: "Distopia"
  },
  {
    title: "Divergente",
    author: "Veronica Roth",
    description: "Uma jovem desafia as regras de uma sociedade dividida por facções.",
    category: "Distopia"
  },
  {
    title: "O Conto da Aia",
    author: "Margaret Atwood",
    description: "Uma mulher presa em um regime religioso autoritário.",
    category: "Distopia"
  },
  {
    title: "Rápido e Devagar: Duas Formas de Pensar",
    author: "Daniel Kahneman",
    description: "Uma análise dos processos de pensamento.",
    category: "Não ficção"
    
  },
  {
    title: "O Andar do Bêbado: Como o Acaso Determina Nossas Vidas",
    author: "Leonard Mlodinow",
    description: "Como o acaso influencia nossas decisões e o cotidiano.",
    category: "Não ficção"
    
  },
  {
    title: "Freakonomics: O Lado Oculto e Inesperado de Tudo que nos Afeta",
    author: "Steven D. Levitt e Stephen J. Dubner",
    description: "Uma visão inusitada sobre economia e comportamento.",
    category: "Não ficção"    
  },
  {
    "title": "O Poder do Agora",
    "author": "Eckhart Tolle",
    "description": "Um guia para viver no presente e superar a identificação com a mente.",
    "category": "Autoajuda"
  },
  {
    "title": "Os 7 Hábitos das Pessoas Altamente Eficazes",
    "author": "Stephen R. Covey",
    "description": "Princípios fundamentais para o desenvolvimento pessoal e profissional.",
    "category": "Autoajuda"
  },
  {
    "title": "Como Fazer Amigos e Influenciar Pessoas",
    "author": "Dale Carnegie",
    "description": "Técnicas para aprimorar a comunicação e fortalecer relacionamentos.",
    "category": "Autoajuda"
      }

];

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
