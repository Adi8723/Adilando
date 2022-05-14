let names = ['Tiramisu (hausgemacht)', 'Insalata Etna', 'Pizza Tonno und Cipolla [Normal, Ø 32cm]'];
let preis = [5.50, 6.40, 5.60, ];
let productInfo = ['ohne Alkohol', 'Wahl aus: mit Cocktail-Dressing, mit Essig-Öl-Dressing, mit Joghurt-Dressing, ohne Dressing, mit Kräuterbutter, groß und mehr.', 'Wahl aus: Klein, Ø 26cm, Normal, Ø 32cm oder Familie, Ø 40cm.']

let basketFood = []
let basketPrice = []
let basketDescription = []
let basketAmount = []
let lieferkosten = 3.00

function load() {
    loadBasket();
    render();
    renderfullBasket();
    TemplateEmptyBasket();

}

function render() {
    let content = document.getElementById('card');
    for (let i = 0; i < names.length; i++) {
        content.innerHTML += tamplateDishes(i)
    }
    renderfullBasket()
}


function addfood(i) {
    let index = basketFood.indexOf(names[i]);
    if (index === -1) {
        basketFood.push(names[i])
        basketDescription.push(productInfo[i])
        basketPrice.push(preis[i])
        basketAmount.push(1)
    } else {
        basketAmount[index]++
    }
    renderfullBasket();
    saveBasket();
}

function renderfullBasket() {
    let basket = document.getElementById('basket');
    basket.innerHTML = ''
    if (basketAmount.length <= 0) {
        basket.innerHTML = TemplateEmptyBasket();
    } else {
        for (let i = 0; i < basketFood.length; i++) {
            basket.innerHTML += TemplateFullBasket(i)

        }
        basket.innerHTML += TemplatebasketCalk();
    }
}

function total(a, b) {
    let sumtotal = a + b
    return sumtotal.toFixed(2);
}

function calcPrice(c, d) {
    let calcSum = c * d;
    return calcSum.toFixed(2);

}

function sumTotal() {
    let sum = 0;
    for (let i = 0; i < basketPrice.length; i++) {
        sum += basketAmount[i] * basketPrice[i];
    }
    if (sum <= 10) {
        lieferkosten = 3.00;
    } else {
        lieferkosten = 0;

    }
    return sum
}



function decrease(i) {
    let newAmount = basketAmount[i]--
        if (newAmount == 1) {
            deletefood(i)
        }

    renderfullBasket()
    saveBasket()

}



function increase(i) {
    basketAmount[i]++
    renderfullBasket()
    saveBasket();
}

function deletefood(i) {
    basketAmount.splice(i, 1)
    basketDescription.splice(i, 1)
    basketFood.splice(i, 1)
    basketPrice.splice(i, 1)
    renderfullBasket()
    saveBasket();
}

function saveBasket() {
    let basketFoodasText = JSON.stringify(basketFood)
    let basketPriceasText = JSON.stringify(basketPrice)
    let basketAmountasText = JSON.stringify(basketAmount)


    localStorage.setItem('basketFood', basketFoodasText)
    localStorage.setItem('basketPrice', basketPriceasText)
    localStorage.setItem('basketAmount', basketAmountasText)
}
 
function loadBasket() { 
    let basketFoodasText = localStorage.getItem('basketFood')
    if (basketFoodasText) { basketFood = JSON.parse(basketFoodasText) }
    
    let basketPriceasText = localStorage.getItem('basketPrice');
    if (basketPriceasText) { 
        basketPrice = JSON.parse(basketPriceasText)
    }
 
    let basketAmountasText = localStorage.getItem('basketAmount');
    if (basketAmountasText) { basketAmount = JSON.parse(basketAmountasText)}
}

function tamplateDishes(i) {
    return /*html*/ ` <div class="card"><div class="nameOfFood"><h3>${names[i]}
    </h3><a href="#">Produktinfo </a></div><p>${productInfo[i]}
    <p><p id="price">${preis[i].toFixed(2).replace('.', ',')}€</p><button onclick="addfood(${i})">+</button>
</div>
    `
}

function TemplateFullBasket(i) {
    return /*html */ `
    <div class="korb">
		<div class="warenName">
			<span>${basketAmount[i]}</span>
			<h4>${basketFood[i]}</h4>
			<span>${(basketPrice[i] * basketAmount[i]).toFixed(2)}€</span> <br>
		</div>
		<div class="btns">
			<button onclick="increase(${i})">+</button>
			<button onclick="decrease(${i})">-</button>
            <i onclick="deletefood(${i})" class="fa-solid fa-trash"></i>
		</div>
	</div>`


}

function TemplateEmptyBasket() {
    return /*html*/ ` <div class = "case"id = "case" >
        <i class = "fa-solid fa-suitcase" > </i> <h3>Fülle deinen Warenkorb </h3> <p> Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen. </p> </div>
        `
}

function TemplatebasketCalk() {
    return /*html */ `
        <div class="basketCalc">
            <div>
                <span>Zwieschensumme</span><br>
                <span>LieferKosten</span>
                <h4>Gesamt</h4>
            </div>
            <div>
                <span>${sumTotal().toFixed(2)}€</span><br>
                <span>${lieferkosten.toFixed(2)}€</span>
                <h4>${total(sumTotal(), lieferkosten)}€</h4>
            </div>

        </div>
        <div class="bezahlBtn">
            <button  class="bezahlen">Bezahlen <span>${total(sumTotal(), lieferkosten)}€</span></button> 
        </div>

        `
}