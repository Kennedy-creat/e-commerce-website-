let carts = document.querySelectorAll('.add-cart');


let products = [
    {
        name: 'Diesel T Nibe Smile Print Sweatshirt',
        tag: 'diesel t nibe smile print sweatshirt',
        price: 2000,
        inCart: 0
    },
    {
        name: 'Just Cavalli Belt',
        tag: 'just cavalli belt',
        price: 1500,
        inCart: 0
    }, 
    {
        name: 'Nike Air Vapormax Plus',
        tag: 'NIKE AIR VAPORMAX PLUS',
        price: 5500,
        inCart: 0
    },
    {
        name: 'Star Chest Tie',
        tag: 'star chest tie',
        price: 700,
        inCart: 0
    },
    {
        name: 'Street Wear JNCO Jeans',
        tag: 'street wear JNCO jeans',
        price: 1300,
        inCart: 0
    },
    {
        name: 'Y2kspice',
        tag: 'y2kspice',
        price: 1400,
        inCart: 0
    },
    {
        name: 'Jort',
        tag: 'jort',
        price: 1500,
        inCart: 0
    },
    {
        name: 'Custom Jeans',
        tag: 'custom jeans',
        price: 2000,
        inCart: 0
    },
];
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
}
function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers) || 0;
if(productNumbers) {
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.cart span').textContent = productNumbers + 1;
} else {
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.cart span').textContent = 
    1;
}
setItems(product);
}
function setItems(product) {
let cartItems = localStorage.getItem('productsInCart');
cartItems = JSON.parse(cartItems);


    if(cartItems != null) {
        if(cartItems[product.tag] ==undefined) {
           cartItems = {
            ...cartItems,
            [product.tag]: product
           }
        }
        cartItems[product.tag].inCart += 1;
    } else {
    product.inCart = 1;
    cartItems = {
        [product.tag]: product
    }
    }

    localStorage.setItem("productsInCart", JSON.stringify
    (cartItems));
}

function totalCost(product) {
let cartCost = localStorage.getItem('totalCost');
console.log("My cartCost is", cartCost);
console.log(typeof cartCost );


if(cartCost != null){
    cartCost = parseInt(cartCost);
    localStorage.setItem('totalCost', cartCost + 
    product.price);
} else{
    localStorage.setItem('totalCost', product.price); 
}
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');

    let totalItems = 0;

    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
                <div class="product">
                    <i class="fas fa-times-circle"></i>
                    <img src="images/${item.tag}.jpg" onerror="this.src='images/${item.tag}.png';">
                    <span>${item.name}</span>
                </div>
                <div class="price">Ksh${item.price}.00</div>
                <div class="quantity">
                    <i class="fas fa-chevron-left decrease" onclick="decreaseItem('${item.tag}')"></i>
                    <span id="${item.tag}">${item.inCart}</span>
                    <i class="fas fa-chevron-right increase" onclick="increaseItem('${item.tag}')"></i>
                </div>
                <div class="total">
                    Ksh${item.price * item.inCart}.00
                </div>
            `;

            totalItems += item.inCart;
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Basket Total
                </h4>
                <p class="basketTotal">
                    Ksh${cartCost}.00
                </p>
            </div>
        `;

        const checkoutButton = document.querySelector('.checkout-btn');

        checkoutButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to checkout?')) {
                // Clear the cart on checkout
                localStorage.removeItem('productsInCart');
                localStorage.removeItem('totalCost');
                localStorage.removeItem('cartNumbers');

                // Update the cart count display to zero after checkout
                document.querySelector('.cart span').textContent = 0;

                // Notify the user about successful checkout
                alert('Thank you for your purchase! Your items have been checked out.');

                // Redirect to a thank you or home page (if applicable)
                window.location.href = 'index.html';
            }
        });

        // Update the cart span with the new totalItems count
        document.querySelector('.cart span').textContent = totalItems;
    }
}
function increaseItem(tag) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    cartItems[tag].inCart += 1;
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));

    // Update the total cost in localStorage when increasing the item quantity
    let product = cartItems[tag];
    updateTotalCost(product.price, 'increase');

    displayCart();
}

function decreaseItem(tag) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems[tag].inCart > 0) {
        cartItems[tag].inCart -= 1;
        localStorage.setItem("productsInCart", JSON.stringify(cartItems));

        let product = cartItems[tag];
        updateTotalCost(product.price, 'decrease');

        displayCart();
    }
}

function updateTotalCost(price, action) {
    let cartCost = localStorage.getItem('totalCost');
    cartCost = parseInt(cartCost);

    if (action === 'increase') {
        cartCost += price;
    } else if (action === 'decrease') {
        cartCost -= price;
    }

    localStorage.setItem('totalCost', cartCost);
}




onLoadCartNumbers();
displayCart();
