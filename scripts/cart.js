var allAddedItems = document.querySelector(".itemsComponent");
var alertInfo = document.querySelector(".alertInfo");
window.onload= function(){
function showAllData() {
    let allData = JSON.parse(localStorage.getItem("addToCart"));
    
   allAddedItems.innerHTML = '';
    for (let i = 0; i < allData.length; i++) {
        let elem = allData[i];
        let newCardInAddedList = document.createElement("div");
        newCardInAddedList.classList.add("newCard");
        let original_price = elem.price / (1 - (elem.discountPercentage / 100));
        newCardInAddedList.innerHTML += `
            <div class="cardImage">
                <img src="${elem.images[0]}" alt="${elem.name}">
            </div>
            <div class="cardContent">
                <h2>${elem.brand}</h2>
                <p>${elem.description}</p>
                <div class="cardOptions">
                    <div class="prices">
                        <span class="cardPriceBeforeDiscount">$ ${(original_price.toFixed(2))}</span>
                        <span class="cardPrice">$${(elem.price)}</span>
                    </div>
                    <button class="removeFromCart" onClick="removeFromCartFunction(${i})">Remove</button>
                </div>
            </div>
        `;
        allAddedItems.appendChild(newCardInAddedList);
    }
    
}
showAllData();
}
function removeFromCartFunction(index) {
    let allData= JSON.parse(localStorage.getItem("addToCart"));
   allData.splice(index, 1);
   localStorage.setItem("addToCart", JSON.stringify(allData));
   // Reload the current window
   setTimeout(() => {
    alertInfo.style.display = "block";
  }, 1000);
  
  setTimeout(() => {
      alertInfo.style.display = "none";
 window.location.reload();
    }, 3000);

}