const socket = io();
const productsContainer = document.getElementById("products");

socket.on("realtimeproducts", (productos) => {
  const { products } = productos;
  productsContainer.innerHTML = "";
  products.forEach((prod) => productsContainer.append(productsContainer(prod)));
});
const productContainer = (prod) => {
  const div = document.createElement("div");
  div.innerHTML = `
 <h2>${prod.title}</h2>
 <p>${prod.description}</p>
 <p>code: ${prod.code}</p>
    <p>stock:${prod.stock}</p>
    <p>price:${prod.price}</p>
    `;
  return div;
};
