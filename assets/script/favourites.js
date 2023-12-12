document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelector('.cards');
    let maxCardCount = window.localStorage.getItem('cardCount') || 0;
    for (let i = 1; i < maxCardCount + 1; i++) {
        let someCard = window.localStorage.getItem('card_' + i);
        if (someCard != null && someCard != '') {
            someCard = JSON.parse(someCard);
            let name = someCard.name;
            let price = Number(someCard.price);
            let rating = Number(someCard.rating);
            let img = someCard.img;
            let cnt = Number(someCard.cnt);
            let isLiked = Boolean(someCard.isLiked);
            if (isLiked) {
                let isExist = false;
                for (let card of cards.querySelectorAll('.card')) {
                    if (card.getAttribute('data-id') == i) {
                        isExist = true;
                        break;}}
                if (!isExist) {
                    let card = document.createElement('div');
                    card.classList.add('card');
                    cards.appendChild(card);
                    card.innerHTML += `
                    <div class="item_img"><img src="${img}"></div>
                    <div class="info">
                        <h6 class="price">${price + ' р'}</h6>
                        <p class="name">${name}</p>
                        <div class="rate">
                            <svg xmlns="http://www.w3.org/2000/svg" width="21"
                                height="21" viewBox="0 0 21 21" fill="none">
                                <path d="M4.83756 6.48344C2.50087 7.01214 1.33252 7.27649 1.05455 8.17035C0.776581 9.06418 1.57309 9.99566 3.16609 11.8584L3.57822 12.3404C4.03091 12.8697 4.25724 13.1344 4.35906 13.4618C4.46089 13.7893 4.42668 14.1424 4.35823 14.8487L4.29593 15.4917C4.05508 17.9771 3.93466 19.2198 4.66239 19.7722C5.39012 20.3246 6.48404 19.821 8.67191 18.8137L9.23792 18.553C9.8596 18.2667 10.1704 18.1236 10.5 18.1236C10.8295 18.1236 11.1404 18.2667 11.7621 18.553L12.3281 18.8137C14.5159 19.821 15.6098 20.3246 16.3376 19.7722C17.0653 19.2198 16.9449 17.9771 16.7041 15.4917M17.8339 11.8584C19.4269 9.99566 20.2234 9.06418 19.9454 8.17035C19.6675 7.27649 18.4991 7.01214 16.1625 6.48344L15.5579 6.34665C14.8938 6.19641 14.5619 6.1213 14.2953 5.91893C14.0287 5.71656 13.8578 5.40984 13.5158 4.79642L13.2044 4.23796C12.0012 2.07932 11.3995 1 10.5 1C9.60044 1 8.9988 2.07933 7.7955 4.23797"
                                      stroke="#5C164E" stroke-width="2"
                                      stroke-linecap="round" />
                            </svg>
                            <p class="rating">${rating}</p>
                        </div>
                        `}}}}
    let cardsCount = cards.querySelectorAll('.card').length;
    if (cardsCount < 1) {
        let h2 = document.createElement('h2');
        h2.innerHTML = 'Упс... Здесь ничего нет.';
        let oops = document.querySelector('.oops');
        oops.appendChild(h2)
    }
})