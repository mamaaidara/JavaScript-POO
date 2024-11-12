class Product {
    constructor(id, element) {
        this.id = id;
        this.element = element;
        this.count = parseInt(element.querySelector('.count').innerText);
        this.price = parseFloat(element.querySelector('p').innerText.replace(/[^\d]/g, '')); // Pour extraire le prix en chiffres
        this.totalPriceElement = element.querySelector('.para1');
        this.heartElement = element.querySelector('.heart');
        this.attachEventListeners();
    }

    updateDisplay() {
        this.element.querySelector('.count').innerText = this.count;
        const totalPrice = this.count * this.price;
        this.totalPriceElement.innerText = `Prix Total: ${totalPrice.toLocaleString('fr-FR')} Fcfa`;
        cart.updateTotalGeneral();
    }

    attachEventListeners() {
        this.element.querySelector('.decrease').addEventListener('click', () => {
            if (this.count > 1) {
                this.count--;
                this.updateDisplay();
            }
        });

        this.element.querySelector('.increase').addEventListener('click', () => {
            this.count++;
            this.updateDisplay();
        });

        this.element.querySelector('.deleteButton').addEventListener('click', () => {
            this.element.remove();
            cart.removeProduct(this.id);
            cart.updateTotalGeneral();
        });

        this.heartElement.addEventListener('click', () => {
            this.heartElement.classList.toggle('active');
        });
    }
}

class Cart {
    constructor() {
        this.products = [];
    }

    addProduct(id, element) {
        const product = new Product(id, element);
        this.products.push(product);
        this.updateTotalGeneral();
    }

    removeProduct(id) {
        this.products = this.products.filter(product => product.id !== id);
    }

    updateTotalGeneral() {
        const totalGeneral = this.products.reduce((total, product) => {
            return total + (product.count * product.price);
        }, 0);
        document.querySelector('.graph').innerText = `Prix Total: ${totalGeneral.toLocaleString('fr-FR')} Fcfa`;
    }

    initialize() {
        document.querySelectorAll('.produt-list').forEach((element, index) => {
            this.addProduct(index + 1, element);
        });
    }
}

const cart = new Cart();

document.addEventListener('DOMContentLoaded', () => {
    cart.initialize();
});
