const cart = document.querySelector('.cart');
const cart_items = document.querySelector('.cart_items');
const total_count = document.querySelector('.total_count');

let maxCardCount = 100;
let totalSum = 0;

document.addEventListener('DOMContentLoaded', () => {

    for (let i = 0; i < maxCardCount; i++) {
        let someCard = window.localStorage.getItem('card_' + i);


        if (someCard != null && someCard != '') {

            someCard = JSON.parse(someCard);
            let name = someCard.name;
            let price = Number(someCard.price);
            let cnt = Number(someCard.count);
            if (cnt > 0) {
                totalSum += price * cnt;
                let cart_item = document.createElement('div');
                cart_item.setAttribute('data-id', i);
                cart_item.classList.add('cart_item')
                cart_items.appendChild(cart_item);

                cart_item.innerHTML += `
                        <div class="description">
                            <h6>${name}</h6>
                            <p class="price">${price} р / шт</p>
                        </div>
                        <div class="item_count">
                            <button class="decrease">-</button>
                            <p class="count">${cnt}</p>
                            <button class="increase">+</button>
                        </div>
                        <p class="cost">${price * cnt} р</p>
                        <img src="assets/image/trash.png" class="trash">
                        `

            }
        }
    }


    total_count.innerHTML = `Итоговая сумма: ${totalSum}`;
});


function createOrder() {
    let totalItemsCnt = 0;

    for (let i = 0; i < maxCardCount; i++) {
        let someCard = window.localStorage.getItem('card_' + i);

        if (someCard != null && someCard != '') {
            someCard = JSON.parse(someCard)
            let cnt = Number(someCard.count);
            if (cnt > 0) {
                totalItemsCnt += cnt;
            }
        }
    }
    let message = 'Упс.. В корзине нет товаров!';
    if (totalItemsCnt > 0) {
        message = `Заказ из ${totalItemsCnt} товар${totalItemsCnt % 10 == 1 && totalItemsCnt != 11 ? 'а' : 'ов'} был оформлен!`;
    }
    cart_items.innerHTML = '';
    for (let i = 0; i < maxCardCount; i++) {
        let someCard = window.localStorage.getItem('card_' + i);


        if (someCard != null && someCard != '') {

            someCard = JSON.parse(someCard);
            someCard.count = 0;

            window.localStorage.setItem('card_' + i, JSON.stringify(someCard));
        }
    }
    totalSum = 0;
    total_count.innerHTML = `Итоговая сумма: ${totalSum}`;
    alert(message);
}

const submit_cart_button = document.querySelector('.submit_cart_button');
submit_cart_button.addEventListener('click', createOrder);




function removeCartItem(e) {
    let target = e.target;
    if (target.classList.contains('trash')) {
        let someCard = target.parentElement;
        let cost = someCard.querySelector('.cost').innerHTML;
        cost = String(cost).split(' ')[0];
        totalSum -= Number(cost);
        total_count.innerHTML = `Итоговая сумма: ${totalSum}`;
        someCard.count = 0;
        window.localStorage.setItem('card_' + someCard.getAttribute('data-id'), JSON.stringify(someCard));
        cart_items.removeChild(someCard);
    }
}

cart_items.addEventListener('click', removeCartItem);
