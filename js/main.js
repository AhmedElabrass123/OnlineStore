let basket = JSON.parse(localStorage.getItem("data")) || [];
let shop = document.querySelector("#shop");
const generateShop = () => {
  productsData.map((product) => {
    return (shop.innerHTML += `
        <div class="col-lg-4 col-md-6 col-12" id="product-${product.id}">
        <div class="boxContent">
          <img src=${product.img} alt />
          <p class="name">${product.name}</p>
          <p>
            ${product.desc}
          </p>
          <div class="buy-price">
            <button class="buy btn btn-primary" id="${product.id}"
            onclick="IncrementFunc(${product.id})">Buy Now</button>
            <p class="price">$${product.price}</p>
          </div>
        </div>
      </div>
        
        
        `);
  });
};
generateShop();
let IncrementFunc = (id) => {
  let selectedItem = id;
  // console.log(basket)
  let search = basket.find((item) => item.id === selectedItem);
  if (search === undefined) {
    basket.push({
      id: selectedItem,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  // console.log(basket);
  updateFunc(selectedItem);
  localStorage.setItem("data",JSON.stringify(basket));
};
let DecrementFunc = (id) => {
  let selectedItem = id;
  // console.log(basket)
  let search = basket.find((item) => item.id === selectedItem);
  if (search === undefined) return;
  else if (search.item === 0) {
    return;
  } else {
    search.item -= 1;
  }
  updateFunc(selectedItem);
  basket=basket.filter((pro)=>pro.item !== 0);
  // console.log(basket);
  localStorage.setItem("data", JSON.stringify(basket));
};
let updateFunc = (id) => {
  let search = basket.find((item) => item.id === id);
  let numOfProduct = search.item;
  // console.log(search);
  calculation();
};
let calculation = () => {
  let numbers = basket.map((item) => {
    return item.item;
  });
  let totalNUmbers = numbers.reduce((total, curr) => {
    return total + curr;
  }, 0);
  document.querySelector(".basket .num").innerHTML = totalNUmbers;

};
calculation();