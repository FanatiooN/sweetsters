document.addEventListener('DOMContentLoaded', () => {
    let cardArr = document.querySelectorAll('.card')
    window.localStorage.setItem('cardCount', cardArr.length);

    for (let i = 0; i < window.localStorage.getItem('cardCount'); i++) {

        let count = cardArr[i].querySelector('.count');
        let cardId = cardArr[i].getAttribute('data-id');

        let someCard = window.localStorage.getItem('card_' + cardId);
        someCard = JSON.parse(someCard)

        someCard.count = someCard.count ?? 0;
        count.innerHTML = someCard.count;

        window.localStorage.setItem('card_' + cardId, JSON.stringify(someCard));
    }

})