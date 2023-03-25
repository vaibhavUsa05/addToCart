var allcardsItems = document.querySelector(".allcardsItems");
var itemsComponent = document.querySelector(".itemsComponent");
var alertInfo = document.querySelector(".alertInfo");
var allProducts = [];

function addToCartFunction(index) {

    if (localStorage.getItem("addToCart")) {
        let allData = JSON.parse(localStorage.getItem("addToCart"));
         if (!Array.isArray(allData)) {
            allData = []; // fallback to an empty array
        }
        allData.push(allProducts[index]);
        localStorage.setItem("addToCart", JSON.stringify(allData));
    } else {
        let allData=[];
        allData.push(allProducts[index]);
        localStorage.setItem("addToCart", JSON.stringify(allData));
    }
    setTimeout(() => {
      alertInfo.style.display = "block";
    }, 1000);
    
    setTimeout(() => {
        alertInfo.style.display = "none";
      }, 3000);
}

window.onload = function() {

    // showAllData();
    // Fetch the API
    fetch('https://dummyjson.com/products')
        .then(response => response.json())
        .then(data => {
            // Once the data is retrieved, do something with it
          
            allProducts = data.products; // Replace the array with the new data

            // Create a new card element for each product
            allProducts.map((elem, index) => {
                let original_price = elem.price / (1 - (elem.discountPercentage / 100));
                let newCard = document.createElement("div");
                newCard.classList.add("newCard");
                newCard.innerHTML += `
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
                            <button class="addToCart" onClick="addToCartFunction(${index})">Add to cart</button>
                        </div>
                    </div>
                `;
                // Append the new card element to the container
                allcardsItems.appendChild(newCard);
            });
        })
        .catch(error => {
            // Handle any errors that occur during the fetch
            console.error('Error fetching API:', error);
        });
};

