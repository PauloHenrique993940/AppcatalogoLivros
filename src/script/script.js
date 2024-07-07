const books = [];

// Adicionar livro ao catálogo
document.getElementById('add-book-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const genre = document.getElementById('genre').value;
    const year = document.getElementById('year').value;
    const rating = document.getElementById('rating').value;
    
    const book = { title, author, genre, year, rating: parseInt(rating) };
    books.push(book);
    displayBooks();
    saveBooks();
    this.reset();
});

// Buscar livro no catálogo
document.getElementById('search-btn').addEventListener('click', function() {
    const query = document.getElementById('search-query').value.toLowerCase();
    const results = books.filter(book => 
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.genre.toLowerCase().includes(query)
    );
    displaySearchResults(results);
});

// Classificar livros no catálogo
document.getElementById('sort-btn').addEventListener('click', function() {
    const criteria = document.getElementById('sort-criteria').value;
    books.sort((a, b) => {
        if (criteria === 'rating') return b[criteria] - a[criteria];
        return a[criteria].localeCompare(b[criteria]);
    });
    displayBooks();
});

// Avaliar livro no catálogo
document.getElementById('rate-btn').addEventListener('click', function() {
    const title = document.getElementById('rate-title').value;
    const rating = parseInt(document.getElementById('rate-rating').value);
    const book = books.find(book => book.title === title);
    if (book) {
        book.rating = rating;
        displayBooks();
        saveBooks();
    } else {
        alert('Livro não encontrado');
    }
});

// Função para exibir os livros na tela
function displayBooks() {
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';
    books.forEach((book, index) => {
        const bookItem = document.createElement('div');
        bookItem.className = 'book-item';
        bookItem.innerHTML = `
            <div>
                <h3>${book.title}</h3>
                <p>Autor: ${book.author}</p>
                <p>Gênero: ${book.genre}</p>
                <p>Ano de Publicação: ${book.year}</p>
                <p>Avaliação: ${book.rating}</p>
            </div>
            <button class="delete-btn" onclick="deleteBook(${index})"><i class="fa-solid fa-trash"></i> Apagar</button>
        `;
        bookList.appendChild(bookItem);
    });
}

// Função para exibir os resultados da busca
function displaySearchResults(results) {
    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = '';
    results.forEach((book, index) => {
        const bookItem = document.createElement('div');
        bookItem.className = 'book-item';
        bookItem.innerHTML = `
            <div>
                <h3>${book.title}</h3>
                <p>Autor: ${book.author}</p>
                <p>Gênero: ${book.genre}</p>
                <p>Ano de Publicação: ${book.year}</p>
                <p>Avaliação: ${book.rating}</p>
            </div>
            <button class="delete-btn" onclick="deleteBook(${index})"><i class="fa-solid fa-trash"></i> Apagar</button>
        `;
        searchResults.appendChild(bookItem);
    });
}

// Função para apagar um livro do catálogo
function deleteBook(index) {
    books.splice(index, 1);
    displayBooks();
    saveBooks();
}

// Função para salvar os livros no localStorage
function saveBooks() {
    localStorage.setItem('books', JSON.stringify(books));
}

// Função para carregar os livros do localStorage
function loadBooks() {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
        books.push(...JSON.parse(storedBooks));
        displayBooks();
    }
}

// Carregar os livros ao iniciar a aplicação
window.onload = loadBooks;

