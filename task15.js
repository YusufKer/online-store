////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*88888888888888888888888888888888888888888888888888888888888888888888----Menu----88888888888888888888888888888888888888888888888888888888888888888888*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var cart = []
//I've created an array called Cart which will be an array of all the items that the user would like to purchase
//if there is no cart in local storage. cart will be set to an empty array
//total will be used to calculate and display the total cost 
var total = 0;
// I've created an object called an item which will populate my cart.
function Item(name,price,quantity){
	this.name = name;
	this.price = price;
	this.quantity = quantity;
}

/*000000000000000000000000000000000000000000000000000000000000000000000000000000*/
//I'm pushing items into an array called menu
var menu = []
//pushing starters
menu.push(new Item("chicken wings",35,1))
menu.push(new Item("crumbed mushrooms",35,1))
menu.push(new Item("mini tacos",65,1))
//pushing main courses
menu.push(new Item("cheese burger",105,1))
menu.push(new Item("pizza",95,1))
menu.push(new Item("burrito",75,1))
menu.push(new Item("chicken kebab",60,1))
menu.push(new Item("steak",115,1))
//pushing sides
menu.push(new Item("cheese fries",35,1))
menu.push(new Item("french fries",25,2))
menu.push(new Item("onion rings",35,1))
//pushing desserts
menu.push(new Item("ice cream",40,1))
menu.push(new Item("milk shake",40,1))
menu.push(new Item("doughnut",20,1))
menu.push(new Item("cookie",15,1))
//drinks.push(new Item("coke",22,1))
menu.push(new Item("coke",22,1))
menu.push(new Item("fanta",22,1))
menu.push(new Item("sprite",22,1))
menu.push(new Item("orange juice",26,1))
menu.push(new Item("mango lasse",30,1))
/*000000000000000000000000000000000000000000000000000000000000000000000000000000*/

console.log(menu)
console.log(cart)
//this function will get an item from the menu array and push it into the cart array
function addToCart(i){

	for(var v in cart){
	//if the item is already in the cart then, instead of adding it again, increase the quantity.
		if(menu[i].name===cart[v].name){
			cart[v].quantity+=1;
			alertTotal();
			return
		}
	}
	cart.push(menu[i])
	alertTotal();
}

function removeItem(name){
	for (var v in cart){
		//if quantity is more than 1, subtract 1 from quantity
		if (cart[v].name === name){
			cart[v].quantity--;
		}
		//if the quantity is 1 or less then remove the item object from the cart
		if(cart[v].quantity<=0){
			cart.splice(v,1);
		}
	}
	saveCart();
	alertTotal();
	window.location.reload();
}

function alertTotal(){
	var x = 0;
	for(var item of cart){
		x += item.price*item.quantity;
	}
	//this displays the total via alert box. I'm reluctant to use the total variable which I've created earlier because I've been running into scope problems. Please advise
	alert("Total:"+x)
}

function clearCart(){
	//to clear the cart, I will simply set it to an empty array
	cart = [];
	saveCart();
	window.location.reload()
}
//save cart
function saveCart(){
	localStorage.setItem("myCart",JSON.stringify(cart));
}
//Load Cart
function loadCart(){
	if (localStorage.getItem("myCart")) return cart = JSON.parse(localStorage.getItem("myCart"))
	else return
	saveCart()
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*888888888888888888888888888888888888888888888888888888888888888888----MY Plate----888888888888888888888888888888888888888888888888888888888888888888*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//I'm creating variables that will make it easier for me to open and close a div with an unordered list inside where i will display the various items  of the cart
var open = "<div><ul>";
var close = "</div></ul>";
//display names of items in cart on to plate
function displayCart(){
	for(item of cart){
		total+=item.price*item.quantity
	}

	var names = '';
	var quantities = '';
	var prices = '';
	var remove = '';

	for(var item of cart){
		names += `<li>${item.name}</li>`
		quantities += `<li>${item.quantity}(R${item.price})</li>`
		prices += `<li>${item.price*item.quantity}</li>`
		remove += `<li><button onclick="removeItem('${item.name}')">Remove</button></li>`
	}
	document.getElementById("list-items-here").innerHTML = open+names+close + open+quantities+close + open+prices+close + open+remove+close;
	document.getElementById("total").innerText = `Total: ${total}`
}
