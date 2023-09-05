let store = document.querySelector("#store .container");
let btnClearAll = document.getElementById("btnClearAll");
let btnCheck = document.getElementById("btnCheck");
console.log(productsData)
let basket = JSON.parse(localStorage.getItem("data")) || [];
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
let generateCartItem = () => {
  if (basket.length !== 0) {
    store.innerHTML=basket.map((cart)=>{
        let search=productsData.find((x)=>x.id===cart.id) || [];
        return `
        <div class="product">

        <div class="shirt-name">
          <img src=${search.img} alt="" />
          <p class="name">${search.name}</p>
        </div>
        
        <div class="amount">
          <button class="inBtn" onclick="DecrementFunc(${cart.id})">-</button>
          <span class="num" id="${cart.id}">
            ${cart.item === undefined ? 0 : cart.item}
          </span>
          <button class="deBtn" onclick="IncrementFunc(${cart.id})">+</button>
        </div>

        <div class="price">
          <h5>Price</h5>
           <h6>$${search.price}</h6>
        </div>

        <div class="proTotalPrice">
          <h5>Total</h5>
          <h6 class="bg-success p-2 text-white">$${search.price*cart.item}</h6>
        </div>

        <div class="deleteIcon">
          <i class="fas fa-xmark close" onclick="removeItem(${cart.id})"></i>
        </div>
      </div>
        
        `
    })
  } else {

    document.querySelector("main").innerHTML = `
        <div style="text-align:center" class="w-100">
                <h2 class="mb-3 text-bg-secondary" style="font-weight:400;letter-spacing:1.5px">Cart Is Empty !</h2>
                <a href="index.html"
                class="btn btn-dark text-white "
            ">Go To Home</a>
        </div>`;
  }
};
generateCartItem();
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
    generateCartItem();
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
    generateCartItem();
    localStorage.setItem("data", JSON.stringify(basket));
  };
  let updateFunc = (id) => {
    let search = basket.find((item) => item.id === id);
    let numOfProduct = search.item;
    document.getElementById(id).innerHTML=numOfProduct;
    calculation();
    totalBill();
  };
let removeItem=(id)=>{
console.log(id)
    basket=basket.filter((item)=>item.id !== id);
    generateCartItem();
    calculation();
    totalBill();
    localStorage.setItem("data", JSON.stringify(basket));
}
let totalPrice=document.querySelector(".totalPrice span")
let totalBill=()=>{
    if(basket.length!==0){
        let amount=basket.map((x)=>{
            let search=productsData.find((item)=>item.id===x.id) || [];
            return x.item*search.price
        })
    totalPrice.innerHTML="$ "+amount.reduce((total,curr)=>{
        return total+curr
    });
    generateCartItem();
    }

    else{
        return;
    }

}
totalBill()
btnClearAll.addEventListener("click",(e)=>{
    console.log(e.target)
    basket=[];
    generateCartItem();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));


})
