async function renderBooks(filter) {
    const booksWrapper = document.querySelector(".books");
    const books = await getBooks();
    console.log(books);

    if (filter === "LOW_TO_HIGH") {
        books.sort((a, b) => (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice));
    }else if (filter === "HIGH_TO_LOW") {
        books.sort((a, b) => (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice));
    }else if (filter === "RATING") {
        books.sort((a, b) => b.ratings - a.ratings);
    }

    const booksHTML = books
    .map((book) => {
        return `<div class="book">
    <figure class="book__img--wrapper">
        <img class="book__img" src="${book.url}" alt="">
    </figure>
    <div class="book__title">
    ${book.title}
    </div>
    <div class="book__ratings">
    ${ratingsHtml(book.ratings)}
    </div>
    <div class="book__price">
        ${priceHtml(book.originalPrice, book.salePrice)}
        </div>    
    </div>`;
    })
    .join("");

    booksWrapper.innerHTML = booksHTML;
}

function priceHtml(originalPrice, salePrice) {
    if (!salePrice) {
        return `$${originalPrice.toFixed(2)}`
    }
    return `<span class="book__price--normal">$${originalPrice.toFixed(2
    )}</span> $${salePrice.toFixed(2)}`;
}

function ratingsHtml(ratings) {
    let ratingsHTML = "";
    for (let i = 0; i < Math.floor(ratings); i++) {
        ratingsHTML += `<i class="fas fa-star"></i>`;
    }
    if (Number.isInteger(ratings)) {
        ratingsHTML += `<i class="fas fa-star-half-alt"></i>\n`;
    }
    return ratingsHTML;
}

function filterBooks(event) {
    renderBooks(event.target.value);
}




setTimeout(() => {
    renderBooks();
});
// FAKE DATA
function getBooks() {
    return new Promise((resolve,) => {
        setTimeout (() => {
            resolve ([

                {
                    id: 1,
                    title: 'Crack the Coding Interview',
                    url: './assets/coding-interview.jpeg',
                    originalPrice: 49.95,
                    price: 14.95,
                    ratings: 4.5,
                },
                {
                    id: 2,
                    title: 'Atomic Habits',
                    url: './assets/atomic-habits.jpeg',
                    originalPrice: 39,
                    price: null,
                    ratings: 5,
                },
                {
                    id: 3,
                    title: 'Cant Hurt Me',
                    url: './assets/cant-hurt-me.jpeg',
                    originalPrice: 59.95,
                    price: 14.95,
                    ratings: 4.5,
                },
                {
                    id: 4,
                    title: 'Deep Work',
                    url: './assets/deep-work.jpeg',
                    originalPrice: 29,
                    price: 12,
                    ratings: 5,
                },
                {
                    id: 5,
                    title: 'The 10X Rule',
                    url: './assets/the-10x-rule.jpeg',
                    originalPrice: 44,
                    price: 19,
                    ratings: 4.5,
                },
                {
                    id: 6,
                    title: 'Be Obsessed or Be Average',
                    url: './assets/be-obsessed-or-be-average.jpeg',
                    originalPrice: 32,
                    price: 17,
                    ratings: 4,
                },
                {
                    id: 7,
                    title: 'Rich Dad Poor Dad',
                    url: './assets/rich-dad-poor-dad.jpeg',
                    originalPrice: 70,
                    price: 14.95,
                    ratings: 4.5,
                },
                {
                    id: 8,
                    title: 'Cashflow Quadrant',
                    url: './assets/cashflow-quadrant.jpeg',
                    originalPrice: 11,
                    price: 10,
                    ratings: 4.5,
                },
            ]);
        }, 1000);
    });
}