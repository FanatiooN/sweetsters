const cards = document.querySelector('.cards');

document.addEventListener('DOMContentLoaded', () => {
    let cardArr = cards.querySelectorAll('.card');
    window.localStorage.setItem('cardCount', cardArr.length);

    for (let i = 0; i < cardArr.length; i++) {

        let someCard = cardArr[i];
        let someCardInfo = getCardInfo(someCard);

        window.localStorage.setItem('card_' + (i+1), JSON.stringify(someCardInfo));
    }
})

cards.addEventListener('click', (e) => {
    let target = e.target;
    if (target.closest('.like')) {
        let someCard = target.parentElement.parentElement;
        if (someCard.classList.contains('item_img')) {
            someCard = someCard.parentElement;
        }
        if (target.closest('.like').classList.contains('liked')) {
            target.closest('.like').classList.remove('liked');
        }
        else {
            target.closest('.like').classList.add('liked');
        }
        let someCardInfo = getCardInfo(someCard);
        let cardId = someCard.getAttribute('data-id');
        window.localStorage.setItem('card_' + cardId, JSON.stringify(someCardInfo));
    }
});


function getCardInfo(someCard) {
    let name = someCard.querySelector('.name').innerHTML;
    let price = someCard.querySelector('.price').innerHTML.split(' ')[0];
    let rating = someCard.querySelector('.rating').innerHTML;
    let img = someCard.querySelector('.like + img').getAttribute('src');
    let count = someCard.querySelector('.count').innerHTML;
    let isLiked = someCard.querySelector('.like').classList.contains('liked');
    let someCardInfo = {name,price,rating,img,count,isLiked};
    return someCardInfo;
}