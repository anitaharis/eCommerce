
if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else {
    ready()
}

function ready() {
    let removeCartItemButtons = document.getElementsByClassName('btn-danger');

    for (let i = 0; i < removeCartItemButtons.length; i++ ){
        let button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    
    }
    
    let quantityInput = document.getElementsByClassName('cart-quantity-input')
    for (let i=0; i < removeCartItemButtons.length; i++){
        let input = quantityInput[i]
        input.addEventListener('change', quantityChanged)
    }
    
    let addToCartButtons = document.getElementsByClassName('cart-btn')
    for (let i =0; i < addToCartButtons.length; i++){
        let button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
    
}

    function purchaseClicked() {
        alert('Thank you for your purchase')
        let cartItems = document.getElementsByClassName('cart-items')[0]
        while (cartItems.hasChildNodes()){
            cartItems.removeChild(cartItems.firstChild)
        }
        updateCartTotal()
}


function removeCartItem(event){
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

//set the quantity val to 1

function quantityChanged(event){
    let input = event.target
    if(isNaN(input.value) || input.value <= 0) {
        input.value = 1    
    }
    updateCartTotal()
}

function addToCartClicked(event){
    let button = event.target
    let product = button.parentElement.parentElement
    let description = product.getElementsByClassName('product-description')[0].innerText
    let price = product.getElementsByClassName('product-price')[0].innerText
    let imageSrc = product.getElementsByClassName('product-image')[0].src
    addItemToCart(description, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(description, price, imageSrc){
    let cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    let cartItems = document.getElementsByClassName('cart-items')[0]
    let cartItemNames = document.getElementsByClassName('cart-item-description')
    for (let i = 0; i < cartItemNames.length; i++){
        if (cartItemNames[i].innerText == description){
            alert('This item is already added to the cart')
            return
        }
    }
    let cartRowContents = `
    <div class="cart-item cart-column">
		<img class="cart-item-image mr-2" src="${imageSrc}" width="100">
		<span class="cart-item-description">${description}</span>
	</div>
		<span class="cart-price cart-column">${price}</span>
	<div class="cart-quantity cart-column">
		<input class="cart-quantity-input" type="number" value="1">
		<button class="fa fa-trash" role="button"></button>
	</div>
    `
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('fa fa-trash')[0].addEventListener('click',removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    let cartItemContainer = document.getElementsByClassName('cart-items')[0]
    let cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
   for (let i = 0; i < cartRows.length; i++ ){
       let cartRow = cartRows[i]
       let priceElement = cartRow.getElementsByClassName('cart-price')[0]
       let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
       
       let price = parseFloat(priceElement.innerText.replace('$', ''))
       let quantity = quantityElement.value
       total = total + (price * quantity)
   }
   total = Math.round(total * 100)/100
   document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}