document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const orderItemsDiv = document.getElementById("orderItems");
  const orderDataInput = document.getElementById("orderData");
  const orderTotalInput = document.getElementById("orderTotalInput");
  const deliveryFee = 200;
  let total = 0;

  // Render cart items
  cart.forEach(item => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p>${item.name} (${item.quantity}) - Ksh ${item.price * item.quantity}</p>
    `;
    orderItemsDiv.appendChild(div);
    total += item.price * item.quantity;
  });

  total += deliveryFee;
  document.getElementById("orderTotal").textContent = total;
  orderDataInput.value = JSON.stringify(cart);
  orderTotalInput.value = total;

  // Handle form submission
  const form = document.getElementById("checkoutForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    fetch("process_order.php", {
      method: "POST",
      body: new FormData(form)
    })
    .then(res => res.text())
    .then(data => {
      if (data.includes("success")) {
        localStorage.removeItem("cart");
        document.getElementById("successPopup").style.display = "block";
      } else {
        alert("❌ Failed to place order: " + data);
      }
    })
    .catch(err => alert("Error: " + err));
  });
});
