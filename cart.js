document.addEventListener('DOMContentLoaded', () => {
  const cartItemsContainer = document.getElementById('cartItems');
  const cartBadge = document.getElementById('cart-items'); // badge in header

  // Load cart from localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Save cart to localStorage
  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  // Update cart badge
  function updateCartBadge() {
    if (!cartBadge) return;
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalItems;
  }

  // Render cart items
  function renderCart() {
    if (!cartItemsContainer) return;
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
      document.getElementById('cartTotal').textContent = 0;
      return;
    }

    let total = 0;

    cart.forEach((item, index) => {
      total += item.price * item.quantity;

      // Cart item container
      const div = document.createElement('div');
      div.classList.add('cart-item');
      div.style.display = 'flex';
      div.style.alignItems = 'center';
      div.style.marginBottom = '15px';

      // Product image
      const img = document.createElement('img');
      img.src = item.image || 'images/placeholder.png';
      img.alt = item.name;
      img.style.width = '80px';
      img.style.height = '80px';
      img.style.objectFit = 'cover';
      img.style.marginRight = '10px';

      // Info: name & price
      const infoDiv = document.createElement('div');
      infoDiv.style.flex = '1';
      const nameP = document.createElement('p');
      nameP.textContent = item.name;
      const priceP = document.createElement('p');
      priceP.textContent = `Ksh ${item.price}`;

      infoDiv.appendChild(nameP);
      infoDiv.appendChild(priceP);

      // Quantity controls
      const controlsDiv = document.createElement('div');
      controlsDiv.classList.add('qty-controls');

      const minusBtn = document.createElement('button');
      minusBtn.textContent = '-';
      minusBtn.addEventListener('click', () => decreaseQty(index));

      const qtySpan = document.createElement('span');
      qtySpan.textContent = item.quantity;
      qtySpan.style.margin = '0 5px';

      const plusBtn = document.createElement('button');
      plusBtn.textContent = '+';
      plusBtn.addEventListener('click', () => increaseQty(index));

      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Remove';
      removeBtn.style.marginLeft = '10px';
      removeBtn.addEventListener('click', () => removeFromCart(index));

      controlsDiv.appendChild(minusBtn);
      controlsDiv.appendChild(qtySpan);
      controlsDiv.appendChild(plusBtn);
      controlsDiv.appendChild(removeBtn);

      // Append everything
      div.appendChild(img);
      div.appendChild(infoDiv);
      div.appendChild(controlsDiv);

      cartItemsContainer.appendChild(div);
    });

    document.getElementById('cartTotal').textContent = total;
    updateCartBadge();
  }

  // Remove item
  function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
  }

  // Increase quantity
  function increaseQty(index) {
    cart[index].quantity += 1;
    saveCart();
    renderCart();
  }

  // Decrease quantity
  function decreaseQty(index) {
    cart[index].quantity -= 1;
    if (cart[index].quantity <= 0) cart.splice(index, 1);
    saveCart();
    renderCart();
  }

  // Expose to window (optional if you want inline HTML calls)
  window.removeFromCart = removeFromCart;
  window.increaseQty = increaseQty;
  window.decreaseQty = decreaseQty;

  // Initial render
  updateCartBadge();
  renderCart();

  // --- Optional: Add to cart from shop page ---
  const addToCartButtons = document.querySelectorAll('.product .btn');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const product = e.target.closest('.product');
      const name = product.dataset.name;
      const price = parseFloat(product.dataset.price);
      const image = product.querySelector('img').src; // get image URL

      const existing = cart.find(item => item.name === name);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ name, price, quantity: 1, image });
      }

      saveCart();
      updateCartBadge();
      renderCart();
    });
  });
});
