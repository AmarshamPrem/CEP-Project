
    function filterBooks() {
  const input = document.getElementById("searchInput").value.toLowerCase();
    const books = document.querySelectorAll(".book-card");

  books.forEach(book => {
    const title = book.dataset.title;
    const author = book.dataset.author;
    if (title.includes(input) || author.includes(input)) {
        book.style.display = "block";
    } else {
        book.style.display = "none";
    }
  });
}

    function sortBooks() {
  const sortValue = document.getElementById("sortSelect").value;
    const container = document.getElementById("booksContainer");
    const books = Array.from(container.children);

  books.sort((a, b) => {
    if (sortValue === "title") {
      return a.dataset.title.localeCompare(b.dataset.title);
    } else if (sortValue === "rating") {
      return b.dataset.rating - a.dataset.rating;
    } else if (sortValue === "sold") {
      return b.dataset.sold - a.dataset.sold;
    } else if (sortValue === "availability") {
      return b.dataset.available - a.dataset.available;
    }
  });

  books.forEach(book => container.appendChild(book));
}

function requestBook(bookId) {
    fetch('/student/request', {
        method: 'POST',
        headers: {    
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ bookId })
    })
    .then(response => {
        if (response.ok) {
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.textContent = 'Book request sent successfully!';
            document.body.appendChild(notification);
            setTimeout(() => notification.remove(), 3000);
        } else {
            alert("Failed to send request.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
    });
}
