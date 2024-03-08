// Variable to keep track of the cart's visibility state
var cartVisible = false;

// Wait for all page elements to load before executing the script
if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

function ready() {
  // Add functionality to the cart's delete buttons
  var deleteButtons = document.getElementsByClassName('btn-eliminar');
  for (var i = 0; i < deleteButtons.length; i++) {
    var button = deleteButtons[i];
    button.addEventListener('click', removeCartItem);
  }

  // Add functionality to the "Increase Quantity" buttons
  var increaseQuantityButtons = document.getElementsByClassName('sumar-cantidad');
  for (var i = 0; i < increaseQuantityButtons.length; i++) {
    var button = increaseQuantityButtons[i];
    button.addEventListener('click', increaseQuantity);
  }

  // Add functionality to the "Decrease Quantity" buttons
  var decreaseQuantityButtons = document.getElementsByClassName('restar-cantidad');
  for (var i = 0; i < decreaseQuantityButtons.length; i++) {
    var button = decreaseQuantityButtons[i];
    button.addEventListener('click', decreaseQuantity);
  }

  // Add functionality to the "Add to Cart" buttons
  var addToCartButtons = document.getElementsByClassName('boton-item');
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener('click', addToCartClicked);
  }

  // Add functionality to the "Buy" button
  document.getElementsByClassName('btn-pagar')[0].addEventListener('click', checkoutClicked);
}

// Remove all items from the cart and hide it
function checkoutClicked() {
  alert("Your order has been saved.");
  // Remove all items from the cart
  var cartItems = document.getElementsByClassName('carrito-items')[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
  hideCart();
}

// Function to handle the click event of the "Add to Cart" button
function addToCartClicked(event) {
  var button = event.target;
  var item = button.parentElement;
  var title = item.getElementsByClassName('titulo-item')[0].innerText;
  var price = item.getElementsByClassName('precio-item')[0].innerText;
  if (item.getElementsByClassName('img-item').length > 0) {
    imageSrc = item.getElementsByClassName('img-item')[0].src;
  } else if (item.getElementsByClassName('img-item-2').length > 0) {
    imageSrc = item.getElementsByClassName('img-item-2')[0].src;
  } else if (item.getElementsByClassName('img-item-3').length > 0) {
    imageSrc = item.getElementsByClassName('img-item-3')[0].src;
  } else if (item.getElementsByClassName('img-item-4').length > 0) {
    imageSrc = item.getElementsByClassName('img-item-4')[0].src;
  } else if (item.getElementsByClassName('img-item-5').length > 0) {
    imageSrc = item.getElementsByClassName('img-item-5')[0].src;
  } else {
    // Jika tidak ada kelas gambar yang cocok, beri nilai default untuk imageSrc
    imageSrc = "";
  }
 console.log(imageSrc);

  addItemToCart(title, price, imageSrc);
  showCart();
}

// Function to make the cart visible
function showCart() {
  cartVisible = true;
  var cart = document.getElementsByClassName('carrito')[0];
  cart.style.marginRight = '0';
  cart.style.opacity = '1';

  var items = document.getElementsByClassName('contenedor-items')[0];
  items.style.width = '60%';
}

// Function to add an item to the cart
function addItemToCart(title, price, imageSrc) {
  var item = document.createElement('div');
  item.classList.add('item');
  var cartItems = document.getElementsByClassName('carrito-items')[0];

  // Check if the item is already in the cart
  var cartItemTitles = cartItems.getElementsByClassName('carrito-item-titulo');
  for (var i = 0; i < cartItemTitles.length; i++) {
    if (cartItemTitles[i].innerText == title) {
      alert("Item is already in the cart.");
      return;
    }
  }

  var cartItemContent = `
    <div class="carrito-item">
      <img src="${imageSrc}" width="80px" alt="">
      <div class="carrito-item-detalles">
        <span class="carrito-item-titulo">${title}</span>
        <div class="selector-cantidad">
          <i class="fa-solid fa-minus restar-cantidad"></i>
          <input type="text" value="1" class="carrito-item-cantidad" disabled>
          <i class="fa-solid fa-plus sumar-cantidad"></i>
        </div>
        <span class="carrito-item-precio">${price}</span>
      </div>
      <button class="btn-eliminar">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  `;
  item.innerHTML = cartItemContent;
  cartItems.append(item);

  // Add functionality to the new item's delete button
  item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', removeCartItem);

  // Add functionality to the new item's "Decrease Quantity" button
  var decreaseQuantityButton = item.getElementsByClassName('restar-cantidad')[0];
  decreaseQuantityButton.addEventListener('click', decreaseQuantity);

  // Add functionality to the new item's "Increase Quantity" button
  var increaseQuantityButton = item.getElementsByClassName('sumar-cantidad')[0];
  increaseQuantityButton.addEventListener('click', increaseQuantity);

  // Update the cart total
  updateCartTotal();
}

// Increase the quantity of the selected item by one
function increaseQuantity(event) {
  var buttonClicked = event.target;
  var selector = buttonClicked.parentElement;
  console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
  var currentQuantity = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
  currentQuantity++;
  selector.getElementsByClassName('carrito-item-cantidad')[0].value = currentQuantity;
  updateCartTotal();
}

// Decrease the quantity of the selected item by one
function decreaseQuantity(event) {
  var buttonClicked = event.target;
  var selector = buttonClicked.parentElement;
  console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
  var currentQuantity = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
  currentQuantity--;
  if (currentQuantity >= 1) {
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = currentQuantity;
    updateCartTotal();
  }
}

// Remove the selected item from the cart
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  // Update the cart total
  updateCartTotal();

  // Check if there are items in the cart, if not, hide the cart
  hideCart();
}

// Function to check if there are items in the cart. If not, hide the cart.
function hideCart() {
  var cartItems = document.getElementsByClassName('carrito-items')[0];
  if (cartItems.childElementCount == 0) {
    var cart = document.getElementsByClassName('carrito')[0];
    cart.style.marginRight = '-100%';
    cart.style.opacity = '0';
    cartVisible = false;

    var items = document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '100%';
  }
}


function updateCartTotal() {
    // Select the cart container
    var cartContainer = document.getElementsByClassName('carrito')[0];
    var cartItems = cartContainer.getElementsByClassName('carrito-item');
    var total = 0;
    // Loop through each item in the cart to update the total
    for (var i = 0; i < cartItems.length; i++) {
        var item = cartItems[i];
        var priceElement = item.getElementsByClassName('carrito-item-precio')[0];
        // Remove the currency symbol and thousands separator.
        var price = parseFloat(priceElement.innerText.replace('Rp.','').replace('.',''));
        var quantityItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        console.log(price);
        var quantity = quantityItem.value;
        total = total + (price * quantity);
    }
    total = Math.round(total * 100) / 100;

    document.getElementsByClassName('carrito-precio-total')[0].innerText = 'Rp.' + total.toLocaleString("es") + ",00";
}
